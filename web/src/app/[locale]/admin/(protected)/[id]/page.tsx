import ProductForm from '@/components/admin/ProductForm'
import { getProductById } from '@/services/productService'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(id)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    )
}
