import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <p className="flex items-center gap-2 font-bold text-xl">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          UptimeChain
        </p>

        <div className="flex items-center gap-4">
          <ThemeToggle />
         <Button>
          Sign In
         </Button>
          <Button asChild>
            <p >Get Started</p>
          </Button>
        </div>
      </nav>
    </header>
  );
}