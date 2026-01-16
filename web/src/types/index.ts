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
    is_active: boolean;
    created_at: string;
}
