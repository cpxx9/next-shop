import { z } from "zod";
import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
  shippingDetailsSchema,
  paymentMethodSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema,
  updateProfileSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingDetails = z.infer<typeof shippingDetailsSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string; email: string };
};
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;
export type SalesData = {
  month: string;
  totalSales: number;
};
