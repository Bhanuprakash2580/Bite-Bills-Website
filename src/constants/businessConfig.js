export const BUSINESS_CONFIG = {
  name: "Bite Bills",
  tagline: "Fresh Eggless Cakes & Cookies 🎂",
  phone: "7288039532",
  whatsapp: "917288039532",
  instagram: "bitebills",
  email: "hello@bitebills.in",
  address: "Nizamabad, Telangana, India",
  storeLocation: {
    lat: 18.6725,                    // Nizamabad coordinates
    lng: 78.0941
  },
  delivery: {
    maxRadiusKm: 100,
    freeDeliveryKm: 5,
    perKmCharge: 10,
    minimumOrderAmount: 299
  },
  socials: {
    instagram: "https://instagram.com/bitebills",
    whatsapp: "https://wa.me/917288039532?text=Hi! I want to order from Bite Bills 🎂",
    facebook: "",
    youtube: ""
  },
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder'
  }
}