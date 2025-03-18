import { appConfig } from "../../config/app";
import { ModeToggle } from "../mode-toggle";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export default function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col gap-8 py-8 md:py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-4">
                        <a
                            href="/"
                            className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity"
                        >
                            <Icons.logo className="h-6 w-6" />
                            <span>{appConfig.name}</span>
                        </a>
                        <p className="text-sm text-muted-foreground">
                            {appConfig.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold">Product</h3>
                        <a
                            href="/features"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="/pricing"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Pricing
                        </a>
                        <a
                            href="/docs"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Documentation
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold">Company</h3>
                        <a
                            href="/about"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="/blog"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Blog
                        </a>
                        <a
                            href="/careers"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Careers
                        </a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h3 className="font-semibold">Connect</h3>
                        <div className="flex gap-4">
                            {appConfig.socialMedias.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={social.name}
                                >
                                    <social.icon className="h-5 w-5" />
                                    <span className="sr-only">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t pt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                    <div className="text-center md:text-left">
                        © {new Date().getFullYear()} {appConfig.name}. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="/terms"
                            className="hover:text-foreground transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="/privacy"
                            className="hover:text-foreground transition-colors"
                        >
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}