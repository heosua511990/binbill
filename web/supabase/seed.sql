-- Seed data for Products table

-- 1. Flash Sale Items
INSERT INTO public.products (name, price, original_price, image_url, description, category, is_hot, is_active) VALUES
('Wireless Noise Cancelling Headphones', 1290000, 2500000, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'Premium noise cancelling headphones with 30h battery life.', 'sale', true, true),
('Smart Fitness Watch', 890000, 1500000, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', 'Track your fitness goals with this advanced smart watch.', 'sale', true, true),
('Portable Bluetooth Speaker', 450000, 800000, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', 'Powerful sound in a compact design. Waterproof.', 'sale', false, true),
('Mechanical Gaming Keyboard', 750000, 1200000, 'https://images.unsplash.com/photo-1587829741301-dc798b91a91e?auto=format&fit=crop&w=800&q=80', 'RGB mechanical keyboard with blue switches.', 'sale', false, true),
('4K Action Camera', 1500000, 2200000, 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80', 'Capture your adventures in stunning 4K resolution.', 'sale', true, true);

-- 2. New Arrivals
INSERT INTO public.products (name, price, image_url, description, category, is_hot, is_active) VALUES
('Minimalist Leather Backpack', 1800000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', 'Handcrafted leather backpack for daily commute.', 'new', true, true),
('Ceramic Coffee Set', 450000, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', 'Beautiful ceramic coffee set for two.', 'new', false, true),
('Abstract Wall Art', 1200000, 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', 'Modern abstract art piece for your living room.', 'new', false, true),
('Designer Sunglasses', 2100000, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', 'Stylish sunglasses with UV protection.', 'new', true, true),
('Bamboo Plant Stand', 350000, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', 'Eco-friendly bamboo stand for your indoor plants.', 'new', false, true);

-- 3. Second Hand Deals
INSERT INTO public.products (name, price, original_price, image_url, description, category, condition, is_active) VALUES
('iPhone 12 Pro Max (Used)', 11500000, 28000000, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80', 'Good condition, battery 88%. Includes charger.', 'second_hand', '95% - Good', true),
('MacBook Air M1 (2020)', 14000000, 23000000, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80', 'Silver, 8GB/256GB. Minor scratches on bottom.', 'second_hand', '98% - Like New', true),
('Sony A6000 Camera Body', 6500000, 11000000, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 'Low shutter count. Perfect for beginners.', 'second_hand', '90% - Used', true),
('Vintage Denim Jacket', 450000, 1200000, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80', 'Classic vintage denim jacket. Size L.', 'second_hand', 'Vintage', true),
('Nintendo Switch V2', 3800000, 6500000, 'https://images.unsplash.com/photo-1578303512597-8198dd38adbd?auto=format&fit=crop&w=800&q=80', 'Includes 2 games and carrying case.', 'second_hand', '99% - Like New', true);

-- 4. Standard Products
INSERT INTO public.products (name, price, image_url, description, category, is_active) VALUES
('Cotton T-Shirt Basic', 150000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', '100% cotton t-shirt. Available in multiple colors.', 'standard', true),
('Running Shoes', 850000, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', 'Lightweight running shoes for daily exercise.', 'standard', true),
('Stainless Steel Water Bottle', 250000, 'https://images.unsplash.com/photo-1602143407151-11115cd4e69b?auto=format&fit=crop&w=800&q=80', 'Keep your drinks cold for 24 hours.', 'standard', true),
('Yoga Mat', 300000, 'https://images.unsplash.com/photo-1592432678010-c59121463715?auto=format&fit=crop&w=800&q=80', 'Non-slip yoga mat for home workouts.', 'standard', true),
('Desk Lamp LED', 450000, 'https://images.unsplash.com/photo-1534073828943-f801091a7d58?auto=format&fit=crop&w=800&q=80', 'Adjustable brightness and color temperature.', 'standard', true);
