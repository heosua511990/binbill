'use client'

import { Link, useRouter, usePathname } from '@/i18n/routing'
import { Search, ShoppingCart, User, Menu, Globe, Phone } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslations } from 'next-intl'

export default function Header() {
    const t = useTranslations('Navigation')
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">
            {/* Top Bar (Optional - like Phong Vu) */}
            <div className="bg-blue-600 text-white text-xs py-1.5 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Hotline: 1800 6868</span>
                        <span>Showroom System</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span>Tech News</span>
                        <span>Build PC</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img src="/Logo-BinBill.png" alt="BinBill" className="h-12 w-auto object-contain" />
                </Link>

                {/* Categories Button (Desktop) */}
                <button className="hidden lg:flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm">
                    <Menu className="w-5 h-5" />
                    <span>Categories</span>
                </button>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative group">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for today?"
                        className="w-full pl-4 pr-12 py-2.5 bg-slate-100 border border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                    <button
                        type="submit"
                        className="absolute right-0 top-0 h-full px-4 text-slate-500 hover:text-blue-600 transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {/* Language */}
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>

                    {/* Admin / User */}
                    <Link href="/admin" className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors group">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <User className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-medium hidden sm:block">Account</span>
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="flex flex-col items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors group relative">
                        <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                0
                            </span>
                        </div>
                        <span className="text-[10px] font-medium hidden sm:block">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search (Below header on small screens) */}
            <div className="md:hidden px-4 pb-3">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 rounded-lg text-sm outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </form>
            </div>
        </header>
    )
}
