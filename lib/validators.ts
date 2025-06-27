import { PAYMENT_METHODS } from "@/lib/constants";
import { formatNumberWithDecimal } from "@/lib/utils";
import { z } from "zod";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );
const threeCharError = " must be at least 3 characters";
const isRequiredError = " is required";

export const insertProductSchema = z.object({
  name: z.string().min(3, `Name${threeCharError}`),
  slug: z.string().min(3, `Slug${threeCharError}`),
  category: z.string().min(3, `Category${threeCharError}`),
  brand: z.string().min(3, `Brand${threeCharError}`),
  description: z.string().min(3, `Description${threeCharError}`),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

export const signInFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirmed password must be at least 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, `Product${isRequiredError}`),
  name: z.string().min(1, `Name${isRequiredError}`),
  slug: z.string().min(1, `Slug${isRequiredError}`),
  qty: z.number().int().nonnegative("Quantity cannot be negative"),
  image: z.string().min(1, `Image${isRequiredError}`),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, `Session Cart ID${isRequiredError}`),
  userId: z.string().optional().nullable(),
});

export const shippingDetailsSchema = z.object({
  fullName: z.string().min(3, `Name${threeCharError}`),
  streetAddress: z.string().min(3, `Address${threeCharError}`),
  city: z.string().min(3, `City${threeCharError}`),
  postalCode: z.string().length(5, `Postal Code must be exactly 5 digits`),
  country: z.string().min(3, `Country${threeCharError}`),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, `Payment method${isRequiredError}`),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

export const insertOrderSchema = z.object({
  userId: z.string().min(1, `User${isRequiredError}`),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: "Invalid payment method",
  }),
  shippingDetails: shippingDetailsSchema,
});

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(3, `Name${threeCharError}`),
  email: z.string().min(3, `Email${threeCharError}`),
});
