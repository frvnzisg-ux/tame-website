import { NextResponse } from "next/server";

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

  // TODO: Replace with real persistence (DB, CRM, or email tool integration).
  console.log(`[waitlist] ${email}`);

  return NextResponse.json({
    message: "Thanks. You're on the waitlist."
  });
}
