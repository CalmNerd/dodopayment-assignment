interface RateLimitRecord {
    count: number;
    resetTime: number; // Timestamp when the limit resets
}

interface RateLimiterConfig {
    maxRequests: number; // Maximum allowed
    windowMs: number;
}

export class RateLimiter {
    private store: Map<string, RateLimitRecord>;
    private config: RateLimiterConfig;

    constructor(maxRequests: number, windowMs: number = 60000) {
        this.config = { maxRequests, windowMs };
        this.store = new Map();
    }

    checkLimit(identifier: string): {
        allowed: boolean;
        remaining: number;
        resetTime?: number;
    } {
        const now = Date.now();
        const record = this.store.get(identifier);

        // If no record exists or window has expired, create/reset record
        if (!record || now >= record.resetTime) {
            const newRecord: RateLimitRecord = {
                count: 1,
                resetTime: now + this.config.windowMs,
            };
            this.store.set(identifier, newRecord);
            return {
                allowed: true,
                remaining: this.config.maxRequests - 1,
            };
        }

        // Check if limit exceeded
        if (record.count >= this.config.maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetTime: record.resetTime,
            };
        }

        // Increment count
        record.count++;
        this.store.set(identifier, record);

        return {
            allowed: true,
            remaining: this.config.maxRequests - record.count,
        };
    }

    cleanup(): void {
        const now = Date.now();
        for (const [identifier, record] of this.store.entries()) {
            if (now >= record.resetTime) {
                this.store.delete(identifier);
            }
        }
    }

    getRemaining(identifier: string): number {
        const now = Date.now();
        const record = this.store.get(identifier);

        // If no record exists or window has expired, all requests are available
        if (!record || now >= record.resetTime) {
            return this.config.maxRequests;
        }

        // Return remaining requests
        return Math.max(0, this.config.maxRequests - record.count);
    }
}

export const globalRateLimiter = new RateLimiter(10, 60000);

// Cleanup expired records every 5 minutes
if (typeof setInterval !== "undefined") {
    setInterval(() => {
        globalRateLimiter.cleanup();
    }, 5 * 60000);
}