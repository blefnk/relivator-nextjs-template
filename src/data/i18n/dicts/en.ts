import type { LocalizationResource } from "@clerk/types";

import type { DeepStringify } from "~/utils/server/string";

const dictionary = {
  general: {
    tools: "utils",
    pricing: "pricing",
    about: "about"
  },
  islands: {
    navbar: {
      pricing: {
        "toast.title": "It's free! 😜",
        "toast.description": "This project is open source and free to use. 🥳"
      },
      links: {
        github: "My GitHub profile",
        twitter: "My Twitter profile"
      },
      search: "Search...",
      "search.placeholder": "Type a command or search",
      main: {
        tools: "features",
        about: "about",
        github: "github",
        twitter: "twitter"
      },
      command: {
        tools: "Features",
        theme: "Theme",
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    footer: "Developed by {author}. The source code is available on {github}.",
    toast: {
      success: "Success",
      error: "Error",
      warning: "Warning"
    },
    "copy-button": {
      copy: "Copy to clipboard",
      copied: "Copied to clipboard!"
    }
  },
  pages: {
    "not-found": {
      title: "Page not found",
      description:
        "The resource you're seeking might have been relocated or is not a part of Bleverse Relivator. Double-check the URL or explore other sections.",
      "go-home": "Return to home page"
    },
    home: {
      title:
        "Discover the paramount {tools} for React, Next.js, and beyond. Tailored especially for you.",
      subtitle:
        "Bleverse Relivator simplifies your development journey. Start with built-in features optimized for modern web development.",
      "get-started": "See Starter Features",
      features: {
        title: "Relivator Starter Features",
        subtitle:
          "From code to design, Relivator has functionalities that supercharge your web projects.",
        cryptography: {
          title: "Next.js 13",
          description:
            "Engage with App dir, Routing, Layouts, Loading UI, API routes, and beyond."
        },
        text: {
          title: "React 18",
          description:
            "Manipulate app effortlessly with Server and Client Components. Use hook. And more."
        },
        clock: {
          title: "Database",
          description:
            "Stay on track with Drizzle ORM. Deployed on Vercel, Railway, PlanetScale, etc."
        },
        currency: {
          title: "Components",
          description:
            "UI components built using Radix UI and styled with Tailwind CSS."
        },
        files: {
          title: "Authentication",
          description: "Middleware authentication using Clerk."
        },
        devtools: {
          title: "Subscriptions",
          description: "Free and paid subscriptions using Stripe."
        }
      },
      "open-source": {
        title: "Embrace Open Source",
        subtitle: {
          first:
            "Bleverse Relivator champions open-source ethos and encourages collaborative code evolution.",
          second: "Explore our codebase on"
        },
        "stars#one": "[GitHub]: This project has only one star... 😢",
        "stars#few": "[GitHub]: This project has {count} stars! 😍",
        "stars#many": "[GitHub]: This project has {count} stars! 😍",
        "stars#other": "[GitHub]: This project has {count} stars! 😍"
      }
    },
    about: {
      title: "About",
      subtitle:
        "Bleverse Relivator is a powerful Next.js TypeScript Tailwind starter. It streamlines the development process and provides a solid foundation for creating web projects. Feel free to use, adapt, and contribute to the project by {link}.",
      "subtitle.link": "clicking here",
      credits: {
        title: "Credits",
        topics: {
          nextjs: "For the React-based web framework.",
          typescript: "For type-safe JavaScript.",
          tailwind: "For incredibly simplifying our CSS life.",
          "radix-ui": "For the wonderful primitives.",
          "shadcn/ui": "For the chic components.",
          lucide: "For the cool icons.",
          vercel: "For deploying all my projects."
        }
      },
      author: "License"
    },
    tools: {
      title: "Utils",
      clock: {
        title: "Clock"
      },
      stopwatch: {
        title: "Stopwatch",
        start: "Start",
        stop: "Stop",
        clear: "Clear"
      },
      "color-picker": {
        title: "Color Picker"
      },
      "random-color": {
        title: "Random Color",
        generate: "New color"
      },
      "binary-code": {
        title: "Binary Code",
        encode: "Text to binary",
        decode: "Binary to text"
      },
      "caesar-cipher": {
        title: "Caesar Cipher",
        encode: "Text to cipher",
        decode: "Cipher to text",
        key: "Key",
        actions: {
          code: "Code",
          decode: "Decode"
        },
        toast: {
          "invalid-key": "Please type a number between 0 - 25"
        }
      },
      "hex-code": {
        title: "Hex Code",
        encode: "Text to hex",
        decode: "Hex to text",
        actions: {
          code: "Code",
          decode: "Decode"
        }
      },
      "morse-code": {
        title: "Morse Code",
        encode: "Text to morse",
        decode: "Morse to text",
        actions: {
          code: "Code",
          decode: "Decode"
        }
      },
      "qr-code": {
        title: "QR Code",
        placeholder: "Enter your website, text or link here",
        hint: "(Your QR Code will be generated automatically)",
        actions: {
          download: "Download",
          share: {
            whatsapp: "Share on WhatsApp",
            twitter: "Share on Twitter"
          }
        }
      },
      "password-generator": {
        title: "Password Generator",
        placeholder: "Password",
        length: "Length: {length}",
        actions: {
          generate: "Generate"
        }
      },
      length: {
        title: "Length",
        kilometer: "Kilometer",
        meter: "Meter",
        centimeter: "Centimeter",
        millimeter: "Millimeter",
        micrometers: "Micrometers",
        nanometers: "Nanometers",
        mile: "Mile",
        yard: "Yard",
        foot: "Foot",
        inch: "Inch",
        "nautical mile": "Nautical Mile"
      },
      "css-minifier": {
        title: "CSS Minifier",
        actions: {
          minify: "Minify",
          minifying: "Minifying"
        },
        toast: {
          success: "CSS minified successfully",
          required: "Please enter some CSS to minify"
        }
      },
      "json-formatter": {
        title: "JSON Formatter",
        placeholder: "Number of spaces",
        actions: {
          format: "Format",
          formatting: "Formatting"
        },
        toast: {
          "invalid-json": "Invalid JSON",
          "invalid-number": "Please enter a valid number",
          success: "JSON formatted successfully",
          required: "Please enter some JSON to format"
        }
      },
      "text-converter": {
        title: "Text Converter",
        "clear-input": "Clear input",
        placeholder: {
          input: "Type something here...",
          output: "Result"
        },
        actions: {
          uppercase: "Convert to uppercase",
          lowercase: "Convert to lowercase",
          capitalize: "Capitalize",
          reverse: "Reverse",
          "remove-spaces": "Remove spaces",
          "remove-accents": "Remove accents",
          "remove-duplicates": "Remove duplicates",
          "remove-empty-lines": "Remove empty lines",
          "pascal-case": "Convert to Pascal case",
          "camel-case": "Convert to Camel case",
          "snake-case": "Convert to Snake case",
          "kebab-case": "Convert to Kebab case",
          "remove-special-characters": "Remove special characters"
        },
        toast: {
          "success-uppercase": "Converted to uppercase successfully",
          "success-lowercase": "Converted to lowercase successfully",
          "success-capitalize": "Capitalized successfully",
          "success-reverse": "Reversed successfully",
          "success-remove-spaces": "Spaces removed successfully",
          "success-remove-accents": "Accents removed successfully",
          "success-remove-duplicates": "Duplicates removed successfully",
          "success-remove-empty-lines": "Empty lines removed successfully",
          "success-pascal-case": "Converted to Pascal case successfully",
          "success-camel-case": "Converted to Camel case successfully",
          "success-snake-case": "Converted to Snake case successfully",
          "success-kebab-case": "Converted to Kebab case successfully",
          "success-remove-special-characters":
            "Special characters removed successfully",
          required: "Please enter some text to convert"
        }
      },
      currency: {
        title: "Currency",
        source: "Source",
        result: "{from} equals to {to}",
        placeholder: "Search currency...",
        "not-found": "No currency found."
      },
      todo: {
        title: "Todo",
        placeholder: "Add new task",
        actions: {
          create: "Create new todo",
          delete: "Delete task"
        }
      }
    }
  }
} as const;

const LocalizationResource = {
  locale: "en-US",
  socialButtonsBlockButton: "Continue with {{provider|titleize}}"
} as const;

export type Dictionary = DeepStringify<
  typeof dictionary & LocalizationResource
>;

export default dictionary;
