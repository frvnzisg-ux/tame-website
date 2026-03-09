import { NextResponse } from "next/server";
import { insertIntoSupabase, isSupabaseConfigured } from "@/lib/supabase";

type WaitlistBody = {
  email?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: WaitlistBody;

  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const table = process.env.SUPABASE_WAITLIST_TABLE?.trim() || "waitlist_signups";

  if (isSupabaseConfigured()) {
    const result = await insertIntoSupabase(table, {
      email,
      source: "website",
      created_at: new Date().toISOString()
    });

    if (!result.ok) {
      if (result.status === 409) {
        return NextResponse.json({
          message: "You're already on the waitlist. We'll keep you updated."
        });
      }
      return NextResponse.json(
        { error: "Unable to save signup right now. Please try again." },
        { status: 500 }
      );
    }
  } else {
    // Fallback for environments without database configuration.
    console.log(`[waitlist] ${email}`);
  }

  return NextResponse.json({
    message: "Thanks. You're on the waitlist. We'll reach out from support@tamelife.app."
  });
}
