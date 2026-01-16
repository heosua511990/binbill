import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

export const getProducts = async (isAdmin: boolean = false) => {
    try {
        let query = supabase.from('products').select('*').order('created_at', { ascending: false })

        if (!isAdmin) {
            query = query.eq('is_active', true)
        }

        const { data, error } = await query
        if (error) throw error
        return data as Product[]
    } catch (error) {
        console.warn('Supabase request failed, returning mock data:', error)
        return [
            {
                id: '1',
                name: 'Premium Leather Backpack',
                price: 1250000,
                original_price: 1500000,
                image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
                description: 'Handcrafted from genuine full-grain leather. Features a padded laptop compartment and multiple pockets for organization.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Minimalist Watch',
                price: 850000,
                image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
                description: 'Elegant design with a slim profile. Water-resistant and durable sapphire crystal glass.',
                category: 'new',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Wireless Noise-Canceling Headphones',
                price: 3400000,
                image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
                description: 'Immerse yourself in music with industry-leading noise cancellation. 30-hour battery life.',
                category: 'standard',
                is_hot: true,
                is_active: false,
                created_at: new Date().toISOString()
            },
            {
                id: '4',
                name: 'Smart Home Speaker',
                price: 1200000,
                original_price: 1800000,
                image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
                description: 'Voice-controlled speaker with premium sound quality. Controls your smart home devices.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '5',
                name: 'Vintage Film Camera',
                price: 2500000,
                image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
                description: 'Classic 35mm film camera. Fully functional and tested.',
                category: 'second_hand',
                condition: '95% - Excellent',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '6',
                name: 'Designer Sunglasses',
                price: 3200000,
                original_price: 4500000,
                image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
                description: 'Premium acetate frames with UV400 protection.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '7',
                name: 'Mechanical Keyboard',
                price: 1800000,
                image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
                description: 'RGB mechanical keyboard with custom switches.',
                category: 'new',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '8',
                name: 'iPhone 13 Pro Max',
                price: 15500000,
                image_url: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80',
                description: '128GB, Sierra Blue. Battery 92%.',
                category: 'second_hand',
                condition: '98% - Like New',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '9',
                name: 'MacBook Air M1',
                price: 14000000,
                image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
                description: '8GB/256GB Space Gray. Minor scratches on bottom.',
                category: 'second_hand',
                condition: '90% - Good',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '10',
                name: 'Ceramic Coffee Set',
                price: 450000,
                image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
                description: 'Handmade ceramic coffee set for two.',
                category: 'new',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '11',
                name: 'Wireless Earbuds',
                price: 890000,
                original_price: 1200000,
                image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
                description: 'True wireless earbuds with charging case.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '12',
                name: 'Gaming Mouse',
                price: 750000,
                original_price: 1100000,
                image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
                description: 'High precision optical sensor gaming mouse.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '13',
                name: 'Portable Charger',
                price: 450000,
                original_price: 600000,
                image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
                description: '20000mAh fast charging power bank.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '14',
                name: 'Bluetooth Speaker Mini',
                price: 350000,
                original_price: 550000,
                image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
                description: 'Compact speaker with big sound.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '15',
                name: 'Fitness Tracker',
                price: 650000,
                original_price: 990000,
                image_url: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
                description: 'Track your steps, heart rate, and sleep.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '16',
                name: 'Laptop Sleeve',
                price: 250000,
                original_price: 400000,
                image_url: 'https://images.unsplash.com/photo-1588127333419-b9d7de223dcf?auto=format&fit=crop&w=800&q=80',
                description: 'Protective sleeve for 13-inch laptops.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '17',
                name: 'Desk Lamp',
                price: 320000,
                original_price: 500000,
                image_url: 'https://images.unsplash.com/photo-1534281303260-5920ed3ef03c?auto=format&fit=crop&w=800&q=80',
                description: 'LED desk lamp with adjustable brightness.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '18',
                name: 'Wireless Charger',
                price: 290000,
                original_price: 450000,
                image_url: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80',
                description: 'Fast wireless charging pad.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '19',
                name: 'USB-C Hub',
                price: 550000,
                original_price: 890000,
                image_url: 'https://images.unsplash.com/photo-1616410011236-7a421b19a586?auto=format&fit=crop&w=800&q=80',
                description: '7-in-1 USB-C hub for laptops.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '20',
                name: 'Action Camera 4K',
                price: 1500000,
                original_price: 2200000,
                image_url: 'https://images.unsplash.com/photo-1564466021188-1e17010c5411?auto=format&fit=crop&w=800&q=80',
                description: 'Waterproof 4K action camera with mounting kit.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '21',
                name: 'Electric Toothbrush',
                price: 850000,
                original_price: 1200000,
                image_url: 'https://images.unsplash.com/photo-1559676169-703296047d16?auto=format&fit=crop&w=800&q=80',
                description: 'Sonic cleaning technology with 3 modes.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '22',
                name: 'Yoga Mat Premium',
                price: 350000,
                original_price: 500000,
                image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80',
                description: 'Non-slip eco-friendly yoga mat.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '23',
                name: 'Smart LED Bulb',
                price: 150000,
                original_price: 250000,
                image_url: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
                description: 'WiFi enabled RGB smart bulb.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '24',
                name: 'Travel Backpack',
                price: 950000,
                original_price: 1400000,
                image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
                description: 'Water-resistant travel backpack with USB port.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '25',
                name: 'Wireless Mouse',
                price: 250000,
                original_price: 390000,
                image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
                description: 'Ergonomic wireless mouse.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '26',
                name: 'Phone Tripod',
                price: 180000,
                original_price: 300000,
                image_url: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80',
                description: 'Flexible tripod for smartphones.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '27',
                name: 'Bluetooth Headset',
                price: 450000,
                original_price: 700000,
                image_url: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?auto=format&fit=crop&w=800&q=80',
                description: 'Mono bluetooth headset for calls.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '28',
                name: 'Laptop Stand',
                price: 320000,
                original_price: 480000,
                image_url: 'https://images.unsplash.com/photo-1616410011236-7a421b19a586?auto=format&fit=crop&w=800&q=80',
                description: 'Aluminum alloy adjustable laptop stand.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '29',
                name: 'Ring Light',
                price: 280000,
                original_price: 420000,
                image_url: 'https://images.unsplash.com/photo-1624823183483-36c46a676a6e?auto=format&fit=crop&w=800&q=80',
                description: '10-inch LED ring light for streaming.',
                category: 'sale',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            }
        ] as Product[]
    }
}

export const getProductById = async (id: string) => {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
        if (error) throw error
        return data as Product
    } catch (error) {
        console.warn('Supabase request failed, returning mock data:', error)
        // Return a mock product if ID matches one of our mocks, or a generic one
        const mocks = [
            {
                id: '1',
                name: 'Premium Leather Backpack',
                price: 1250000,
                original_price: 1500000,
                image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
                description: 'Handcrafted from genuine full-grain leather. Features a padded laptop compartment and multiple pockets for organization.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '2',
                name: 'Minimalist Watch',
                price: 850000,
                image_url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
                description: 'Elegant design with a slim profile. Water-resistant and durable sapphire crystal glass.',
                category: 'new',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '3',
                name: 'Wireless Noise-Canceling Headphones',
                price: 3400000,
                image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
                description: 'Immerse yourself in music with industry-leading noise cancellation. 30-hour battery life.',
                category: 'standard',
                is_hot: true,
                is_active: false,
                created_at: new Date().toISOString()
            },
            {
                id: '4',
                name: 'Smart Home Speaker',
                price: 1200000,
                original_price: 1800000,
                image_url: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
                description: 'Voice-controlled speaker with premium sound quality. Controls your smart home devices.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '5',
                name: 'Vintage Film Camera',
                price: 2500000,
                image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
                description: 'Classic 35mm film camera. Fully functional and tested.',
                category: 'second_hand',
                condition: '95% - Excellent',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '6',
                name: 'Designer Sunglasses',
                price: 3200000,
                original_price: 4500000,
                image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
                description: 'Premium acetate frames with UV400 protection.',
                category: 'sale',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '7',
                name: 'Mechanical Keyboard',
                price: 1800000,
                image_url: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
                description: 'RGB mechanical keyboard with custom switches.',
                category: 'new',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '8',
                name: 'iPhone 13 Pro Max',
                price: 15500000,
                image_url: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80',
                description: '128GB, Sierra Blue. Battery 92%.',
                category: 'second_hand',
                condition: '98% - Like New',
                is_hot: true,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '9',
                name: 'MacBook Air M1',
                price: 14000000,
                image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
                description: '8GB/256GB Space Gray. Minor scratches on bottom.',
                category: 'second_hand',
                condition: '90% - Good',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: '10',
                name: 'Ceramic Coffee Set',
                price: 450000,
                image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
                description: 'Handmade ceramic coffee set for two.',
                category: 'new',
                is_hot: false,
                is_active: true,
                created_at: new Date().toISOString()
            }
        ] as Product[]
        return mocks.find(p => p.id === id) || mocks[0]
    }
}

export const createProduct = async (product: Partial<Product>) => {
    // Remove id if it's undefined/null so DB generates it, or keep it if provided
    const { data, error } = await supabase.from('products').insert([product]).select().single()
    if (error) throw error
    return data as Product
}

export const updateProduct = async (id: string, updates: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single()
    if (error) throw error
    return data as Product
}

export const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
}

export const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file)

    if (uploadError) {
        throw uploadError
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath)
    return data.publicUrl
}
