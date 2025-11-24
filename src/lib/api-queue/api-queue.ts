import type {
    QueueJob,
    QueueConfig,
    QueueState,
} from "@/types/queue.types";
import type { EchoRequest, EchoResponse, ApiErrorResponse } from "@/types/api.types";
import { NextRequest } from "next/server";

export class ApiQueue {
    private jobs: QueueJob<EchoRequest>[] = [];
    private processing: Set<string> = new Set();
    private config: QueueConfig;
    private listeners: Set<(state: QueueState<EchoRequest>) => void> = new Set();

    constructor(config: Partial<QueueConfig> = {}) {
        this.config = {
            maxConcurrent: config.maxConcurrent ?? 1,
            retryDelay: config.retryDelay ?? 2000,
        };
    }

    subscribe(listener: (state: QueueState<EchoRequest>) => void): () => void {
        this.listeners.add(listener);
        // Return unsubscribe function
        return () => {
            this.listeners.delete(listener);
        };
    }

    private notifyListeners(): void {
        const state = this.getState();
        this.listeners.forEach((listener) => listener(state));
    }

    getState(): QueueState<EchoRequest> {
        const completed = this.jobs.filter((j) => j.status === "completed").length;
        const failed = this.jobs.filter((j) => j.status === "failed").length;

        return {
            jobs: [...this.jobs],
            currentProcessing: this.processing.size,
            totalCompleted: completed,
            totalFailed: failed,
        };
    }

    enqueue(payload: EchoRequest): string {
        const job: QueueJob<EchoRequest> = {
            id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            status: "pending",
            payload,
            createdAt: Date.now(),
        };

        this.jobs.push(job);
        this.notifyListeners();

        // Start processing if not already running
        this.processQueue();

        return job.id;
    }

    private async processQueue(): Promise<void> {
        // Don't process if already at max concurrency
        if (this.processing.size >= this.config.maxConcurrent) {
            return;
        }

        // Find next pending job
        const nextJob = this.jobs.find(
            (job) => job.status === "pending" && !this.processing.has(job.id)
        );

        if (!nextJob) {
            return;
        }

        // Mark as processing
        nextJob.status = "processing";
        this.processing.add(nextJob.id);
        this.notifyListeners();

        // Process the job
        this.executeJob(nextJob)
            .then(() => {
                this.processing.delete(nextJob.id);
                this.notifyListeners();
                // Continue processing queue
                this.processQueue();
            })
            .catch(() => {
                this.processing.delete(nextJob.id);
                this.notifyListeners();
                // Continue processing queue
                this.processQueue();
            });
    }

    private async executeJob(job: QueueJob<EchoRequest>): Promise<void> {
        try {
            const response = await fetch("/api/echo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(job.payload),
            });

            const data: EchoResponse | ApiErrorResponse = await response.json();

            if (response.status === 429) {
                // Rate limited - retry after delay
                const errorData = data as ApiErrorResponse;
                const retryAfter = errorData.retryAfter
                    ? errorData.retryAfter * 1000
                    : this.config.retryDelay;

                // Reset job to pending and retry after delay
                job.status = "pending";
                job.error = `Rate limited. Retrying after ${retryAfter}ms`;

                await new Promise((resolve) => setTimeout(resolve, retryAfter));

                // Retry the job
                return this.executeJob(job);
            }

            if (!response.ok) {
                // Request failed
                job.status = "failed";
                job.error = (data as ApiErrorResponse).message || "Request failed";
                job.completedAt = Date.now();
                this.notifyListeners();
                return;
            }

            // Success
            job.status = "completed";
            job.response = data as EchoResponse;
            job.completedAt = Date.now();
            this.notifyListeners();
        } catch (error) {
            // Network or other error
            job.status = "failed";
            job.error =
                error instanceof Error ? error.message : "Unknown error occurred";
            job.completedAt = Date.now();
            this.notifyListeners();
        }
    }

    clearHistory(): void {
        this.jobs = this.jobs.filter(
            (job) => job.status === "pending" || job.status === "processing"
        );
        this.notifyListeners();
    }

    clearAll(): void {
        this.jobs = [];
        this.processing.clear();
        this.notifyListeners();
    }

    getJob(id: string): QueueJob<EchoRequest> | undefined {
        return this.jobs.find((job) => job.id === id);
    }
}

export const globalApiQueue = new ApiQueue({
    maxConcurrent: 1, // Process one request at a time to avoid rate limits
    retryDelay: 2000, // Wait 2 seconds before retrying after rate limit
});

//Get client identifier from request (IP address)
export function getClientIdentifier(request: NextRequest): string {
    // Try to get IP from various headers (for production behind proxy)
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded?.split(",")[0] || realIp || "unknown";
  
    return ip;
  }