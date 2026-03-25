import { motion } from "framer-motion";
import type { Product } from "@workspace/api-client-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], 
        delay: index * 0.1 
      }}
      className="group flex flex-col gap-5 w-full"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-black/5">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-10 pointer-events-none" />
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="object-cover w-full h-full transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-1 px-1">
        <h3 className="text-sm font-medium tracking-wide text-foreground uppercase line-clamp-2 leading-relaxed h-10">
          {product.title}
        </h3>
        
        <a 
          href={product.productUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-6 inline-flex items-center justify-center w-full bg-foreground text-background py-3.5 px-6 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-black/80 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          Shop Now on Redbubble
        </a>
      </div>
    </motion.div>
  );
}
