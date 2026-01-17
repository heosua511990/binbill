import { Link, useRouter, usePathname } from '@/i18n/routing'
import { Search, ShoppingCart, User, Menu, Globe, Phone } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslations } from 'next-intl'
import SearchOverlay from './SearchOverlay'

export default function Header() {
    const t = useTranslations('Navigation')
    const router = useRouter()

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">
            {/* Top Bar */}
            <div className="bg-blue-600 text-white text-xs py-1.5 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Hotline: 0909 999 999</span>
                        <span>BinBill Store</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <img src="/Logo-BinBill.png" alt="BinBill" className="h-12 w-auto object-contain" />
                </Link>

                {/* Categories Button (Desktop) - Simple Dropdown */}
                <div className="hidden lg:block relative group z-50">
                    <button className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium text-sm">
                        <Menu className="w-5 h-5" />
                        <span>Categories</span>
                    </button>
                    <div className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2">
                        <div className="text-xs font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Product Types</div>
                        <Link href="/search?type=Headphones" className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Headphones</Link>
                        <Link href="/search?type=Watch" className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Watches</Link>
                        <Link href="/search?type=Speaker" className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Speakers</Link>
                        <Link href="/search?type=Camera" className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Cameras</Link>
                        <Link href="/search?type=Laptop" className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">Laptops</Link>
                        <div className="my-1 border-t border-slate-100"></div>
                        <Link href="/search?category=second_hand" className="block px-3 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg">Second Hand Deals</Link>
                    </div>
                </div>

                {/* Search Bar */}
                <SearchOverlay />

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    {/* Language */}
                    <div className="hidden sm:block">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>

            {/* Mobile Search (Below header on small screens) */}
            <div className="md:hidden px-4 pb-3">
                <SearchOverlay />
            </div>
        </header>
    )
}
