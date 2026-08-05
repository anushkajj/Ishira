export interface Product {
  id: string
  name: string
  subtitle: string
  price: number // in INR (₹)
  category: 'Drinkware' | 'Storage' | 'Décor' | 'Serveware'
  imageSrc: string
  images?: string[]
  description: string
  details: string[]
  dimensions?: string
  careInstructions?: string
  isBestSeller?: boolean
  isNewArrival?: boolean
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}
