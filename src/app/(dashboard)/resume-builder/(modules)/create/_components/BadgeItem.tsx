import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

export default function BadgeItem({title, badge, onclick}: {
    title: string,
    badge?: string,
    onclick: () => void
}) {
    return (
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full flex gap-3 items-center">
            <span className='text-xs font-semibold capitalize'>{title}</span>
            {badge && (
                <Badge variant="outline" className='text-[10px] italic text-gray-400'>{badge}</Badge>
            )}
            <Button 
                variant="ghost" 
                className="w-3 h-3 px-0 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700" 
                onClick={onclick}
            >
                <X className="w-2 h-2" />
            </Button>
        </div>
    )
} 