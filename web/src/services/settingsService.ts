import { supabase } from '@/lib/supabase'

export interface Settings {
    contact_phone: string
    contact_zalo: string
    contact_facebook: string
}

export async function getSettings(): Promise<Settings> {
    const { data, error } = await supabase
        .from('settings')
        .select('*')

    if (error) {
        console.error('Error fetching settings:', error)
        return {
            contact_phone: '',
            contact_zalo: '',
            contact_facebook: ''
        }
    }

    // Convert array of key-value pairs to object
    const settings: any = {}
    data.forEach(item => {
        settings[item.key] = item.value
    })

    return settings as Settings
}

export async function updateSetting(key: string, value: string) {
    const { error } = await supabase
        .from('settings')
        .upsert({ key, value, updated_at: new Date().toISOString() })

    if (error) throw error
}
