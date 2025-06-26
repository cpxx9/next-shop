"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { convertToPlainObject, formatError } from "@/lib/utils";
import { insertOrderSchema } from "@/lib/validators";
import { CartItem } from "@/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createOrder() {
  try {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");
    const cart = await getMyCart();
    console.log(cart);
    const userId = session?.user?.id;
    if (!userId) throw new Error("User not found");

    const user = await getUserById(userId);
    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
        redirectTo: "/cart",
      };
    }
    if (!user.address) {
      return {
        success: false,
        message: "No shipping details",
        redirectTo: "/shipping-details",
      };
    }
    if (!user.paymentMethod) {
      return {
        success: false,
        message: "No payment method",
        redirectTo: "/payment-method",
      };
    }

    console.log("------------user");
    console.log(user);

    const order = insertOrderSchema.parse({
      userId: user.id,
      shippingDetails: user.address,
      paymentMethod: user.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    });

    console.log("--------order");
    console.log(order);

    const insertedOrderId = await prisma.$transaction(async (tx) => {
      const insertedOrder = await tx.order.create({ data: order });
      for (const item of cart.items as CartItem[]) {
        await tx.orderItem.create({
          data: { ...item, price: item.price, orderId: insertedOrder.id },
        });
      }
      await tx.cart.update({
        where: { id: cart.id },
        data: {
          items: [],
          totalPrice: 0,
          taxPrice: 0,
          shippingPrice: 0,
          itemsPrice: 0,
        },
      });
      return insertedOrder.id;
    });

    console.log(insertedOrderId);

    if (!insertedOrderId)
      throw new Error("Order not placed.... Transaction failed");

    return {
      success: true,
      message: "Order Created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: true, message: formatError(error) };
  }
}

export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(data);
}
