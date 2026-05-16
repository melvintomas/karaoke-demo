import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

function formatErrors(error: z.ZodError) {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("; ");
}

export function getPublicEnv(source: NodeJS.ProcessEnv = process.env) {
  const parsed = publicEnvSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(
      `Invalid public environment: ${formatErrors(parsed.error)}`,
    );
  }

  return parsed.data;
}

export function getServerEnv(source: NodeJS.ProcessEnv = process.env) {
  const parsed = serverEnvSchema.safeParse(source);

  if (!parsed.success) {
    throw new Error(
      `Invalid server environment: ${formatErrors(parsed.error)}`,
    );
  }

  return parsed.data;
}
