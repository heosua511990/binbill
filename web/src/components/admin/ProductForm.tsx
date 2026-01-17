'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product } from '@/types'
import { createProduct, updateProduct, uploadImage } from '@/services/productService'
import { Loader2, Upload, Eye, Save, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface ProductFormProps {
    initialData?: Product
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        price: 0,
        original_price: 0,
        description: '',
        image_url: '',
        category: 'standard',
        condition: '',
        is_hot: false,
        is_flash_sale: false,
        is_active: true,
        product_type: '',
        ...initialData
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        // @ts-ignore
        const checked = e.target.checked
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : type === 'checkbox' ? checked : value
        }))
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        try {
            setUploading(true)
            const file = e.target.files[0]
            const url = await uploadImage(file)
            setFormData(prev => ({ ...prev, image_url: url }))
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Tải ảnh thất bại')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (initialData?.id) {
                await updateProduct(initialData.id, formData)
            } else {
                await createProduct(formData)
            }
            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error('Save failed:', error)
            alert('Lưu thất bại')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100 font-sans">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Image & Basic Info */}
                <div className="w-full md:w-1/3 space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">Hình ảnh sản phẩm</label>
                        <div className="relative group w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center transition-colors hover:border-blue-400 hover:bg-blue-50/50">
                            {formData.image_url ? (
                                <>
                                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-medium">Thay đổi ảnh</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                    <span className="text-xs text-slate-400">Chưa có ảnh</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-center">
                            {uploading ? <span className="flex items-center justify-center gap-1 text-blue-600"><Loader2 className="w-3 h-3 animate-spin" /> Đang tải lên...</span> : 'Kéo thả hoặc click để tải ảnh'}
                        </p>
                    </div>

                    {/* Visibility Toggles */}
                    <div className="bg-slate-50 p-4 rounded-xl space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-medium text-slate-700">Hiển thị sản phẩm</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-medium text-slate-700">Sản phẩm nổi bật (Hot)</span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="is_hot"
                                    checked={formData.is_hot}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                            </div>
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group">
                            <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                Flash Sale <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">HOT</span>
                            </span>
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    name="is_flash_sale"
                                    checked={formData.is_flash_sale || false}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="flex-1 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            placeholder="Ví dụ: Balo Da Cao Cấp"
                        />
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Giá bán (VND)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono font-bold text-slate-900"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">₫</div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Giá gốc <span className="text-slate-400 font-normal text-xs">(Để tính giảm giá)</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="original_price"
                                    min="0"
                                    value={formData.original_price || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-slate-500"
                                    placeholder="0"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium pointer-events-none">₫</div>
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Trạng thái hàng</label>
                            <select
                                name="category"
                                value={formData.category || 'standard'}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                            >
                                <option value="standard">Tiêu chuẩn</option>
                                <option value="new">Hàng mới về (New Arrival)</option>
                                <option value="second_hand">Hàng cũ (Second Hand)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Loại sản phẩm</label>
                            <input
                                type="text"
                                name="product_type"
                                list="product-types"
                                value={formData.product_type || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                                placeholder="Ví dụ: Đồng hồ, Loa..."
                            />
                            <datalist id="product-types">
                                <option value="Headphones" />
                                <option value="Watch" />
                                <option value="Speaker" />
                                <option value="Camera" />
                                <option value="Laptop" />
                                <option value="Phone" />
                                <option value="Accessories" />
                                <option value="Furniture" />
                                <option value="Clothing" />
                            </datalist>
                        </div>
                    </div>

                    {/* Condition (Only for Second Hand) */}
                    {formData.category === 'second_hand' && (
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                            <label className="block text-sm font-bold text-amber-900 mb-2">Tình trạng sản phẩm cũ</label>
                            <input
                                type="text"
                                name="condition"
                                value={formData.condition || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all placeholder:text-amber-400/70"
                                placeholder="Ví dụ: Mới 99%, Trầy xước nhẹ..."
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Mô tả chi tiết</label>
                        <textarea
                            name="description"
                            rows={5}
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"
                            placeholder="Nhập mô tả sản phẩm..."
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                <Link href="/admin" className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
                    Hủy bỏ
                </Link>

                <div className="flex items-center gap-3">
                    {initialData?.id && (
                        <Link href={`/product/${initialData.id}`} target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                            Xem trước
                        </Link>
                    )}

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none transition-all"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {initialData ? 'Cập nhật sản phẩm' : 'Tạo sản phẩm mới'}
                    </button>
                </div>
            </div>
        </form>
    )
}
