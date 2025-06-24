"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";

interface PropTypes {
  item: CartItem;
}

const AddToCart = ({ item }: PropTypes) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(item);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }

    toast({
      description: `${item.name} added to cart`,
      action: (
        <ToastAction
          className="bg-primary text-white hover:bg-gray-800"
          altText="Go to Cart"
          onClick={() => router.push("/cart")}
        >
          Go to Cart
        </ToastAction>
      ),
    });
  };

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      + Add to Cart
    </Button>
  );
};

export default AddToCart;
