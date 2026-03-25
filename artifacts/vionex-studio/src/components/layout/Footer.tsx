export function Footer() {
  return (
    <footer className="w-full mt-32 py-16 px-6 border-t border-border bg-background">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <p className="text-sm md:text-base text-foreground/80 leading-relaxed max-w-2xl font-light">
          VIONEX STUDIO crafts timeless, limited-edition pieces that blend modern minimalism with artistic expression. Each design is a statement.
        </p>
        
        <a 
          href="https://pinterest.com/vionexstudio" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center space-x-2 text-sm uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors duration-300"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.182 0 7.425 2.981 7.425 6.953 0 4.156-2.616 7.502-6.248 7.502-1.222 0-2.373-.635-2.766-1.385l-.752 2.873c-.272 1.039-.997 2.34-1.488 3.136 1.124.343 2.316.528 3.551.528 6.621 0 12.001-5.367 12.001-11.988 0-6.62-5.38-11.987-12.001-11.987z"/>
          </svg>
          <span>Follow on Pinterest</span>
        </a>

        <div className="mt-16 text-xs text-muted-foreground uppercase tracking-widest">
          &copy; {new Date().getFullYear()} VIONEX STUDIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
