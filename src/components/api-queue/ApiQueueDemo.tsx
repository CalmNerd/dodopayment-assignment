"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { globalApiQueue } from "@/lib/api-queue/api-queue";
import type { QueueState, QueueJob } from "@/types/queue.types";
import type { EchoRequest, EchoResponse } from "@/types/api.types";
import { calculateDuration, formatTime, getStatusVariant } from "@/lib/utils";

function JobItem({ job }: { job: QueueJob<EchoRequest> }) {
  const response = job.response as EchoResponse | undefined;

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
          <span className="text-xs text-muted-foreground">ID: {job.id.slice(-8)}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatTime(job.createdAt)}
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Message:</span> {job.payload.message}
        </p>
        {job.status === "processing" && (
          <p className="text-xs text-muted-foreground">Processing...</p>
        )}
        {job.error && (
          <p className="text-xs text-destructive">Error: {job.error}</p>
        )}
        {response && (
          <div className="mt-2 p-2 bg-muted rounded text-xs">
            <p className="font-medium">Response:</p>
            <p className="text-muted-foreground">
              Status: {response.status}
            </p>
            <p className="text-muted-foreground">
              Echo: {response.echo}
            </p>
          </div>
        )}
      </div>

      {job.completedAt && (
        <p className="text-xs text-muted-foreground">
          Duration: {calculateDuration(job.createdAt, job.completedAt)}
        </p>
      )}
    </div>
  );
}

export function ApiQueueDemo() {
  const [queueState, setQueueState] = useState<QueueState<EchoRequest>>({
    jobs: [],
    currentProcessing: 0,
    totalCompleted: 0,
    totalFailed: 0,
  });
  const [message, setMessage] = useState("");
  const [autoAdd, setAutoAdd] = useState(false);

  // Subscribe to queue state changes
  useEffect(() => {
    // Set initial state
    setQueueState(globalApiQueue.getState());

    // Subscribe to updates
    const unsubscribe = globalApiQueue.subscribe((state) => {
      setQueueState(state);
    });

    return unsubscribe;
  }, []);

  // Auto-add jobs if enabled
  useEffect(() => {
    if (!autoAdd) return;

    const interval = setInterval(() => {
      const autoMessage = `Auto message ${Date.now()}`;
      globalApiQueue.enqueue({ message: autoMessage });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoAdd]);

  // Handle manual job addition
  const handleAddJob = useCallback(() => {
    if (!message.trim()) return;

    globalApiQueue.enqueue({ message: message.trim() });
    setMessage("");
  }, [message]);

  // Handle clear history
  const handleClearHistory = useCallback(() => {
    globalApiQueue.clearHistory();
  }, []);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    globalApiQueue.clearAll();
  }, []);

  // Get pending and processing jobs
  const activeJobs = queueState.jobs.filter(
    (job) => job.status === "pending" || job.status === "processing"
  );
  const completedJobs = queueState.jobs.filter(
    (job) => job.status === "completed"
  );
  const failedJobs = queueState.jobs.filter((job) => job.status === "failed");

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>API Queue System Demo</CardTitle>
          <CardDescription>
            Queue system to manage API requests and prevent rate limiting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Queued</p>
              <p className="text-2xl font-bold">
                {activeJobs.length}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold">
                {queueState.currentProcessing}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {queueState.totalCompleted}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-600">
                {queueState.totalFailed}
              </p>
            </div>
          </div>

          <Separator />

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter message to echo..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddJob();
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleAddJob} disabled={!message.trim()}>
                Add Job
              </Button>
              <Button
                variant={autoAdd ? "destructive" : "outline"}
                onClick={() => setAutoAdd(!autoAdd)}
              >
                {autoAdd ? "Stop Auto" : "Start Auto"}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClearHistory}>
                Clear History
              </Button>
              <Button variant="outline" onClick={handleClearAll}>
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Jobs */}
      {activeJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Jobs ({activeJobs.length})</CardTitle>
            <CardDescription>
              Jobs currently in queue or being processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeJobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Jobs */}
      {completedJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed Jobs ({completedJobs.length})</CardTitle>
            <CardDescription>Successfully processed jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {completedJobs
                .slice()
                .reverse()
                .map((job) => (
                  <JobItem key={job.id} job={job} />
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Failed Jobs */}
      {failedJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Failed Jobs ({failedJobs.length})</CardTitle>
            <CardDescription>Jobs that failed to process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {failedJobs
                .slice()
                .reverse()
                .map((job) => (
                  <JobItem key={job.id} job={job} />
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {queueState.jobs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No jobs in queue. Add a job to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}