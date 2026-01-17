import { getProductById } from '@/services/productService'
import { getSettings } from '@/services/settingsService'
import { Phone, MessageCircle, ArrowLeft, ShieldCheck, Truck, Clock, Facebook } from 'lucide-react'
import { Link } from '@/i18n/routing'

export const revalidate = 60

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(id)
    const settings = await getSettings()

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy sản phẩm</h2>
                    <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">Quay lại trang chủ</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb / Back */}
                <nav className="flex items-center text-sm font-medium text-slate-500 mb-6 hover:text-slate-900 transition-colors w-fit">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span>Quay lại danh sách</span>
                    </Link>
                </nav>

                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-0">
                        {/* Image Section */}
                        <div className="relative aspect-square lg:aspect-auto bg-slate-50 p-8 lg:p-12 flex items-center justify-center">
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="relative w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="p-6 lg:p-12 flex flex-col justify-center">
                            <div className="mb-8">
                                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4">
                                    Chất lượng cao
                                </span>
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-baseline gap-4">
                                    <p className="text-3xl font-bold text-red-600">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                    </p>
                                    {product.original_price && product.original_price > product.price && (
                                        <span className="text-lg text-slate-400 line-through decoration-2">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.original_price)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="prose prose-slate prose-lg text-slate-600 mb-10">
                                <p>{product.description || 'Mô tả đang cập nhật...'}</p>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 mb-10 border-y border-slate-100 py-6">
                                <div className="flex flex-col items-center text-center gap-2">
                                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                    <span className="text-xs font-semibold text-slate-700">Sản phẩm chính hãng</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Truck className="w-6 h-6 text-blue-500" />
                                    <span className="text-xs font-semibold text-slate-700">Giao hàng nhanh</span>
                                </div>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <Clock className="w-6 h-6 text-purple-500" />
                                    <span className="text-xs font-semibold text-slate-700">Hỗ trợ 24/7</span>
                                </div>
                            </div>

                            {/* Actions - Dynamic from Settings */}
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={`tel:${settings.contact_phone}`}
                                        className="flex-1 group relative inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white transition-all duration-200 bg-[#0f172a] rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Phone className="w-5 h-5 mr-2" />
                                        Gọi đặt hàng
                                    </a>

                                    <a
                                        href={settings.contact_zalo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 group relative inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-[#0068ff] transition-all duration-200 bg-[#e5efff] rounded-xl hover:bg-[#dbe9ff] hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Chat Zalo
                                    </a>
                                </div>

                                <a
                                    href={settings.contact_facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full group relative inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white transition-all duration-200 bg-[#1877f2] rounded-xl hover:bg-[#166fe5] hover:shadow-md hover:-translate-y-0.5"
                                >
                                    <Facebook className="w-5 h-5 mr-2" />
                                    Chat Facebook
                                </a>
                            </div>

                            <p className="mt-6 text-center text-sm text-slate-400">
                                Không cần tài khoản. Mua hàng trực tiếp qua điện thoại hoặc chat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
