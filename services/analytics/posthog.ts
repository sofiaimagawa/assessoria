export function captureProductEvent(
  event: "onboarding_started" | "task_completed" | "supplier_selected" | "payment_paid",
  properties?: Record<string, string | number | boolean>
) {
  // PostHog is initialized once product keys are configured for each environment.
  if (__DEV__) {
    console.log("[analytics]", event, properties ?? {});
  }
}
