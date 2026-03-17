"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/src/trpc/client";

export function HealthCheck() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.health.queryOptions());
  return (
    <div>
      <h1>Health Check</h1>
    </div>
  );
}
