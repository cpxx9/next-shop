"use client";

import { useToast } from "@/hooks/use-toast";
import { shippingAddressSchema } from "@/lib/validators";
import { ShippingAddress } from "@/types";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { useTransition } from "react";

interface PropTypes {
  address: ShippingAddress;
}

const ShippingAddressForm = ({ address }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues, // remove default values for prod
  });

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-sm text-muted-foreground"></p>
      </div>
    </>
  );
};

export default ShippingAddressForm;
