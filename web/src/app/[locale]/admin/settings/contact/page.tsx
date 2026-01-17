'use client'

import { useState, useEffect } from 'react'
import { getSettings, updateSetting, Settings } from '@/services/settingsService'
import { Save, Loader2, Phone, MessageCircle, Facebook } from 'lucide-react'

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        contact_phone: '',
        contact_zalo: '',
        contact_facebook: ''
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadSettings()
    }, [])

    const loadSettings = async () => {
        try {
            const data = await getSettings()
            setSettings(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            await Promise.all([
                updateSetting('contact_phone', settings.contact_phone),
                updateSetting('contact_zalo', settings.contact_zalo),
                updateSetting('contact_facebook', settings.contact_facebook)
            ])
            alert('Settings saved successfully!')
        } catch (error) {
            console.error(error)
            alert('Failed to save settings')
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Contact Settings</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Hotline Number
                    </label>
                    <input
                        type="text"
                        name="contact_phone"
                        value={settings.contact_phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="e.g. 0909 999 999"
                    />
                </div>

                {/* Zalo */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" /> Zalo Link
                    </label>
                    <input
                        type="text"
                        name="contact_zalo"
                        value={settings.contact_zalo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="e.g. https://zalo.me/..."
                    />
                </div>

                {/* Facebook */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Facebook className="w-4 h-4" /> Facebook Link
                    </label>
                    <input
                        type="text"
                        name="contact_facebook"
                        value={settings.contact_facebook}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="e.g. https://facebook.com/..."
                    />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
