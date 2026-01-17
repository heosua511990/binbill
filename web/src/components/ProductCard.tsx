import { Link } from '@/i18n/routing'
import { Product } from '@/types'
import { ShoppingBag, Star, Zap, Clock } from 'lucide-react'
import { MotionDiv, fadeIn } from './MotionDiv'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const discountPercentage = product.original_price && product.price < product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0

    return (
        <MotionDiv variants={fadeIn} className="h-full">
            <Link href={`/product/${product.id}`} className="group block h-full">
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col border border-slate-100">
                    {/* Image Container */}
                    <div className="aspect-square w-full overflow-hidden bg-slate-100 relative">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {product.category === 'sale' && discountPercentage > 0 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm">
                                    <Zap className="w-3 h-3 mr-1 fill-current" />
                                    -{discountPercentage}%
                                </span>
                            )}
                            {product.category === 'new' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold shadow-sm">
                                    <Clock className="w-3 h-3 mr-1" />
                                    New
                                </span>
                            )}
                            {product.is_hot && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-400 text-white text-[10px] font-bold shadow-sm">
                                    <Star className="w-3 h-3 mr-1 fill-current" />
                                    Hot
                                </span>
                            )}
                            {product.category === 'second_hand' && product.condition && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                                    {product.condition}
                                </span>
                            )}
                        </div>

                        {/* Floating Action Button */}
                        <div className="absolute bottom-3 right-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="p-2 bg-white rounded-full shadow-lg text-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[2.5em]">
                            {product.name}
                        </h3>

                        <div className="mt-auto pt-4 flex items-end justify-between">
                            <div className="flex flex-col">
                                {product.original_price && product.original_price > product.price && (
                                    <span className="text-sm text-slate-400 line-through mb-1">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.original_price)}
                                    </span>
                                )}
                                <span className={`text-xl font-bold ${product.category === 'sale' ? 'text-red-600' : 'text-slate-900'}`}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </MotionDiv>
    )
}
