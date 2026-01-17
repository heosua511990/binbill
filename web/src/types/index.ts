export interface Product {
    id: string;
    name: string;
    price: number;
    original_price?: number;
    image_url: string;
    description?: string;
    category: 'new' | 'sale' | 'second_hand' | 'standard';
    condition?: string; // e.g. "Like New", "99%", "95%"
    is_hot: boolean;
    is_flash_sale?: boolean;
    is_active: boolean;
    product_type?: string; // e.g. "Headphones", "Watch"
    created_at: string;
}
