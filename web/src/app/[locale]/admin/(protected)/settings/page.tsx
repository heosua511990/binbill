'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2, KeyRound, CheckCircle, AlertCircle, Phone } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' })
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' })
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setMessage({ type: 'success', text: 'Password updated successfully' })
            setPassword('')
            setConfirmPassword('')
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to update password' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your account preferences.</p>
                </div>

                <div className="grid gap-6">
                    {/* Contact Settings Card */}
                    <Link href="/admin/settings/contact" className="block group">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-slate-900 text-lg">Contact Information</h2>
                                        <p className="text-slate-500 text-sm mt-1">Manage hotline, Zalo, and Facebook links</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Change Password Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-slate-900">Change Password</h2>
                                    <p className="text-sm text-slate-500">Update your account password</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            {message && (
                                <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${message.type === 'success'
                                    ? 'bg-green-50 text-green-700 border-green-100'
                                    : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <p className="text-sm font-medium">{message.text}</p>
                                </div>
                            )}

                            <form onSubmit={handleUpdatePassword} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                                Updating...
                                            </>
                                        ) : (
                                            'Update Password'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
