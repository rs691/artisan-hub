import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';

// In a real app, you'd fetch this from Supabase
const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Walnut End-Grain Cutting Board',
    description: 'A stunning and durable cutting board, perfect for any kitchen.',
    price: 125.00,
    image: 'https://placehold.co/600x400.png',
    featured: true,
  },
  {
    id: 2,
    name: 'Cherry Wood Jewelry Box',
    description: 'An elegant box with intricate dovetail joinery.',
    price: 250.00,
    image: 'https://placehold.co/600x400.png',
    featured: true,
  },
  {
    id: 3,
    name: 'Oak Serving Tray',
    description: 'Serve your guests in style with this rustic oak tray.',
    price: 85.00,
    image: 'https://placehold.co/600x400.png',
    featured: true,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center bg-cover bg-center" style={{backgroundImage: "url('https://placehold.co/1600x900.png')"}}>
        <div data-ai-hint="woodworking workshop" className="absolute inset-0 bg-background/50 backdrop-blur-sm"></div>
        <div className="relative z-10 container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary-foreground drop-shadow-md" style={{textShadow: '2px 2px 4px hsl(var(--primary))'}}>
              Artisan Hub
            </h1>
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 drop-shadow">
              Discover the timeless beauty of handcrafted woodworking creations.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/products">Explore Our Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">Featured Creations</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Each piece is a testament to skill, patience, and the natural beauty of wood.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Link href={`/products#product-${product.id}`} className="block">
                  <Image
                    alt={product.name}
                    className="object-cover w-full h-60"
                    data-ai-hint={index === 0 ? "cutting board" : index === 1 ? "jewelry box" : "serving tray"}
                    height="400"
                    src={product.image}
                    width="600"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl font-headline">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{product.description}</p>
                    <p className="text-lg font-semibold mt-4 text-primary">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-12 md:py-24">
         <div className="container px-4 md:px-6 grid gap-10 md:grid-cols-2 items-center">
            <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">The Art of Woodworking</h2>
                <p className="text-muted-foreground md:text-lg">
                    We believe in the enduring quality of things made by hand. Our workshop is a place where traditional techniques meet contemporary design, resulting in pieces that are both functional and beautiful. We source our wood sustainably, respecting the material that is the heart of our craft.
                </p>
            </div>
             <div>
                <Image
                    alt="Woodworking tools"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    data-ai-hint="woodworking tools"
                    height="310"
                    src="https://placehold.co/550x310.png"
                    width="550"
                />
            </div>
         </div>
      </section>
    </div>
  );
}
