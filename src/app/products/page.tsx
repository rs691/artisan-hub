"use client";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types";

// In a real app, you'd fetch this from Supabase
const allProducts: Product[] = [
    {
        id: 1,
        name: 'Walnut End-Grain Cutting Board',
        description: 'A stunning and durable cutting board made from premium North American walnut. The end-grain construction is gentle on knives and self-healing.',
        price: 125.00,
        image: 'https://placehold.co/600x400.png',
        featured: true,
    },
    {
        id: 2,
        name: 'Cherry Wood Jewelry Box',
        description: 'An elegant box with intricate dovetail joinery and a hand-rubbed oil finish. Lined with soft felt to protect your valuables.',
        price: 250.00,
        image: 'https://placehold.co/600x400.png',
        featured: true,
    },
    {
        id: 3,
        name: 'Oak Serving Tray',
        description: 'Serve your guests in style with this rustic oak tray, featuring sturdy cast iron handles. Perfect for charcuterie or breakfast in bed.',
        price: 85.00,
        image: 'https://placehold.co/600x400.png',
        featured: true,
    },
    {
        id: 4,
        name: 'Maple & Padauk Coasters (Set of 4)',
        description: 'Protect your furniture with these beautiful geometric coasters, combining the light color of maple with the vibrant red of padauk.',
        price: 45.00,
        image: 'https://placehold.co/600x400.png',
        featured: false,
    },
    {
        id: 5,
        name: 'Hand-carved Wooden Spoon',
        description: 'A unique, hand-carved cooking spoon made from sustainably sourced birch wood. Each spoon has its own character.',
        price: 35.00,
        image: 'https://placehold.co/600x400.png',
        featured: false,
    },
    {
        id: 6,
        name: 'Minimalist Desk Organizer',
        description: 'Keep your desk tidy with this minimalist organizer, crafted from solid ash wood with slots for pens, phone, and business cards.',
        price: 70.00,
        image: 'https://placehold.co/600x400.png',
        featured: false,
    },
];

export default function ProductsPage() {
    return (
        <div className="container py-12 md:py-16">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Our Collection</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Browse our selection of handcrafted wooden goods. Each item is made with passion and precision.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
