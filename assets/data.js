// ReviewTap storefront content and commerce configuration.
// Keep this module data-only so it can later be replaced by a CMS or API response.

export const storeSettings = {
  brandName: "ReviewTap",
  legalName: "ReviewTap",
  tagline: "More reviews, one simple tap.",
  locale: "sv-SE",
  language: "en",
  currency: "SEK",
  currencySymbol: "kr",
  priceIncludesVat: true,
  defaultCountry: "SE",
  sellingRegion: "Sweden",
  freeShippingThresholdSek: 799,
  estimatedProofTime: "1–2 business days",
  estimatedProductionTime: "2–4 business days after design approval",
  estimatedDeliveryTime: "2–5 business days after production",
  paymentsEnabled: false,
  paymentStatusMessage:
    "Secure online payment will be enabled when a payment provider is connected. No card details are collected in this demo.",
  emailServiceEnabled: false,
  analyticsMode: "privacy-friendly-placeholder",
  contentStatus: "demo",
  seo: {
    defaultTitle: "ReviewTap | Custom NFC Google Review Cards & Stands",
    defaultDescription:
      "Custom NFC cards, stands, stickers and keychains that help customers reach your Google Review page with one tap or QR scan.",
    siteUrl: "https://www.reviewtap.se",
    shareImage: "reviewtap-social.webp"
  }
};

export const contact = {
  email: "hello@reviewtap.se",
  phoneDisplay: "+46 (0)8 410 245 90",
  phoneHref: "+46841024590",
  serviceArea: "Sweden",
  responseTime: "Usually within one business day",
  isPlaceholder: true,
  placeholderNotice:
    "Replace these example contact details with ReviewTap's verified business details before launch."
};

export const openingHours = [
  { days: "Monday–Friday", hours: "09:00–17:00", closed: false },
  { days: "Saturday", hours: "10:00–14:00", closed: false },
  { days: "Sunday", hours: "Closed", closed: true }
];

export const socialLinks = [
  {
    platform: "Instagram",
    handle: "@reviewtap.se",
    url: "https://www.instagram.com/reviewtap.se/",
    icon: "instagram",
    isPlaceholder: true
  },
  {
    platform: "TikTok",
    handle: "@reviewtap.se",
    url: "https://www.tiktok.com/@reviewtap.se",
    icon: "tiktok",
    isPlaceholder: true
  }
];

export const products = [
  {
    id: "nfc-card",
    slug: "reviewtap-nfc-card",
    name: "ReviewTap NFC Card",
    shortName: "NFC Card",
    description:
      "A durable, pocket-sized review card for counters, tables, reception desks or handing directly to customers.",
    startingPriceSek: 149,
    stock: 84,
    rating: 4.9,
    reviewCount: 37,
    ratingIsExample: true,
    image: "product-card.webp",
    imageAlt: "Custom ReviewTap NFC Google Review card",
    badge: "Most popular",
    customizable: true,
    active: true
  },
  {
    id: "counter-stand",
    slug: "reviewtap-counter-stand",
    name: "ReviewTap Counter Stand",
    shortName: "Counter Stand",
    description:
      "A premium acrylic-style display made for reception desks, checkouts, salons, restaurants and local shops.",
    startingPriceSek: 249,
    stock: 32,
    rating: 4.8,
    reviewCount: 24,
    ratingIsExample: true,
    image: "product-stand.webp",
    imageAlt: "ReviewTap NFC counter stand beside a checkout",
    badge: "Counter favourite",
    customizable: true,
    active: true
  },
  {
    id: "nfc-sticker",
    slug: "reviewtap-nfc-sticker",
    name: "ReviewTap NFC Sticker",
    shortName: "NFC Sticker",
    description:
      "A strong adhesive NFC sticker for doors, counters, tables, mirrors or windows, with a QR backup built into the design.",
    startingPriceSek: 99,
    stock: 146,
    rating: 4.8,
    reviewCount: 19,
    ratingIsExample: true,
    image: "product-sticker.webp",
    imageAlt: "Round ReviewTap NFC sticker with QR code",
    badge: "Best value",
    customizable: true,
    active: true
  },
  {
    id: "keychain",
    slug: "reviewtap-keychain",
    name: "ReviewTap Keychain",
    shortName: "Keychain",
    description:
      "A portable NFC keychain for mobile businesses, field teams and employees who collect feedback away from a fixed counter.",
    startingPriceSek: 129,
    stock: 61,
    rating: 4.7,
    reviewCount: 16,
    ratingIsExample: true,
    image: "product-keychain.webp",
    imageAlt: "Portable ReviewTap NFC keychain",
    badge: "Made for mobile teams",
    customizable: true,
    active: true
  },
  {
    id: "business-bundle",
    slug: "reviewtap-business-bundle",
    name: "ReviewTap Business Bundle",
    shortName: "Business Bundle",
    description:
      "A coordinated set of cards, stickers and a counter stand for businesses that want review touchpoints across the customer journey.",
    startingPriceSek: 499,
    stock: 21,
    rating: 5,
    reviewCount: 12,
    ratingIsExample: true,
    image: "product-bundle.webp",
    imageAlt: "ReviewTap business bundle with cards, stickers and stand",
    badge: "Save with a bundle",
    customizable: true,
    active: true
  }
];

export const customizationOptions = {
  productTypes: [
    { id: "nfc-card", label: "NFC Card", priceAdjustmentSek: 0 },
    { id: "counter-stand", label: "Counter Stand", priceAdjustmentSek: 100 },
    { id: "nfc-sticker", label: "NFC Sticker", priceAdjustmentSek: -50 },
    { id: "keychain", label: "Keychain", priceAdjustmentSek: -20 },
    { id: "business-bundle", label: "Business Bundle", priceAdjustmentSek: 350 }
  ],
  quantity: {
    minimum: 1,
    maximum: 100,
    default: 1,
    bulkDiscounts: [
      { minimumQuantity: 5, percentOff: 5, label: "5+ items" },
      { minimumQuantity: 10, percentOff: 10, label: "10+ items" },
      { minimumQuantity: 25, percentOff: 15, label: "25+ items" }
    ]
  },
  colors: [
    { id: "white", label: "White", hex: "#FFFFFF", priceAdjustmentSek: 0 },
    { id: "google-blue", label: "Google Blue", hex: "#1A73E8", priceAdjustmentSek: 0 },
    { id: "navy", label: "Deep Navy", hex: "#10213D", priceAdjustmentSek: 0 },
    { id: "black", label: "Modern Black", hex: "#111827", priceAdjustmentSek: 0 },
    { id: "gold", label: "Premium Gold", hex: "#C59A3D", priceAdjustmentSek: 29 },
    { id: "custom", label: "Custom brand colour", hex: "#64748B", priceAdjustmentSek: 59 }
  ],
  designStyles: [
    { id: "light", label: "Light & clean", priceAdjustmentSek: 0 },
    { id: "bold", label: "Bold & modern", priceAdjustmentSek: 0 },
    { id: "premium", label: "Premium finish", priceAdjustmentSek: 29 },
    { id: "custom-studio", label: "Custom studio layout", priceAdjustmentSek: 99 }
  ],
  orientations: [
    { id: "portrait", label: "Portrait", priceAdjustmentSek: 0 },
    { id: "landscape", label: "Landscape", priceAdjustmentSek: 0 }
  ],
  qrCode: [
    { id: "with-qr", label: "Include QR code", enabled: true, priceAdjustmentSek: 0 },
    { id: "without-qr", label: "No QR code", enabled: false, priceAdjustmentSek: 0 }
  ],
  businessLogo: [
    { id: "with-logo", label: "Include my business logo", enabled: true, priceAdjustmentSek: 0 },
    { id: "without-logo", label: "No business logo", enabled: false, priceAdjustmentSek: 0 }
  ],
  defaultHeadline: "Tap to review us on Google",
  headlineMaximumCharacters: 48,
  businessNameMaximumCharacters: 60,
  specialInstructionsMaximumCharacters: 800,
  logoUpload: {
    acceptedExtensions: [".png", ".jpg", ".jpeg", ".svg"],
    acceptedMimeTypes: ["image/png", "image/jpeg", "image/svg+xml"],
    maximumFileSizeMb: 1,
    securityNote: "Uploads must be validated, renamed and malware-scanned by the production backend."
  },
  previewNotice:
    "Your screen preview is an approximation. Final printed colours may look slightly different depending on the material, finish and display settings."
};

export const designTemplates = [
  {
    id: "classic-google-review",
    name: "Classic Google Review",
    category: "universal",
    backgroundColor: "#FFFFFF",
    primaryColor: "#1A73E8",
    accentColor: "#FABB05",
    textColor: "#10213D",
    defaultHeadline: "Tap to review us on Google",
    layout: "centered",
    qrPosition: "bottom-right"
  },
  {
    id: "clean-white-blue",
    name: "Clean White and Blue",
    category: "universal",
    backgroundColor: "#F8FBFF",
    primaryColor: "#2563EB",
    accentColor: "#22C55E",
    textColor: "#0F2747",
    defaultHeadline: "How was your visit?",
    layout: "split",
    qrPosition: "bottom-right"
  },
  {
    id: "modern-black",
    name: "Modern Black",
    category: "premium",
    backgroundColor: "#111827",
    primaryColor: "#FFFFFF",
    accentColor: "#60A5FA",
    textColor: "#FFFFFF",
    defaultHeadline: "Share your experience",
    layout: "centered",
    qrPosition: "bottom-center"
  },
  {
    id: "premium-gold",
    name: "Premium Gold",
    category: "premium",
    backgroundColor: "#172033",
    primaryColor: "#D6B261",
    accentColor: "#F7E7B2",
    textColor: "#FFFFFF",
    defaultHeadline: "Your feedback means a lot",
    layout: "framed",
    qrPosition: "bottom-right"
  },
  {
    id: "minimal-business",
    name: "Minimal Business",
    category: "professional",
    backgroundColor: "#FFFFFF",
    primaryColor: "#334155",
    accentColor: "#1A73E8",
    textColor: "#0F172A",
    defaultHeadline: "Tell us how we did",
    layout: "minimal",
    qrPosition: "bottom-left"
  },
  {
    id: "salon-barber",
    name: "Salon and Barber",
    category: "beauty",
    backgroundColor: "#FFF7F5",
    primaryColor: "#7C3AED",
    accentColor: "#F59E0B",
    textColor: "#281C3D",
    defaultHeadline: "Love your new look?",
    layout: "editorial",
    qrPosition: "bottom-right"
  },
  {
    id: "restaurant",
    name: "Restaurant",
    category: "hospitality",
    backgroundColor: "#FFF9ED",
    primaryColor: "#9A3412",
    accentColor: "#16A34A",
    textColor: "#431407",
    defaultHeadline: "Enjoyed your meal?",
    layout: "menu-card",
    qrPosition: "bottom-center"
  },
  {
    id: "cafe",
    name: "Café",
    category: "hospitality",
    backgroundColor: "#FAF7F2",
    primaryColor: "#6F4E37",
    accentColor: "#D6A85F",
    textColor: "#3B2A20",
    defaultHeadline: "Made your day? Tell us",
    layout: "warm-minimal",
    qrPosition: "bottom-right"
  },
  {
    id: "car-dealer",
    name: "Car Dealer",
    category: "automotive",
    backgroundColor: "#F4F7FA",
    primaryColor: "#0F3B63",
    accentColor: "#1A73E8",
    textColor: "#10213D",
    defaultHeadline: "How was your drive?",
    layout: "dynamic",
    qrPosition: "bottom-right"
  },
  {
    id: "cleaning-company",
    name: "Cleaning Company",
    category: "home-services",
    backgroundColor: "#F0FDFA",
    primaryColor: "#0891B2",
    accentColor: "#22C55E",
    textColor: "#164E63",
    defaultHeadline: "Happy with the sparkle?",
    layout: "fresh",
    qrPosition: "bottom-left"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    category: "professional",
    backgroundColor: "#FFFFFF",
    primaryColor: "#1E3A5F",
    accentColor: "#C59A3D",
    textColor: "#172033",
    defaultHeadline: "How was your experience?",
    layout: "architectural",
    qrPosition: "bottom-right"
  },
  {
    id: "gym-fitness",
    name: "Gym and Fitness",
    category: "fitness",
    backgroundColor: "#111827",
    primaryColor: "#22C55E",
    accentColor: "#38BDF8",
    textColor: "#FFFFFF",
    defaultHeadline: "Strong session? Share it",
    layout: "bold",
    qrPosition: "bottom-right"
  }
];

export const faqs = [
  {
    id: "what-is-nfc",
    question: "What is NFC?",
    answer:
      "NFC is a wireless technology that lets a compatible phone open a link when it is placed near the ReviewTap product."
  },
  {
    id: "need-an-app",
    question: "Does the customer need an app?",
    answer:
      "No. Most modern phones can use NFC without downloading an app, and the printed QR code provides an easy backup."
  },
  {
    id: "what-happens-on-tap",
    question: "What happens when someone taps it?",
    answer:
      "Their phone opens the Google Review page connected to the product, so they can choose to leave honest feedback in just a few steps."
  },
  {
    id: "iphone-android",
    question: "Does it work with iPhone and Android?",
    answer:
      "It should work with most modern NFC-compatible iPhone and Android devices. The QR code acts as a backup for devices or settings that do not read NFC automatically."
  },
  {
    id: "change-link",
    question: "Can I change the link later?",
    answer:
      "That depends on the product configuration. Some tags are locked after programming for reliability, while reprogrammable versions can be updated with compatible tools. The product page and your order proof will clearly state which version you are buying."
  },
  {
    id: "find-review-link",
    question: "Can you create the Google Review link for me?",
    answer:
      "Yes. If you cannot find the correct link, send us your exact business name and address during customization. We can help locate it and will ask you to test and approve the link before production."
  },
  {
    id: "design-proof",
    question: "Can I see the design before it is printed?",
    answer:
      "Yes. You receive a digital preview for approval before production. You can approve it or request changes with comments, and production will not begin until you approve the design."
  },
  {
    id: "delivery-time",
    question: "How long does delivery take?",
    answer:
      "A first design proof is normally sent within 1–2 business days. Production usually takes 2–4 business days after approval, followed by an estimated 2–5 business days for delivery. These editable estimates may vary for large or highly custom orders."
  },
  {
    id: "multiple-products",
    question: "Can I order multiple products?",
    answer:
      "Yes. You can increase the quantity, combine products in one cart, use quantity discounts when available, or choose the ReviewTap Business Bundle."
  }
];

export const businessTypes = [
  { id: "barbershops", name: "Barbershops", icon: "scissors" },
  { id: "hair-salons", name: "Hair salons", icon: "sparkles" },
  { id: "restaurants", name: "Restaurants", icon: "utensils" },
  { id: "cafes", name: "Cafés", icon: "coffee" },
  { id: "car-dealerships", name: "Car dealerships", icon: "car" },
  { id: "gyms", name: "Gyms", icon: "dumbbell" },
  { id: "cleaning-companies", name: "Cleaning companies", icon: "spray-can" },
  { id: "dental-clinics", name: "Dental clinics", icon: "tooth" },
  { id: "repair-shops", name: "Repair shops", icon: "wrench" },
  { id: "hotels", name: "Hotels", icon: "bed" },
  { id: "real-estate-agents", name: "Real estate agents", icon: "house" },
  { id: "local-stores", name: "Local stores", icon: "store" },
  { id: "mobile-businesses", name: "Mobile businesses", icon: "smartphone" }
];

export const testimonials = [
  {
    id: "example-testimonial-1",
    customerName: "Elin S.",
    businessName: "Example: Northside Hair Studio",
    rating: 5,
    quote:
      "Customers understand it immediately, and the counter stand looks polished beside our booking desk.",
    image: "testimonial-example-1.webp",
    imageAlt: "Placeholder logo for an example hair studio",
    isExample: true,
    disclosure: "Example testimonial — replace with a verified customer review before launch."
  },
  {
    id: "example-testimonial-2",
    customerName: "Johan L.",
    businessName: "Example: Harbour Street Café",
    rating: 5,
    quote:
      "The tap and QR options make it simple for guests with different phones. The custom design fits our café perfectly.",
    image: "testimonial-example-2.webp",
    imageAlt: "Placeholder logo for an example café",
    isExample: true,
    disclosure: "Example testimonial — replace with a verified customer review before launch."
  },
  {
    id: "example-testimonial-3",
    customerName: "Amir K.",
    businessName: "Example: City Mobile Detailing",
    rating: 5,
    quote:
      "The keychain is easy to carry between jobs, and the approval preview made ordering feel reassuring.",
    image: "testimonial-example-3.webp",
    imageAlt: "Placeholder logo for an example mobile detailing business",
    isExample: true,
    disclosure: "Example testimonial — replace with a verified customer review before launch."
  }
];

export const orderStatuses = [
  {
    id: "received",
    step: 1,
    label: "Order received",
    description: "The order and customization details have been received.",
    customerVisible: true,
    requiresApprovalToAdvance: false
  },
  {
    id: "design-preparation",
    step: 2,
    label: "Design being prepared",
    description: "The ReviewTap team is preparing the digital product preview.",
    customerVisible: true,
    requiresApprovalToAdvance: false
  },
  {
    id: "awaiting-approval",
    step: 3,
    label: "Waiting for customer approval",
    description: "The customer can approve the preview or request changes and leave comments.",
    customerVisible: true,
    requiresApprovalToAdvance: true
  },
  {
    id: "production",
    step: 4,
    label: "In production",
    description: "The approved design is being produced and programmed.",
    customerVisible: true,
    requiresApprovalToAdvance: false,
    entryRule: "designApprovalStatus must equal approved"
  },
  {
    id: "shipped",
    step: 5,
    label: "Shipped",
    description: "The finished order has left production and tracking is available when supplied.",
    customerVisible: true,
    requiresApprovalToAdvance: false
  },
  {
    id: "delivered",
    step: 6,
    label: "Delivered",
    description: "The carrier has marked the order as delivered.",
    customerVisible: true,
    requiresApprovalToAdvance: false
  }
];

export const shippingMethods = [
  {
    id: "standard-tracked",
    name: "Standard tracked shipping",
    description: "Tracked delivery within Sweden after production is complete.",
    priceSek: 49,
    estimatedDelivery: "2–5 business days",
    countries: ["SE"],
    freeAboveSek: 799,
    active: true
  },
  {
    id: "priority-tracked",
    name: "Priority tracked shipping",
    description: "Priority carrier service after the approved order has been produced.",
    priceSek: 99,
    estimatedDelivery: "1–3 business days",
    countries: ["SE"],
    freeAboveSek: 0,
    active: true
  }
];

export const discountCodes = [
  {
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    description: "10% off a first storefront order.",
    minimumSubtotalSek: 149,
    eligibleProductIds: [
      "nfc-card",
      "counter-stand",
      "nfc-sticker",
      "keychain",
      "business-bundle"
    ],
    maximumUsesPerCustomer: 1,
    combinable: false,
    active: true
  },
  {
    code: "BUNDLE15",
    type: "percentage",
    value: 15,
    description: "15% off the ReviewTap Business Bundle.",
    minimumSubtotalSek: 499,
    eligibleProductIds: ["business-bundle"],
    maximumUsesPerCustomer: 0,
    combinable: false,
    active: true
  }
];

export const policySummaries = [
  {
    id: "shipping",
    title: "Shipping policy",
    href: "policies.html#shipping",
    summary:
      "Orders are produced only after design approval. Delivery estimates begin when production is complete; tracking is shared when the selected carrier provides it.",
    isPlaceholder: true
  },
  {
    id: "returns",
    title: "Returns policy",
    href: "policies.html#returns",
    summary:
      "Because customized products are made for one business, change-of-mind returns may be limited. Damaged, defective or incorrectly produced items should be reported promptly with photos so they can be reviewed.",
    isPlaceholder: true
  },
  {
    id: "privacy",
    title: "Privacy policy",
    href: "policies.html#privacy",
    summary:
      "Customer details are used to prepare, fulfil and support orders. Payment data must be handled by a connected secure provider and is not collected by this demo storefront.",
    isPlaceholder: true
  },
  {
    id: "cookies",
    title: "Cookie policy",
    href: "policies.html#cookies",
    summary:
      "Essential storage keeps the cart and consent choices working. Optional privacy-friendly analytics should load only after the visitor gives the required consent.",
    isPlaceholder: true
  },
  {
    id: "terms",
    title: "Terms and conditions",
    href: "policies.html#terms",
    summary:
      "Final pricing, proof approval, production, delivery, cancellations and support responsibilities are confirmed at checkout and in the order confirmation.",
    isPlaceholder: true
  },
  {
    id: "review-policy",
    title: "Important review policy notice",
    href: "policies.html#review-policy",
    summary:
      "ReviewTap helps customers access a business’s review page. Businesses should not offer rewards only for positive reviews, block negative feedback, or mislead customers. All customers should be allowed to leave honest feedback.",
    isPlaceholder: false,
    important: true
  }
];

export const navigationItems = [
  { id: "home", label: "Home", href: "index.html#home", kind: "link" },
  { id: "how-it-works", label: "How It Works", href: "index.html#how-it-works", kind: "link" },
  { id: "products", label: "Products", href: "index.html#products", kind: "link" },
  { id: "pricing", label: "Pricing", href: "index.html#pricing", kind: "link" },
  { id: "reviews", label: "Reviews", href: "index.html#reviews", kind: "link" },
  { id: "faq", label: "FAQ", href: "index.html#faq", kind: "link" },
  { id: "contact", label: "Contact", href: "contact.html", kind: "link" },
  { id: "track-order", label: "Track Order", href: "track-order.html", kind: "link" },
  { id: "cart", label: "Cart", href: "cart.html", kind: "icon", icon: "shopping-bag" },
  { id: "order-now", label: "Order Now", href: "customize.html", kind: "primary-cta" }
];

export const whyChooseBenefits = [
  {
    id: "easier-reviews",
    title: "Makes reviewing easier",
    description: "Customers go straight to your review page without searching or typing.",
    icon: "cursor-tap"
  },
  {
    id: "more-feedback",
    title: "Helps collect more feedback",
    description: "A visible, convenient reminder makes it simpler to invite every customer to share honest feedback.",
    icon: "message-star"
  },
  {
    id: "no-subscription",
    title: "No monthly subscription",
    description: "Buy the product once and keep using it without a recurring ReviewTap fee.",
    icon: "calendar-off"
  },
  {
    id: "no-app",
    title: "No app needed",
    description: "Most modern phones can open the link with their built-in NFC reader or camera.",
    icon: "app-window"
  },
  {
    id: "reusable",
    title: "Reusable every day",
    description: "Place it where customers already complete their visit and use it again and again.",
    icon: "refresh"
  },
  {
    id: "nfc-qr",
    title: "NFC and QR together",
    description: "Tap first, with an easy QR scan available as a reliable backup.",
    icon: "nfc-qr"
  },
  {
    id: "customized",
    title: "Customized for your business",
    description: "Match your logo, colours, wording and Google Review link.",
    icon: "palette"
  },
  {
    id: "simple-setup",
    title: "Simple setup",
    description: "We prepare the design and program the link, then send a proof for your approval before production.",
    icon: "check-circle"
  }
];

export const storeData = {
  storeSettings,
  contact,
  openingHours,
  socialLinks,
  products,
  customizationOptions,
  designTemplates,
  faqs,
  businessTypes,
  testimonials,
  orderStatuses,
  shippingMethods,
  discountCodes,
  policySummaries,
  navigationItems,
  whyChooseBenefits
};

export default storeData;
