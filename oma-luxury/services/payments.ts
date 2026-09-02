// TODO: Connect Paystack or Flutterwave
const PAYMENTS_ENABLED = false;

export interface PaymentPayload {
  orderId: string;
  amount: number;
  email: string;
}

export async function initiatePayment(payload: PaymentPayload): Promise<{ reference: string; checkoutUrl?: string }> {
  if (PAYMENTS_ENABLED) {
    throw new Error("Real payment provider integration not configured.");
  }

  return {
    reference: `OMA-${payload.orderId}-${Date.now()}`,
  };
}
