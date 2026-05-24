export type ParsedProposalDraft = {
  supplierName?: string;
  category?: string;
  totalValue?: number;
  paymentTerms?: string;
  missingFields: string[];
};

export async function parseSupplierProposal(): Promise<ParsedProposalDraft> {
  // MVP placeholder: proposal parsing should stay review-first before creating supplier data.
  return {
    missingFields: ["supplierName", "category", "totalValue", "paymentTerms"]
  };
}
