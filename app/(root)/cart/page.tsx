import CartTable from "@/app/(root)/cart/cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart}></CartTable>
    </>
  );
};

export default CartPage;
