'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const t = useTranslations('Common');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="relative flex items-center">
            <Globe className="w-4 h-4 absolute left-2 text-slate-500 pointer-events-none" />
            <select
                defaultValue={locale}
                className="pl-8 pr-3 py-1.5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer appearance-none hover:bg-white transition-colors"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
                <option value="ja">日本語</option>
            </select>
        </div>
    );
}
