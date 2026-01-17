'use client'

import Link from 'next/link'
import { Package, Settings, LogOut } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const t = useTranslations('Admin')
    const tAuth = useTranslations('Auth')

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login')
        }
    }, [user, loading, router])

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>
    }

    if (!user) {
        return null // Will redirect
    }

    const navItems = [
        { icon: Package, label: t('products'), href: '/admin' },
        { icon: Settings, label: t('settings'), href: '/admin/settings' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed inset-y-0 z-50 hidden lg:flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            B
                        </div>
                        <span className="text-xl font-bold text-slate-900">{t('sidebarTitle')}</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        {tAuth('signOut')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64">
                {children}
            </main>
        </div>
    )
}
