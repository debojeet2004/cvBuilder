import React from 'react'
import { GlobeIcon, LockIcon, NotepadTextIcon, PlusIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import DialogeButton from './dialogeButton'

interface ResumePreviewCardProps {
    type?: "blank" | "template" 
    title?: string
    visibility?: "public" | "private" 
    date?: string
    preview?: boolean
}

function ResumePreviewCard({type,title,visibility,date,preview=false}:ResumePreviewCardProps) {

    if(type === "blank"){
        return (
            <Link href={'/resume-builder/create/personal-info'}>
                <Card className='cursor-pointer border dark:border-gray-900 border-gray-200 w-[14rem] h-[18rem] p-6 flex flex-col justify-between items-center bg-gradient-to-b from-gray-50 to-gray-200  dark:from-gray-800 dark:to-gray-950 hover:scale-105 transition-all duration-300 group hover:shadow-lg'>
                    <CardContent className=' border-2  border-blue-500/20 rounded-lg border-dashed grid place-content-center h-[80%] w-full'>
                        <PlusIcon className="w-16 h-16 text-blue-500/50 group-hover:scale-125 transition-all duration-300" />
                    </CardContent>
                    <CardFooter className='p-0 grid place-content-center h-[15%]  w-full rounded-lg'>
                        <span className='group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300'>{title}</span>
                    </CardFooter>
                </Card>
            </Link>
        )
    }

    return (
        <Link href={'#'}>
            <Card className='cursor-pointer border dark:border-gray-900 border-gray-200 w-[14rem] h-[18rem] p-2 flex flex-col justify-between items-center bg-gradient-to-b from-gray-50 to-gray-200  dark:from-gray-800 dark:to-gray-950 hover:scale-105 transition-all duration-300 group hover:shadow-lg'>
                <CardHeader className='p-1 h-[15%] w-full flex justify-center items-center text-center rounded-md bg-gray-200 dark:bg-gray-700/30'>
                    <CardTitle className='text-xl'>{title}</CardTitle>
                </CardHeader>
                <CardContent className=' border  border-blue-500/10 rounded-lg  grid place-content-center h-[70%] w-full'>
                    {!preview ? (
                        <div className='group-hover:-translate-y-6 transition-all duration-300'>Resume-Preview</div>
                    ) : (
                        <NotepadTextIcon className="w-16 h-16 text-blue-500/50 group-hover:scale-125 transition-all duration-300" />
                    )}
                </CardContent>
                <CardFooter className='p-0 h-[10%] w-full flex justify-between items-center'>
                    <div className='px-1 w-[80%] h-full flex  justify-start items-center gap-2'>
                        {visibility === "public" && (
                            <div className='flex items-center justify-start gap-1'>
                                <GlobeIcon className='size-3 text-blue-400' />
                                <span className='text-xs text-blue-400'>Public</span>
                            </div>
                        )}
                        {visibility === "private" && (
                            <div className='flex items-center justify-start gap-1'>
                                <LockIcon className='size-3 text-red-400/70' />
                                <span className='text-xs text-red-400/70'>Private</span>
                            </div>
                        )}
                        <p className='text-xs italic text-gray-400'>{date}</p>
                    </div>
                    <div className='w-[15%] h-full flex justify-end items-center'>
                        <DialogeButton />
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
export default ResumePreviewCard