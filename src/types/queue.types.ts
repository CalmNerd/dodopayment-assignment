export type QueueJobStatus = "pending" | "processing" | "completed" | "failed";

export interface QueueJob<T = unknown> {
    id: string;
    status: QueueJobStatus;
    payload: T;
    response?: unknown;
    error?: string;
    createdAt: number;
    completedAt?: number;
}

export interface QueueConfig {
    maxConcurrent: number; // Maximum number of concurrent requests
    retryDelay: number; // Delay in ms before retrying after rate limit
}

export interface QueueState<T = unknown> {
    jobs: QueueJob<T>[];
    currentProcessing: number;
    totalCompleted: number;
    totalFailed: number;
}