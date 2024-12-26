
import React from 'react'
import NavItems from './_components/navItems'
import TemplateRenderer from './TemplateRenderer';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col gap-4  p-1'>
            <NavItems />
            <div className=' flex flex-col lg:flex-row justify-between items-start'>
                <div className='w-full lg:w-[46%]'>
                    {children}
                </div>
                <div className='w-full lg:w-[50%] min-h-screen max-h-full flex flex-col justify-center items-start gap-4 border border-slate-800 p-4'>
                    <TemplateRenderer />
                </div>
            </div>
        </div>
    )
}
export default Layout