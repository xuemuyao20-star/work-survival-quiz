const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function serviceKey(): string | null {
  // Use the current server-only secret key. It must never leave this function.
  const keys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (keys) {
    try {
      const parsed = JSON.parse(keys);
      if (typeof parsed.default === "string") return parsed.default;
    } catch { /* unavailable or malformed secret key map */ }
  }
  return null;
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json(405, { error: "method_not_allowed" });

  let body: { code?: unknown };
  try { body = await request.json(); } catch { return json(400, { error: "invalid_request" }); }
  if (typeof body.code !== "string" || body.code.trim().length < 8 || body.code.trim().length > 128) {
    return json(400, { error: "invalid_code" });
  }

  const url = Deno.env.get("SUPABASE_URL");
  const key = serviceKey();
  if (!url || !key) return json(503, { error: "service_unavailable" });

  const normalized = body.code.trim().toUpperCase();
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  const codeHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
  const response = await fetch(`${url}/rest/v1/rpc/consume_access_code`, {
    method: "POST",
    // New Supabase secret keys are not JWTs: send them as apikey only.
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ p_code_hash: codeHash }),
  });
  if (!response.ok) return json(503, { error: "service_unavailable" });
  const consumed = await response.json();
  if (!Array.isArray(consumed) || consumed.length === 0) return json(403, { error: "invalid_or_exhausted_code" });
  return json(200, { ok: true, remaining: consumed[0].uses_remaining });
});

