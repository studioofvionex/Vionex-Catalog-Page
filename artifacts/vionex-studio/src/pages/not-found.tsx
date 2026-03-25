import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center flex flex-col items-center"
      >
        <h1 className="font-display text-8xl md:text-9xl text-foreground">404</h1>
        <div className="h-px w-16 bg-foreground/20 my-8" />
        <p className="text-sm md:text-base text-muted-foreground uppercase tracking-[0.2em] mb-10">
          The requested page does not exist
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center bg-foreground text-background py-4 px-10 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-black/80 hover:-translate-y-0.5"
        >
          Return to Collections
        </Link>
      </motion.div>
    </div>
  );
}
