import { Link } from '@/i18n/routing'
import { Product } from '@/types'
import { Star, Zap, MapPin } from 'lucide-react'
import { MotionDiv, fadeIn } from './MotionDiv'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const discountPercentage = product.original_price && product.price < product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0

    // Mock data for "Shopee" feel
    const soldCount = Math.floor(Math.random() * 5000) + 10
    const location = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Nước ngoài'][Math.floor(Math.random() * 4)]
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

    return (
        <MotionDiv variants={fadeIn} className="h-full bg-white hover:shadow-[0_0.0625rem_20px_0_rgba(0,0,0,.05)] hover:-translate-y-[1px] transition-transform duration-100 border border-transparent hover:border-blue-500 rounded-sm overflow-hidden relative group">
            <Link href={`/product/${product.id}`} className="block h-full flex flex-col">
                {/* Image Container */}
                <div className="aspect-square w-full relative bg-slate-100">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                    />

                    {/* Overlay for sold out or other status if needed */}
                    {!product.is_active && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold px-3 py-1 bg-black/50 rounded-full text-xs">Hết hàng</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-0 left-0 flex flex-col gap-1">
                        {product.category === 'sale' && (
                            <div className="bg-amber-400 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-r-sm shadow-sm">
                                Yêu thích
                            </div>
                        )}
                        {product.is_flash_sale && (
                            <div className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r-sm shadow-sm flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5 fill-current" /> Flash Sale
                            </div>
                        )}
                    </div>

                    {/* Discount Badge (Top Right) */}
                    {discountPercentage > 0 && (
                        <div className="absolute top-0 right-0 bg-yellow-400/90 text-red-600 w-9 h-10 flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                            <span>{discountPercentage}%</span>
                            <span className="text-white uppercase">GIẢM</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-2 flex flex-col flex-1">
                    <h3 className="text-xs text-slate-900 line-clamp-2 min-h-[2.5em] mb-1 leading-snug">
                        {product.name}
                    </h3>

                    {/* Tags / Vouchers (Mock) */}
                    <div className="flex gap-1 mb-2">
                        <span className="border border-red-500 text-red-500 text-[9px] px-0.5 h-3.5 flex items-center leading-none">Rẻ vô địch</span>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-baseline gap-1 flex-wrap">
                            {product.original_price && product.original_price > product.price && (
                                <span className="text-xs text-slate-400 line-through truncate">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.original_price).replace('₫', '')}
                                </span>
                            )}
                            <span className="text-base font-medium text-red-600">
                                <span className="text-xs underline align-top mr-0.5">đ</span>
                                {new Intl.NumberFormat('vi-VN').format(product.price)}
                            </span>
                        </div>


                    </div>
                </div>
            </Link>

            {/* Hover Find Similar (Shopee feature) - Optional */}
            <div className="absolute bottom-0 left-0 w-full bg-blue-600 text-white text-center py-1.5 text-xs font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                Tìm sản phẩm tương tự
            </div>
        </MotionDiv>
    )
}
