import { useGetProducts } from "@workspace/api-client-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const REDBUBBLE_STORE_URL = "https://www.redbubble.com/people/VionexStudio/shop";

export default function Home() {
  const { data, isLoading, isError } = useGetProducts();
  const hasProducts = data?.products && data.products.length > 0;
  const isEmpty = data?.products && data.products.length === 0 && !isLoading;

  return (
    <div className="min-h-screen w-full flex flex-col bg-background selection:bg-foreground selection:text-background">
      <Header />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-12">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-10 xl:gap-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="w-full aspect-square bg-black/5" />
                <Skeleton className="h-4 w-3/4 bg-black/5 mt-2" />
                <Skeleton className="h-12 w-full bg-black/10 mt-4" />
              </div>
            ))}
          </div>
        )}

        {(isError || isEmpty) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="h-px w-16 bg-foreground/20 mb-10" />
            <h2 className="text-xl font-medium tracking-[0.3em] uppercase text-foreground mb-5">
              Explore the Collection
            </h2>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed mb-10">
              Browse the full VIONEX STUDIO catalog on Redbubble — featuring tees, hoodies, mugs, and more with our signature minimalist designs.
            </p>
            <a
              href={REDBUBBLE_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-foreground text-background py-4 px-10 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:bg-black/80 hover:-translate-y-0.5"
            >
              Visit VIONEX STUDIO on Redbubble
            </a>
            <div className="h-px w-16 bg-foreground/20 mt-10" />
          </motion.div>
        )}

        {hasProducts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-x-8 lg:gap-x-10 gap-y-16">
            {data!.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
