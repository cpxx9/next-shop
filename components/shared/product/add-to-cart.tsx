"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CartItem } from "@/types";

interface PropTypes {
  item: CartItem;
}

const AddToCart = ({ item }: PropTypes) => {
  const handleAddToCart = async () => {};

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}></Button>
  );
};

export default AddToCart;
