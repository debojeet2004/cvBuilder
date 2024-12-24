import { Card, CardContent } from "@/components/ui/card"
import { TypographyH2, TypographyH4, TypographyH3, TypographyP } from "@/components/ui/Typography"
import { FileText, Sparkles, Target } from "lucide-react"
import React from "react"
import Image from "next/image"

export default async function ResumeBuilder() {
    return (
        <>
            <div className="grid place-items-center h-full w-full px-6 md:px-2">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full text-sm font-medium text-purple-400 mb-4">
                        ✨ Coming Soon
                    </div>
                    <TypographyH2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                        Resume Builder
                    </TypographyH2>
                    <TypographyP className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Create professional resumes that stand out. Our AI-powered builder helps you craft the perfect resume for your dream job.
                    </TypographyP>
                    <div className="max-w-4xl mx-auto text-center mb-6">
                        <blockquote className="text-gray-400 italic">
                            &ldquo;Your resume is your first impression. Make it count.&rdquo;
                        </blockquote>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Create Blank Resume */}
                    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                            <Sparkles className="w-12 h-12 text-purple-500 mb-4" />
                            <TypographyH4 className="text-lg font-semibold mb-2 text-center text-white">Exciting Features Coming Soon!</TypographyH4>
                            <p className="text-gray-400 text-center text-sm">Stay tuned for our upcoming features that will revolutionize your resume building experience.</p>
                        </CardContent>
                    </Card>

                    {/* Resume Templates */}
                    <Card className="md:col-span-2 bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0 relative group">
                            <Image
                                src="/allresumes.jpg"
                                alt="Resume Templates"
                                width={800}
                                height={400}
                                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <TypographyH3 className="text-xl font-bold mb-2">Resume Templates</TypographyH3>
                                <p className="text-gray-300 text-sm mb-4">Choose from various professional templates</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resume Builder Interface */}
                    <Card className="md:col-span-2 bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0 relative group">
                            <Image
                                src="/createresume.png"
                                alt="Resume Builder Interface"
                                width={800}
                                height={400}
                                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <TypographyH3 className="text-xl font-bold mb-2">Intuitive Builder</TypographyH3>
                                <p className="text-gray-300 text-sm mb-4">Easy-to-use interface with real-time preview</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar Navigation */}
                    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-0 relative group">
                            <Image
                                src="/sidebar.jpg"
                                alt="Sidebar Navigation"
                                width={400}
                                height={400}
                                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <TypographyH3 className="text-lg font-bold mb-2">Organized Sections</TypographyH3>
                                <p className="text-gray-300 text-xs">Easily navigate through different resume sections</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 mb-12 mt-16">
                    <Card className="p-6 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 transition-transform duration-300 hover:scale-105">
                        <FileText className="w-12 h-12 mb-4 text-purple-500" />
                        <TypographyH3 className="text-xl font-bold mb-2">Smart Templates</TypographyH3>
                        <TypographyP className="text-gray-600 dark:text-gray-400">
                            Choose from professionally designed templates optimized for ATS systems
                        </TypographyP>
                    </Card>
                    <Card className="p-6 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 transition-transform duration-300 hover:scale-105">
                        <Sparkles className="w-12 h-12 mb-4 text-purple-500" />
                        <TypographyH3 className="text-xl font-bold mb-2">AI-Powered</TypographyH3>
                        <TypographyP className="text-gray-600 dark:text-gray-400">
                            Get intelligent suggestions to improve your resume content and formatting
                        </TypographyP>
                    </Card>
                    <Card className="p-6 border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 transition-transform duration-300 hover:scale-105">
                        <Target className="w-12 h-12 mb-4 text-purple-500" />
                        <TypographyH3 className="text-xl font-bold mb-2">Job Targeting</TypographyH3>
                        <TypographyP className="text-gray-600 dark:text-gray-400">
                            Customize your resume for specific job postings with our targeting tools
                        </TypographyP>
                    </Card>
                </div>
            </div>
        </>
    )
}
