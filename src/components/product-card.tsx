"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card id={`product-${product.id}`} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div>
        <Image
          alt={product.name}
          className="object-cover w-full h-64"
          data-ai-hint={product.name.split(' ').slice(0, 2).join(' ').toLowerCase()}
          height={400}
          src={product.image}
          width={600}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-headline">{product.name}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
