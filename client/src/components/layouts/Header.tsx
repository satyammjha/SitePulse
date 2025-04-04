import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, SignalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { mainMenu } from "../../config/menu";
import AuthComponent from "../Dashboard/Auth/AuthComponent";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

export default function Header() {
  const { isAuthenticated } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!isMenuOpen) setOpenDropdown(null);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all"
            >
              <SignalIcon className="h-6 w-6 text-white animate-pulse-slow" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all"
            >
              SitePulse
            </motion.span>

            <div className="absolute inset-0 -z-10 hidden group-hover:block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm animate-pulse" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6">
              {mainMenu
                .filter((item) => !item.protected || isAuthenticated)
                .map((item) => (
                  <div key={item.title} className="relative group">
                    {item.items ? (
                      <button
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                        onMouseEnter={() => setOpenDropdown(item.title)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.title}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    ) : (
                      <Link
                        to={item.to || "/"}
                        className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}

                    {item.items && openDropdown === item.title && (
                      <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-slate-800 shadow-lg rounded-lg py-2">
                        {item.items
                          .filter((subItem) => !subItem.protected || isAuthenticated)
                          .map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.to || "/"}
                              className="block px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-4" />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <AuthComponent />
            </div>
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>
    </header>
  );
}