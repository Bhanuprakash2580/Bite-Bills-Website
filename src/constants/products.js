export const mockProducts = [
  {
    id: 'placeholder-1',
    slug: 'choco-brownie-cookies',
    name: 'Choco Brownie Cookies',
    category: 'cookies',
    base_price: 439,
    is_available: true,
    is_bestseller: true,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 439 },
      { size: '12 Cookies', price: 799 },
      { size: '24 Cookies', price: 1499 }
    ],
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600'],
    description: 'Rich, fudgy brownie-style cookies with dark chocolate chunks.',
    ingredients: ['Dark Chocolate', 'Cocoa Powder', 'Butter', 'Brown Sugar', 'Flour', 'Vanilla']
  },
  {
    id: 'placeholder-2',
    slug: 'choco-chunk-cookies',
    name: 'Choco Chunk Cookies',
    category: 'cookies',
    base_price: 419,
    is_available: true,
    is_bestseller: true,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 419 },
      { size: '12 Cookies', price: 759 },
      { size: '24 Cookies', price: 1399 }
    ],
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600'],
    description: 'Classic chocolate chip cookies made with half-melted chunks of premium cocoa.',
    ingredients: ['Milk Chocolate', 'Butter', 'Brown Sugar', 'Flour', 'Vanilla']
  },
  {
    id: 'placeholder-3',
    slug: 'nutella-lava-cookies',
    name: 'Nutella Lava Cookies',
    category: 'cookies',
    base_price: 529,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 529 },
      { size: '12 Cookies', price: 959 },
    ],
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600'],
    description: 'Crispy on the outside, bursting with gooey Nutella on the inside.',
    ingredients: ['Nutella', 'Butter', 'Brown Sugar', 'Flour', 'Vanilla']
  },
  {
    id: 'placeholder-4',
    slug: 'butter-cookies',
    name: 'Classic Butter Cookies',
    category: 'cookies',
    base_price: 349,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 349 },
      { size: '12 Cookies', price: 600 },
    ],
    images: ['https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600'],
    description: 'Melt-in-your-mouth classic butter cookies dusted with sugar.',
    ingredients: ['Butter', 'White Sugar', 'Flour', 'Vanilla']
  },
  {
    id: 'placeholder-5',
    slug: 'almond-crunch-cookies',
    name: 'Almond Crunch Cookies',
    category: 'cookies',
    base_price: 379,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 379 },
      { size: '12 Cookies', price: 699 },
    ],
    images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600'],
    description: 'Light and crunchy almond-packed cookies.',
    ingredients: ['Almonds', 'Almond Extract', 'Butter', 'Sugar', 'Flour']
  },
  {
    id: 'placeholder-6',
    slug: 'oatmeal-raisin-cookies',
    name: 'Oatmeal Raisin Cookies',
    category: 'cookies',
    base_price: 299,
    is_available: false,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '6 Cookies', price: 299 },
      { size: '12 Cookies', price: 549 },
    ],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    description: 'Chewy, hearty oatmeal cookies with sun-dried raisins.',
    ingredients: ['Oats', 'Raisins', 'Cinnamon', 'Butter', 'Brown Sugar', 'Flour']
  },
  {
    id: 'placeholder-7',
    slug: 'vanilla-cupcakes',
    name: 'Vanilla Cupcakes',
    category: 'cupcakes',
    base_price: 149,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '1 Cupcake', price: 149 },
      { size: '6 Cupcakes', price: 799 },
    ],
    images: ['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600'], // Placeholder reuse
    description: 'Fluffy vanilla cupcakes with buttercream frosting.',
    ingredients: ['Flour', 'Butter', 'Vanilla', 'Sugar', 'Milk']
  },
  {
    id: 'placeholder-8',
    slug: 'chocolate-cupcakes',
    name: 'Chocolate Cupcakes',
    category: 'cupcakes',
    base_price: 159,
    is_available: true,
    is_bestseller: true,
    is_eggless: true,
    variants: [
      { size: '1 Cupcake', price: 159 },
      { size: '6 Cupcakes', price: 849 },
    ],
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600'],
    description: 'Rich chocolate cupcakes topped with dark chocolate ganache.',
    ingredients: ['Flour', 'Butter', 'Cocoa', 'Sugar', 'Dark Chocolate']
  },
  {
    id: 'placeholder-9',
    slug: 'almond-cupcakes',
    name: 'Almond Cupcakes',
    category: 'cupcakes',
    base_price: 169,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: '1 Cupcake', price: 169 },
      { size: '6 Cupcakes', price: 899 },
    ],
    images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600'],
    description: 'Delicate almond cupcakes with toasted almond flakes.',
    ingredients: ['Flour', 'Almond Extract', 'Butter', 'Sugar', 'Almonds']
  },
  {
    id: 'placeholder-10',
    slug: 'fudgy-brownies',
    name: 'Fudgy Chocolate Brownies',
    category: 'brownies',
    base_price: 319,
    is_available: true,
    is_bestseller: true,
    is_eggless: true,
    variants: [
      { size: 'Small Box', price: 319 },
      { size: 'Large Box', price: 599 },
    ],
    images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600'],
    description: 'Dense, chewy, ultra-fudgy chocolate brownies.',
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Flour']
  },
  {
    id: 'placeholder-11',
    slug: 'brownie-cookie-bars',
    name: 'Brownie Cookie Bars',
    category: 'brownies',
    base_price: 359,
    is_available: true,
    is_bestseller: false,
    is_eggless: true,
    variants: [
      { size: 'Small Box', price: 359 },
      { size: 'Large Box', price: 659 },
    ],
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600'],
    description: 'The best of both worlds: chocolate chip cookie dough baked on top of fudgy brownie batter.',
    ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Flour', 'Vanilla']
  },
  {
    id: 'placeholder-12',
    slug: 'assorted-gift-box',
    name: 'Assorted Gift Box',
    category: 'gifts',
    base_price: 549,
    is_available: true,
    is_bestseller: true,
    is_eggless: true,
    variants: [
      { size: 'Standard (6 Items)', price: 549 },
      { size: 'Large (12 Items)', price: 999 },
    ],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'],
    description: 'A beautiful gift box featuring our bestselling cookies and brownies.',
    ingredients: ['Assorted']
  }
];