import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = config.resendApiKey;
  const notifyEmail = config.notifyEmail;

  if (!apiKey) {
    console.warn("[notify-yes] RESEND_API_KEY not set; skipping email.");
    return { ok: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Valentine <onboarding@resend.dev>",
    to: [notifyEmail],
    subject: "She said Yes!",
    html: `
      <p><strong>Sophia said Yes!</strong></p>
      <p>Someone just clicked &ldquo;Yes&rdquo; on your Valentine&rsquo;s question.</p>
      <p>Time: ${new Date().toISOString()}</p>
    `,
  });

  if (error) {
    console.error("[notify-yes] Resend error:", error);
    return { ok: false, reason: "send_failed" };
  }

  return { ok: true };
});
