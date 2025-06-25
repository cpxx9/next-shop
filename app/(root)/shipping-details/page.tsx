import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingDetails } from "@/types";
import ShippingDetailsForm from "@/app/(root)/shipping-details/shipping-details-form";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping Details",
};

const ShippingDetailsPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("No user ID");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingDetailsForm address={user.address as ShippingDetails} />
    </>
  );
};

export default ShippingDetailsPage;
