import { describe, expect, it } from "vitest";
import { getPublicEnv, getServerEnv } from "@/lib/env";

describe("env helpers", () => {
  it("parses the public Supabase configuration", () => {
    const env = getPublicEnv({
      NEXT_PUBLIC_SUPABASE_URL: "https://karaoke.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
    });

    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://karaoke.supabase.co");
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("anon-key");
  });

  it("allows the service role key for server workflows", () => {
    const env = getServerEnv({
      NEXT_PUBLIC_SUPABASE_URL: "https://karaoke.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-key",
    });

    expect(env.SUPABASE_SERVICE_ROLE_KEY).toBe("service-role-key");
  });

  it("throws when public values are missing", () => {
    expect(() =>
      getPublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
      }),
    ).toThrow(/Invalid public environment/);
  });
});
