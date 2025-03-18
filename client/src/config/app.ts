import { Icons } from "@/components/icons";

interface AppConfig {
    name: string;
    github: {
      title: string;
      url: string;
    };
    author: {
      name: string;
      url: string;
    };
    socialMedias: {
      name: string;
      url: string;
      icon: React.ComponentType; 
    }[];
  }

  export const appConfig: AppConfig = {
    name: "UptimeChain",
    github: {
      title: "UptimeChain Monitor",
      url: "https://github.com/satyammjha/uptimechain",
    },
    author: {
      name: "Satyam Jha",
      url: "https://github.com/satyammjha",
    },
    socialMedias: [
        {
          name: "GitHub",
          url: "https://github.com/satyammjha",
          icon: Icons.gitHub
        },
        {
          name: "Twitter",
          url: "https://twitter.com/yourhandle",
          icon: Icons.twitter
        }
      ]
  };