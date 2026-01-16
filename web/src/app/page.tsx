import Link from 'next/link'
import { getProducts } from '@/services/productService'
import { ArrowRight, ShoppingBag, Star, Zap, TrendingUp } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export default async function HomePage() {
  const products = await getProducts(false)

  const saleProducts = products.filter(p => p.category === 'sale')
  const newProducts = products.filter(p => p.category === 'new')
  const hotProducts = products.filter(p => p.is_hot)

  // Use a hot product for hero, or the first product
  const heroProduct = hotProducts[0] || products[0]

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Hero Section - Immersive & Visual */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-blue-50/50" />
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-12 md:pb-16 lg:w-full lg:pb-20 xl:pb-24 flex flex-col justify-center min-h-[35vh] px-4 sm:px-6 lg:px-8">
            <div className="mt-4 mx-auto max-w-7xl sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 lg:w-[55%] lg:mx-0">
              <div className="sm:text-center lg:text-left">
                <div className="mb-6">
                  <img src="/Logo-BinBill.png" alt="BinBill Logo" className="h-16 w-auto sm:mx-auto lg:mx-0" />
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl mb-4">
                  <span className="block xl:inline">Elevate Your</span>{' '}
                  <span className="block text-blue-600 xl:inline">Lifestyle</span>
                </h1>
                <p className="mt-2 text-base text-slate-500 sm:mt-3 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-3 md:text-xl lg:mx-0 mb-6">
                  Discover curated premium products and quality second-hand deals at BinBill.
                </p>
                <div className="mt-4 sm:mt-6 flex justify-center lg:justify-start gap-3">
                  <a href="#new-arrivals" className="flex items-center justify-center px-6 py-2 border border-transparent text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-3 md:text-lg md:px-8 shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-1">
                    Shop New Arrivals
                  </a>
                  <a href="#second-hand" className="flex items-center justify-center px-6 py-2 border-2 border-slate-200 text-base font-bold rounded-full text-slate-700 bg-transparent hover:bg-slate-50 md:py-3 md:text-lg md:px-8 transition-all">
                    Shop Second Hand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[45%] bg-slate-100">
          {heroProduct ? (
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={heroProduct.image_url}
              alt={heroProduct.name}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ShoppingBag className="w-32 h-32 text-blue-200" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:via-white/0"></div>
        </div>
      </div>

      {/* Flash Sale Section */}
      {saleProducts.length > 0 && (
        <section id="sale" className="pt-10 pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-100 rounded-full text-red-600">
                <Zap className="w-6 h-6 fill-current" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Flash Sale</h2>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative">
              <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 scrollbar-hide snap-x snap-mandatory">
                {saleProducts.map((product) => (
                  <div key={product.id} className="min-w-[160px] w-[45%] sm:w-[30%] md:w-[25%] lg:w-[20%] flex-shrink-0 snap-start">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {/* Gradient Fade for scroll indication */}
              <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newProducts.length > 0 && (
        <section id="new-arrivals" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">New Arrivals</h2>
              </div>
              <Link href="/search?category=new" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Second Hand Section */}
      {products.some(p => p.category === 'second_hand') && (
        <section id="second-hand" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-100 rounded-full text-emerald-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Second Hand Deals</h2>
              </div>
              <Link href="/search?category=second_hand" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.filter(p => p.category === 'second_hand').map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommended / Hot Section */}
      {hotProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {hotProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Fallback (if needed, or just keep sections) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">All Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
