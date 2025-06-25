import { z } from "zod";
import {
  insertProductSchema,
  cartItemSchema,
  insertCartSchema,
  shippingDetailsSchema,
  paymentMethodSchema,
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
