import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from './firebase'
import { Product, Category } from '@/types'

// Sample Categories
export const sampleCategories: Omit<Category, 'id'>[] = [
  {
    name: 'Rings',
    slug: 'rings',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    order: 1,
    active: true,
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    order: 2,
    active: true,
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    order: 3,
    active: true,
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    order: 4,
    active: true,
  },
  {
    name: 'Bridal',
    slug: 'bridal',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    order: 5,
    active: true,
  },
]

// Sample Products
export const sampleProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Eternal Solitaire Diamond Ring',
    slug: 'eternal-solitaire-diamond-ring',
    description: 'A timeless solitaire diamond ring featuring a brilliant-cut 1-carat diamond set in 18k white gold. The classic six-prong setting showcases the diamond\'s natural beauty and fire.',
    price: 2499,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Rings', 'Bridal'],
    options: [
      {
        name: 'Ring Size',
        values: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'],
        required: true,
      },
      {
        name: 'Metal',
        values: ['18k White Gold', '18k Yellow Gold', '18k Rose Gold', 'Platinum'],
        required: true,
      },
    ],
    stock: 5,
    featured: true,
    active: true,
  },
  {
    title: 'Vintage Pearl Strand Necklace',
    slug: 'vintage-pearl-strand-necklace',
    description: 'Elegant cultured pearl necklace featuring 7-8mm Akoya pearls with excellent luster. Each pearl is hand-selected for its round shape and beautiful nacre quality.',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Necklaces'],
    options: [
      {
        name: 'Length',
        values: ['16 inches', '18 inches', '20 inches', '24 inches'],
        required: true,
      },
    ],
    stock: 12,
    featured: true,
    active: true,
  },
  {
    title: 'Art Deco Diamond Earrings',
    slug: 'art-deco-diamond-earrings',
    description: 'Stunning Art Deco-inspired drop earrings featuring brilliant-cut diamonds in a geometric design. Crafted in 14k yellow gold with milgrain detailing.',
    price: 1299,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1588444650700-6c5c7e4b6e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Earrings'],
    options: [
      {
        name: 'Metal',
        values: ['14k Yellow Gold', '14k White Gold', '14k Rose Gold'],
        required: true,
      },
    ],
    stock: 8,
    featured: true,
    active: true,
  },
  {
    title: 'Delicate Chain Bracelet',
    slug: 'delicate-chain-bracelet',
    description: 'Minimalist chain bracelet in sterling silver with a subtle heart charm. Perfect for everyday wear or layering with other bracelets.',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Bracelets'],
    options: [
      {
        name: 'Length',
        values: ['6.5 inches', '7 inches', '7.5 inches', '8 inches'],
        required: true,
      },
    ],
    stock: 25,
    featured: true,
    active: true,
  },
  {
    title: 'Sapphire Halo Engagement Ring',
    slug: 'sapphire-halo-engagement-ring',
    description: 'Breathtaking blue sapphire engagement ring surrounded by a halo of brilliant diamonds. Set in platinum with diamond-accented band.',
    price: 3299,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Rings', 'Bridal'],
    options: [
      {
        name: 'Ring Size',
        values: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9'],
        required: true,
      },
    ],
    stock: 3,
    featured: true,
    active: true,
  },
  {
    title: 'Rose Gold Tennis Bracelet',
    slug: 'rose-gold-tennis-bracelet',
    description: 'Classic tennis bracelet featuring 2 carats of brilliant-cut diamonds set in 14k rose gold. Secure box clasp with safety latch.',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1588444650700-6c5c7e4b6e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Bracelets'],
    options: [
      {
        name: 'Length',
        values: ['6.5 inches', '7 inches', '7.5 inches'],
        required: true,
      },
    ],
    stock: 6,
    featured: true,
    active: true,
  },
  {
    title: 'Emerald Cut Diamond Stud Earrings',
    slug: 'emerald-cut-diamond-stud-earrings',
    description: 'Elegant emerald-cut diamond stud earrings totaling 1 carat. Set in 14k white gold with secure screw-back posts.',
    price: 1599,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Earrings'],
    options: [
      {
        name: 'Metal',
        values: ['14k White Gold', '14k Yellow Gold', 'Platinum'],
        required: true,
      },
    ],
    stock: 10,
    featured: true,
    active: true,
  },
  {
    title: 'Infinity Symbol Necklace',
    slug: 'infinity-symbol-necklace',
    description: 'Delicate infinity symbol pendant necklace in 14k yellow gold. Symbol of eternal love and friendship, perfect for gifting.',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    ],
    categories: ['Necklaces'],
    options: [
      {
        name: 'Chain Length',
        values: ['16 inches', '18 inches', '20 inches'],
        required: true,
      },
    ],
    stock: 18,
    featured: true,
    active: true,
  },
]

// Function to seed categories
export async function seedCategories() {
  const batch = writeBatch(db)
  
  sampleCategories.forEach((category) => {
    const categoryRef = doc(collection(db, 'categories'))
    batch.set(categoryRef, category)
  })
  
  await batch.commit()
  console.log('Categories seeded successfully!')
}

// Function to seed products
export async function seedProducts() {
  const batch = writeBatch(db)
  
  sampleProducts.forEach((product) => {
    const productRef = doc(collection(db, 'products'))
    batch.set(productRef, {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
  
  await batch.commit()
  console.log('Products seeded successfully!')
}

// Function to seed all data
export async function seedAllData() {
  try {
    await seedCategories()
    await seedProducts()
    console.log('All sample data seeded successfully!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

