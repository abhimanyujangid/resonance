import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
    APP_URL: z.string().min(1, "APP_URL is required"),
  },
  experimental__runtimeEnv: {},
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
