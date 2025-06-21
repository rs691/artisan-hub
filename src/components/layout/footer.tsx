import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            © {new Date().getFullYear()} Artisan Hub. All Rights Reserved. Handcrafted with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
