import { Icons } from "@/components/icons";

interface NavItem {
    title: string;
    to?: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    protected?: boolean; // <-- Added for authentication check
}

interface NavItemWithChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
    {
        title: "Dashboard",
        to: "/dashboard",
        protected: true, // Require authentication
    },
    {
        title: "Monitors",
        protected: true,
        items: [
            {
                title: "All Monitors",
                to: "/monitors",
                protected: true,
            },
            {
                title: "Add Monitor",
                to: "/monitors/add",
                protected: true,
            },
        ],
    },
    {
        title: "Incidents",
        to: "/incidents",
        protected: true,
    },
    {
        title: "Reports",
        to: "/reports",
        protected: true,
    },
    {
        title: "Notifications",
        to: "/notifications",
        protected: true,
    },
];

export const sideMenu: NavItemWithChildren[] = [
    {
        title: "Settings",
        protected: true,
        items: [
            {
                title: "Profile",
                to: "/profile",
                protected: true,
            },
            {
                title: "API Keys",
                to: "/api-keys",
                protected: true,
            },
            {
                title: "Billing",
                to: "/billing",
                protected: true,
            },
        ],
    },
    {
        title: "Support",
        to: "/support",
    },
    {
        title: "Login",
        to: "/login",
        protected: false,
    },
    {
        title: "Sign Up",
        to: "/signup",
        protected: false,
    },
];
