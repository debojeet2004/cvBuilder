

import DashboardBreadcrumb from "@/components/sidebar/dashboardBreadcrumb"
import { BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import { ChevronRight } from "lucide-react"
import React from "react"
import ResumePreviewCard from "./_components/resumePreviewCard"
import { TypographyH2, TypographyLead } from "@/components/ui/Typography"


export default async function ResumeBuilder() {
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
                        <BreadcrumbLink>
                            Resume Builder
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </DashboardBreadcrumb>
                
            <div className="p-4 h-full w-full flex flex-col gap-6">
                <div>
                    <TypographyH2>Resume Builder</TypographyH2>
                    <TypographyLead>Build your resume with the help of AI</TypographyLead>
                </div>
                <div className="h-full w-full flex flex-wrap justify-center md:justify-start gap-10">
                    <ResumePreviewCard type="blank" title="Create Blank" />
                    <ResumePreviewCard type="template" preview={true} visibility="public" date="2024-01-01" title="UI-UX Developer"/>
                    <ResumePreviewCard type="template" preview={false} visibility="private" date="2024-01-01" title="Devops Engineer" />
                    <ResumePreviewCard type="template" preview={true} visibility="public" date="2024-01-01" title="Frontend Developer"/>
                    <ResumePreviewCard type="template" preview={false} visibility="public" date="2024-01-01" title="Backend Developer"/>
                    <ResumePreviewCard type="template" preview={true} visibility="private" date="2024-01-01" title="Fullstack Developer"/>
                </div>
            </div>
        </>
    )
}
