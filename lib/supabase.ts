type InsertPayload = Record<string, unknown>;

function env(name: string) {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : "";
}

export function isSupabaseConfigured() {
  return Boolean(env("SUPABASE_URL") && env("SUPABASE_SERVICE_ROLE_KEY"));
}

export async function insertIntoSupabase(table: string, payload: InsertPayload) {
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    return { ok: false, error: "Supabase is not configured." } as const;
  }

  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=representation"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    return { ok: false, error: text || "Failed to write to Supabase." } as const;
  }

  return { ok: true } as const;
}
