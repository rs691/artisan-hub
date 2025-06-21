"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.product.id} className="flex items-center p-4">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  data-ai-hint={item.product.name.split(' ').slice(0, 2).join(' ').toLowerCase()}
                />
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-muted-foreground">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 text-center"
                        min="1"
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <div className="ml-4 font-semibold text-lg w-24 text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                </div>
                <Button variant="ghost" size="icon" className="ml-4 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}>
                  <Trash2 className="h-5 w-5" />
                </Button>
              </Card>
            ))}
          </div>
          <div className="md:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal ({cartCount} items)</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button size="lg" className="w-full">Proceed to Checkout</Button>
                </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
