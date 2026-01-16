'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signOut: () => Promise<void>
    signInMock: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const setData = async () => {
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL
            const isMock = !url || url.includes('placeholder') || !url.startsWith('http')

            if (isMock) {
                console.log('Running in Mock Mode')
                // Check local storage for mock session
                const mockSession = localStorage.getItem('mock_session')
                if (mockSession) {
                    const user = JSON.parse(mockSession)
                    setUser(user)
                    setSession({ user } as any)
                }
                setLoading(false)
                return
            }

            const { data: { session }, error } = await supabase.auth.getSession()
            if (error) throw error
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        setData()

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    const signInMock = async (email: string) => {
        const mockUser: User = {
            id: 'mock-user-id',
            aud: 'authenticated',
            role: 'authenticated',
            email: email,
            app_metadata: { provider: 'email' },
            user_metadata: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            phone: '',
            confirmed_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString(),
            factors: []
        }
        localStorage.setItem('mock_session', JSON.stringify(mockUser))
        setUser(mockUser)
        setSession({ user: mockUser } as any)
        router.push('/admin')
    }

    const signOut = async () => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const isMock = !url || url.includes('placeholder') || !url.startsWith('http')

        if (isMock) {
            localStorage.removeItem('mock_session')
            setUser(null)
            setSession(null)
        } else {
            await supabase.auth.signOut()
        }
        router.push('/admin/login')
    }

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut, signInMock }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
