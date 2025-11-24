import { NextRequest, NextResponse } from "next/server";
import { globalRateLimiter } from "@/lib/rate-limiter/rate-limiter";
import type { EchoRequest, EchoResponse, ApiErrorResponse } from "@/types/api.types";
import { getClientIdentifier } from "@/lib/api-queue/api-queue";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get client identifier for rate limiting
    const clientId = getClientIdentifier(request);

    // Check rate limit
    const rateLimitResult = globalRateLimiter.checkLimit(clientId);

    if (!rateLimitResult.allowed) {
      // Calculate retry after seconds
      const retryAfter = rateLimitResult.resetTime
        ? Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        : 60;

      const errorResponse: ApiErrorResponse = {
        status: "error",
        message: "Rate limit exceeded. Please try again later.",
        retryAfter,
      };

      return NextResponse.json(errorResponse, {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": "10",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": rateLimitResult.resetTime?.toString() || "",
        },
      });
    }

    // Parse request body
    let body: EchoRequest;
    try {
      body = await request.json();
    } catch (error) {
      const errorResponse: ApiErrorResponse = {
        status: "error",
        message: "Invalid JSON payload",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate message field
    if (!body.message || typeof body.message !== "string") {
      const errorResponse: ApiErrorResponse = {
        status: "error",
        message: "Missing or invalid 'message' field",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Simulate processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Prepare success response
    const response: EchoResponse = {
      status: "ok",
      echo: body.message,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": "10",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
      },
    });
  } catch (error) {
    // Handle unexpected errors
    const errorResponse: ApiErrorResponse = {
      status: "error",
      message: error instanceof Error ? error.message : "Internal server error",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}