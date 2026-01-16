import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <ProductForm />
        </div>
    )
}
