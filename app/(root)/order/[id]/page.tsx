import OrderDetailsTable from "@/app/(root)/order/[id]/order-details-table";
import { auth } from "@/auth";
import { getOrderById } from "@/lib/actions/order.actions";
import { convertToPlainObject, shortenUuid } from "@/lib/utils";
import { Order, ShippingDetails } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Details",
};

interface PropTypes {
  params: Promise<{ id: string }>;
}

const OrderDetailsPage = async ({ params }: PropTypes) => {
  const { id } = await params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  return (
    <>
      <h1 className="py-4 text-2xl">Order {shortenUuid(order.id)}</h1>
      <OrderDetailsTable
        order={{
          ...order,
          shippingDetails: order.shippingDetails as ShippingDetails,
        }}
        paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
        isAdmin={session?.user?.role === "admin" || false}
      />
    </>
  );
};

export default OrderDetailsPage;
