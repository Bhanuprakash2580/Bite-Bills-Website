export const BUSINESS_CONFIG = {
  name: "Bite Bills",
  tagline: "Cookies that hit different 🍪",
  phone: "+91 XXXXXXXXXX",           // owner fills this
  whatsapp: "+91 XXXXXXXXXX",        // WhatsApp business number
  instagram: "bitebills",            // Instagram handle (no @)
  email: "hello@bitebills.in",
  address: "Your Shop Address, City, Pincode",
  storeLocation: {
    lat: 17.3850,                    // UPDATE with actual store coordinates
    lng: 78.4867                     // UPDATE with actual store coordinates
  },
  delivery: {
    maxRadiusKm: 40,
    freeDeliveryKm: 5,
    perKmCharge: 10,                 // ₹10 per km after 5km
    minimumOrderAmount: 299
  },
  socials: {
    instagram: "https://instagram.com/bitebills",
    whatsapp: "https://wa.me/91XXXXXXXXXX?text=Hi! I want to order from Bite Bills 🍪",
    facebook: "",
    youtube: ""
  },
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID
  }
}