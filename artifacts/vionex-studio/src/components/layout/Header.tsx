import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="w-full pt-24 pb-16 px-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal text-foreground">
          VIONEX STUDIO
        </h1>
        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="h-px w-8 bg-foreground/20" />
          <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.3em] font-medium">
            Curated Minimalist Fashion
          </p>
          <div className="h-px w-8 bg-foreground/20" />
        </div>
      </motion.div>
    </header>
  );
}
