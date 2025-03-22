import { Link } from "react-router-dom";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { mainMenu } from "../../config/menu";
// import { useAuth } from "@/context/AuthContext"; // Import auth context

export default function Header() {
  var [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!isMenuOpen) setOpenDropdown(null);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <div className="p-2 rounded-lg bg-blue-600 group-hover:bg-blue-700 transition-colors">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              UptimeChain
            </span>
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
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" asChild onClick={() => {
                    setIsAuthenticated(true);
                  } } >
                    <Link to="/">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              ) : (
                <Button onClick={() => {
                  setIsAuthenticated(false);
                }}>
                  Logout
                </Button>
              )}
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