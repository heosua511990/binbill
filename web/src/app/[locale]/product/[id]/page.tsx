import { getProductById } from '@/services/productService'
import { Phone, MessageCircle, ArrowLeft, ShieldCheck, Truck, Clock } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(id)

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
                    <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">Back to Home</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb / Back */}
                <nav className="flex items-center text-sm font-medium text-slate-500 mb-8 hover:text-slate-900 transition-colors w-fit">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span>Back to Collection</span>
                    </Link>
                </nav>

                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-0">
                        {/* Image Section */}
                        <div className="relative aspect-square lg:aspect-auto bg-slate-100 p-8 lg:p-16 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/50" />
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="relative w-full h-full object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="p-8 lg:p-16 flex flex-col justify-center">
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
                                    Premium Quality
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-baseline gap-4">
                                    <p className="text-4xl font-bold text-blue-600">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </p>
                                    <span className="text-lg text-slate-400 line-through decoration-2">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price * 1.2)}
                                    </span>
                                </div>
                            </div>

                            <div className="prose prose-slate prose-lg text-slate-600 mb-10">
                                <p>{product.description || 'Experience the perfect blend of style and functionality. This product is crafted with attention to detail and designed to elevate your everyday life.'}</p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 mb-10 border-y border-slate-100 py-6">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                    <span className="text-xs font-semibold text-slate-700">Genuine Product</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck className="w-6 h-6 text-blue-500" />
                                    <span className="text-xs font-semibold text-slate-700">Fast Shipping</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Clock className="w-6 h-6 text-purple-500" />
                                    <span className="text-xs font-semibold text-slate-700">24/7 Support</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="tel:0123456789"
                                    className="flex-1 group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-slate-900 rounded-2xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                                >
                                    <Phone className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                                    Call to Order
                                </a>

                                <a
                                    href="https://zalo.me/0123456789"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-700 transition-all duration-200 bg-blue-50 rounded-2xl hover:bg-blue-100 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <MessageCircle className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                                    Chat on Zalo
                                </a>
                            </div>

                            <p className="mt-6 text-center text-sm text-slate-400">
                                No account required. Direct purchase via phone or chat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
