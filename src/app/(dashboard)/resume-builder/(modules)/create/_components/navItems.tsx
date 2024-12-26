'use client'

import { BreadcrumbItem, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { BreadcrumbLink } from "@/components/ui/breadcrumb"
import { ChevronRight, File, Download as DownloadIcon, Save as SaveIcon } from "lucide-react"
import { BreadcrumbList } from "@/components/ui/breadcrumb"
import DashboardBreadcrumb from "@/components/sidebar/dashboardBreadcrumb"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import useMainStore from "../../store/store"
import { useState } from "react"

const formSchema = z.object({
    fileName: z.string().min(1, "File name is required").max(50, "File name cannot exceed 50 characters"),
    template: z.enum(['Template1', 'Template2']).default('Template1'), // New template field
})

export default function NavItems() {
    const { setSelectedTemplate, exportPDF } = useMainStore();
    const { personalInfo, skillsAndLanguages, educations, projects, experiences, certificates } = useMainStore();
    const [buttonAction, setButtonAction] = useState<'save' | 'download'>('save');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileName: "Untitled Resume",
            template: "Template1", // Default template
        },
    })// here there is a problem here just toggle the templet and refresh the page to know it think here we ahve to use the loadstoredata function using useeffect

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (buttonAction === 'save') {
            // Implement save logic here
            console.log("Saving resume:", values)
            console.log("Resume data:", {
                personalInfo,
                skillsAndLanguages,
                educations,
                projects,
                experiences,
                certificates
            })
            // Add your save functionality here
        } else if (buttonAction === 'download' && exportPDF) {
            if (exportPDF) {
                exportPDF();
            }
        }
    }
    return (
        <>
            <DashboardBreadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Tools
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <ChevronRight className="h-4 w-4" />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/tools/resume-builder">
                            Resume Builder
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            Create Resume
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </DashboardBreadcrumb>

            <div className='px-4 py-2'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                        <div className='flex justify-between items-center'>
                            <div className="h-full w-[50%] flex justify-start items-center gap-1 ">
                                <File className="w-8 h-8 -mt-2" />
                                <FormField
                                    control={form.control}
                                    name="fileName"
                                    render={({ field }) => (
                                        <FormItem className="m-0">
                                            <FormControl>
                                                <input
                                                    {...field}
                                                    type="text"
                                                    className="p-0 bg-transparent text-2xl outline-none focus:outline-none md:w-[150%] "
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex gap-4'>
                                <div className="ml-auto">
                                    <FormField
                                        control={form.control}
                                        name="template"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value)
                                                        setSelectedTemplate(value as 'Template1' | 'Template2')
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-[130px]">
                                                            <SelectValue placeholder="Select template">
                                                                <div className="flex items-center gap-2">
                                                                    {field.value}
                                                                </div>
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Template1">
                                                            <div className="flex justify-start items-center gap-2">
                                                                Template 1
                                                            </div>
                                                        </SelectItem>
                                                        <SelectItem value="Template2">
                                                            <div className="flex items-center gap-2">
                                                                Template 2
                                                            </div>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex gap-4'>
                                {/* ... existing template select ... */}
                                <Button 
                                    type="submit" 
                                    variant='secondary'
                                    onClick={() => setButtonAction('download')}
                                >
                                    <DownloadIcon /> Download
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant='default'
                                    onClick={() => setButtonAction('save')}
                                >
                                    <SaveIcon /> Save
                                </Button>
                            </div>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}