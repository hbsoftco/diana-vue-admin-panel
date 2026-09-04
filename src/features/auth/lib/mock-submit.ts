/**
 * Shared stand-in for the auth API while the panel is a UI-only build.
 *
 * Every auth form routes its submit through this single helper so the fake
 * round-trip, latency and dev logging stay identical across Sign In, Sign Up
 * and Reset Password instead of drifting per form.
 */
const MOCK_LATENCY_MS = 1200

export async function mockAuthSubmit<TPayload>(tag: string, payload: TPayload): Promise<TPayload> {
  await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY_MS))

  // UI-only build: surface the collected values for manual QA until a real
  // endpoint is wired in.
  // eslint-disable-next-line no-console
  console.log(`[${tag}] submit`, payload)

  return payload
}
