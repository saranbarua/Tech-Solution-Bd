import { Product, Category, Brand, Testimonial } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Desktops",
    icon: "monitor",
    subcategories: ["Gaming PC", "Workstation", "Brand PC", "All-in-One"],
  },
  {
    id: "2",
    name: "Laptops",
    icon: "laptop",
    subcategories: [
      "Gaming Laptops",
      "Ultrabooks",
      "MacBooks",
      "Student Laptops",
    ],
  },
  {
    id: "3",
    name: "Components",
    icon: "cpu",
    subcategories: [
      "Processors",
      "Graphics Cards",
      "Motherboards",
      "RAM",
      "Storage",
    ],
  },
  {
    id: "4",
    name: "Monitors",
    icon: "tv",
    subcategories: ["Gaming Monitors", "4K Monitors", "Curved Monitors"],
  },
  {
    id: "5",
    name: "Networking",
    icon: "wifi",
    subcategories: ["Routers", "Access Points", "Switches"],
  },
  {
    id: "6",
    name: "Accessories",
    icon: "mouse",
    subcategories: ["Keyboard", "Mouse", "Headphones", "Webcams"],
  },
  {
    id: "7",
    name: "Software",
    icon: "terminal",
    subcategories: ["Operating Systems", "Antivirus", "Office Suites"],
  },
  {
    id: "8",
    name: "Gaming",
    icon: "gamepad",
    subcategories: ["Consoles", "VR Headsets", "Gaming Chairs"],
  },
];

export const BRANDS: Brand[] = [
  { id: "b1", name: "Asus", logo: "https://picsum.photos/seed/asus/200/100" },
  { id: "b2", name: "HP", logo: "https://picsum.photos/seed/hp/200/100" },
  { id: "b3", name: "Dell", logo: "https://picsum.photos/seed/dell/200/100" },
  { id: "b4", name: "MSI", logo: "https://picsum.photos/seed/msi/200/100" },
  {
    id: "b5",
    name: "Logitech",
    logo: "https://picsum.photos/seed/logi/200/100",
  },
  { id: "b6", name: "Razer", logo: "https://picsum.photos/seed/razer/200/100" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Asus ROG Strix G16 Gaming Laptop",
    category: "Laptops",
    brand: "Asus",
    price: 185000,
    oldPrice: 195000,
    image: "https://picsum.photos/seed/laptop1/600/600",
    description:
      "High-performance gaming laptop with RTX 4060 and Intel i7 13th Gen.",
    specs: {
      CPU: "Intel Core i7-13650HX",
      GPU: "RTX 4060 8GB",
      RAM: "16GB DDR5",
      SSD: "512GB NVMe",
    },
    stock: 5,
    rating: 4.8,
    reviewsCount: 124,
    isFeatured: true,
    isDeal: true,
  },
  {
    id: "p2",
    name: "Logitech G502 X Plus Wireless Mouse",
    category: "Accessories",
    brand: "Logitech",
    price: 14500,
    oldPrice: 16000,
    image: "https://picsum.photos/seed/mouse1/600/600",
    description:
      "The world's most popular gaming mouse, now redesigned and evolved.",
    specs: {
      Sensor: "HERO 25K",
      Weight: "106g",
      Connectivity: "Lightspeed Wireless",
    },
    stock: 12,
    rating: 4.9,
    reviewsCount: 850,
    isFeatured: true,
  },
  {
    id: "p3",
    name: "MSI MAG B760M Mortar Motherboard",
    category: "Components",
    brand: "MSI",
    price: 22000,
    image: "https://picsum.photos/seed/mobo1/600/600",
    description: "Reliable B760 motherboard for high-end builds.",
    specs: {
      Socket: "LGA 1700",
      "Form Factor": "Micro-ATX",
      Memory: "4x DDR5",
    },
    stock: 8,
    rating: 4.7,
    reviewsCount: 45,
  },
  {
    id: "p4",
    name: "Dell UltraSharp U2723QE 4K Monitor",
    category: "Monitors",
    brand: "Dell",
    price: 68000,
    oldPrice: 72000,
    image: "https://picsum.photos/seed/monitor1/600/600",
    description: "Brilliant 4K clarity with IPS Black technology.",
    specs: { Resolution: "3840 x 2160", Size: "27 inch", Panel: "IPS Black" },
    stock: 3,
    rating: 4.9,
    reviewsCount: 230,
    isDeal: true,
  },
  {
    id: "p5",
    name: "Intel Core i9-14900K Processor",
    category: "Components",
    brand: "Intel",
    price: 74000,
    image: "https://picsum.photos/seed/cpu1/600/600",
    description: "The ultimate desktop processor for gaming and creativity.",
    specs: { Cores: "24", Threads: "32", Clock: "6.0 GHz" },
    stock: 10,
    rating: 4.6,
    reviewsCount: 12,
    isFeatured: true,
  },
  {
    id: "p6",
    name: "TP-Link Archer AX73 AX5400 Router",
    category: "Networking",
    brand: "TP-Link",
    price: 12500,
    image: "https://picsum.photos/seed/router1/600/600",
    description:
      "Dual-Band Gigabit Wi-Fi 6 Router with ultra-fast performance.",
    specs: { Speed: "5400 Mbps", Standard: "WiFi 6", Ports: "4x Gigabit LAN" },
    stock: 15,
    rating: 4.5,
    reviewsCount: 88,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    content:
      "They cleaned up our PLC logic and reworked HMI alarm mapping — troubleshooting is now much faster and the line runs steadily. Operators feel more confident using the system.",
    author: "Maintenance Manager",
    role: "Maintenance Manager",
    avatar: "https://picsum.photos/seed/person1/200/200",
    rating: 5,
    industry: "Textile & Garments",
  },
  {
    id: "t2",
    content:
      "VFD tuning resolved speed fluctuations. Parameters were optimized and motor protection settings were documented clearly, which reduced downtime.",
    author: "Electrical Engineer",
    role: "Electrical Engineer",
    avatar: "https://picsum.photos/seed/person2/200/200",
    rating: 5,
    industry: "Steel & Metal",
  },
  {
    id: "t3",
    content:
      "Standardized control-panel wiring and clear labeling made maintenance faster. Commissioning was smooth and the handover documentation was comprehensive.",
    author: "Production Supervisor",
    role: "Production Supervisor",
    avatar: "https://picsum.photos/seed/person3/200/200",
    rating: 5,
    industry: "Food & Beverage",
  },
  {
    id: "t4",
    content:
      "Quick, practical troubleshooting focused on root causes rather than temporary fixes. Their support response was professional and effective.",
    author: "Plant Engineer",
    role: "Plant Engineer",
    avatar: "https://picsum.photos/seed/person4/200/200",
    rating: 5,
    industry: "Pharmaceutical",
  },
];
