import { NextResponse } from "next/server";
import { insertIntoSupabase, isSupabaseConfigured } from "@/lib/supabase";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim().toLowerCase() || "";
  const message = body.message?.trim() || "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please complete all fields." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const table = process.env.SUPABASE_CONTACT_TABLE?.trim() || "contact_messages";

  if (isSupabaseConfigured()) {
    const result = await insertIntoSupabase(table, {
      name,
      email,
      message,
      source: "website",
      created_at: new Date().toISOString()
    });
    if (!result.ok) {
      return NextResponse.json(
        { error: "Unable to submit message right now. Please email support@tamelife.app." },
        { status: 500 }
      );
    }
  } else {
    console.log(`[contact] ${name} <${email}>: ${message}`);
  }

  return NextResponse.json({ message: "Thanks. We'll get back to you shortly." });
}
