/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderService } from "@/services/orderService";

export async function GET() {
  try {
    const id = await orderService.createOrder({
      customerId: "test_customer_123",
      items: [
        {
          id: "item_1",
          plantId: "plant_1",
          quantity: 2,
          price: 1000,
          collected: false,
          delivered: false,
          collectedQuantity: 0
        },
      ],
      comments: "order test desde API",
    });

    return Response.json({
      ok: true,
      orderId: id,
    });
  } catch (error: any) {
    return Response.json(
      {
        ok: false,
        error: error?.message || "unknown error",
      },
      { status: 500 }
    );
  }
}