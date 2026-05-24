export type SubscriptionAccess = {
  plan: "free" | "premium";
  canUseProposalParsing: boolean;
  canInviteMoreParticipants: boolean;
};

export async function getSubscriptionAccess(): Promise<SubscriptionAccess> {
  return {
    plan: "free",
    canUseProposalParsing: false,
    canInviteMoreParticipants: true
  };
}
