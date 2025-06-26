import { getOrderById } from "@/lib/actions/order.actions";
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

  return (
    <>
      <h2>Details</h2>
    </>
  );
};

export default OrderDetailsPage;
