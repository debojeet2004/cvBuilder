"use client";
import Image from "next/image";
import { savePDF } from '@progress/kendo-react-pdf';
import { Button } from "@/components/ui/button";
import { TypographyH4 } from "@/components/ui/Typography";
import Link from "next/link";


const exportPDF = () => {
    const element = document.getElementById('resume2');
    if (element) {
        savePDF(element, {
            paperSize: 'A4',
            margin: 0,
            scale: 0.75,
            fileName: 'resume.pdf',
            
        });
    }
};

export default function ResumeTemplet2() {
    return (
        <div className=' flex flex-col gap-6 items-center'>
        
        <div className="max-w-4xl mx-auto bg-white shadow-lg flex" id="resume2">
            {/* Left Sidebar */}
            <div className="w-[16rem] flex flex-col justify-start items-start gap-8  bg-[#1B2A41] text-white p-8">
                {/* Profile Image */}
                <div className="w-32 h-32 rounded bg-gray-500">
                    {/* <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    /> */}
                </div>
                {/* Contact Section */}
                <div className="">
                    <TypographyH4 className="text-lg font-semibold mb-2">CONTACT</TypographyH4>
                    <div className="space-y-2 text-sm">
                    <div className="flex flex-col justify-start items-start text-xs font-thin gap-2">
                        <p>+917488355142</p>
                        <p>debojeetkarmakar2020@gmail.com</p>
                        <p>Kolkata, West Bengal</p>
                        <p>www.debojeetkarmakar.com</p>
                    </div>
                    </div>
                </div>
                {/* Education Section */}
                <div className="">
                    <TypographyH4 className="text-lg font-semibold mb-1">EDUCATION</TypographyH4>
                    <div className="space-y-4">
                        <div className="flex flex-col justify-start items-start gap-1">
                            <p className="text-[0.65rem] text-gray-300">
                                {/* Start Date - End Date or Ongoing */}
                                2021 - Present
                            </p>
                            <div>
                                <p className="font-medium text-md">
                                {/* Institution Name */}
                                JIS University
                                </p>
                                <div className="text-xs flex flex-wrap">
                                    {/* Degree , field of study*/}
                                    <p>B-Tech <span> </span> </p>,
                                    <p>Computer Science</p>
                                </div>
                            </div>
                            <p className="text-xs">Score: 8.7CGPA</p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-1">
                            <p className="text-[0.65rem] text-gray-300">
                                {/* Start Date - End Date or Ongoing */}
                                2019 - 2021
                            </p>
                            <div>
                                <p className="font-medium text-md">
                                {/* Institution Name */}
                                Rajkamal Saraswati Vidya Mandir
                                </p>
                                <div className="text-xs flex flex-wrap">
                                    {/* Degree , field of study*/}
                                    <p>12th  <span> </span> </p>,
                                    <p>Physics, Chemistry, Maths</p>
                                </div>
                            </div>
                            <p className="text-xs">Score: 82%</p>
                        </div>
                    </div>
                </div>
                {/* Skills Section */}
                <div className="">
                    <TypographyH4 className="text-lg font-semibold mb-1">SKILLS</TypographyH4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>HTML <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>CSS <span className="italic text-[0.5rem] text-gray-400">Expert</span></li>
                        <li>Tailwind <span className="italic text-[0.5rem] text-gray-400">Expert</span></li>
                        <li>Javascript <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>React js <span className="italic text-[0.5rem] text-gray-400">Expert</span></li>
                        <li>Next js <span className="italic text-[0.5rem] text-gray-400">Expert</span></li>
                        <li>Postgresql <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>Monngo DB <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>Redux Toolkit <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>Data Modeling <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                        <li>Effective Communication <span className="italic text-[0.5rem] text-gray-400">Beginner</span></li>
                        <li>Ui/Ux <span className="italic text-[0.5rem] text-gray-400">Intermediate</span></li>
                    </ul>
                </div>
                {/* Languages Section */}
                <div>
                    <TypographyH4 className="text-lg font-semibold mb-1">LANGUAGES</TypographyH4>
                    <ul className="list-disc list-inside space-y-1 text-xs ">
                        <li>English <span className="italic text-[0.6rem] text-gray-400">(Intermediate)</span></li>
                        <li>Hindi <span className="italic text-[0.6rem] text-gray-400">(Fluent)</span></li>
                        <li>Bengali <span className="italic text-[0.6rem] text-gray-400">(Native)</span></li>
                    </ul>
                </div>
            </div>
    
            {/* Main Content */}
            <div className="flex-1 py-8 px-4">
                {/* Header */}
                <div className="mb-1">
                    <h1 className="text-3xl font-bold text-gray-800 uppercase">Debojeet Karmakar</h1>
                    <p className="text-md tracking-wide text-gray-600 uppercase">Full Stack Developer</p>
                </div>
        
                {/* Social Links Section */}
                <div className="mb-4">
                    <div className="flex gap-1 italic text-gray-600 text-xs">
                    <Link href="https://www.linkedin.com/in/debojeet-karmakar-852820210/" target="_blank" >Linkdine-@debojeet2004</Link>,
                    <Link href="https://www.linkedin.com/in/debojeet-karmakar-852820210/" target="_blank" >Twitter-@debojeet2004</Link>,
                    <Link href="https://www.linkedin.com/in/debojeet-karmakar-852820210/" target="_blank" >Github-@debojeet2004</Link>
                    </div>
                </div>
        
                {/* Profile Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">Summary</h2>
                    <p className="text-gray-600 text-sm text-justify">
                    Pursuing Bachelor&apos;s in Computer Science at JIS University, actively learning full-stack
                    development alongside studies. Focused on frontend development, web design, and intrigued
                    by artificial intelligence. Passionate about innovation and committed to excelling in the tech
                    industry.
                    </p>
                </div>
        
                {/* Project Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">Projects</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-600">Lets Meet <span className="italic text-xs text-gray-500 font-thin uppercase">OCT-2024</span></p>
                                <p className="text-xs text-gray-600 italic"> www.letsmeet.com</p>
                            </div>
                            <div className="mt-2 mb-2 flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Next.js</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">React</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Tailwind CSS</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Node.js</span>
                            </div>
                            <p className="text-gray-600 text-xs">Develop and execute comprehensive marketing strategies and campaigns aligned with company goals and objectives.</p>
                        </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-gray-600">Lets Meet <span className="italic text-xs text-gray-500 font-thin uppercase">OCT-2024</span></p>
                            <p className="text-xs text-gray-600 italic"> www.letsmeet.com</p>
                        </div>
                        <div className="mt-2 mb-2 flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Next.js</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">React</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Tailwind CSS</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]">Node.js</span>
                        </div>
                        <p className="text-gray-600 text-xs">Develop and execute comprehensive marketing strategies and campaigns aligned with company goals and objectives.</p>
                    </div>
                    </div>
                </div>
                {/* Work Experience Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1">WORK EXPERIENCE</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-600">Hyrecruit Ai</p>
                                <p className="text-xs text-gray-600 italic">Currently Working</p>
                            </div>
                            <div className="text-sm text-gray-500 font-medium mb-2">Full stack Developer</div>
                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-600">
                                <li className="pl-2">
                                    Develop and execute comprehensive marketing strategies and campaigns aligned with company goals and objectives.
                                </li>
                                <li className="pl-2">
                                    Lead, manage, and mentor a high-performing marketing team, fostering a collaborative and results-driven work environment.
                                </li>
                                <li className="pl-2">
                                    Monitor brand consistency across marketing channels and materials.
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-600">Training Mug</p>
                                <p className="text-xs text-gray-600 italic">2024</p>
                            </div>
                            <div className="text-sm text-gray-500 font-medium mb-2">Full stack Developer</div>
                            <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-600">
                                <li className="pl-2">
                                    Develop and execute comprehensive marketing strategies and campaigns aligned with company goals and objectives.
                                </li>
                                <li className="pl-2">
                                    Lead, manage, and mentor a high-performing marketing team, fostering a collaborative and results-driven work environment.
                                </li>
                                <li className="pl-2">
                                    Monitor brand consistency across marketing channels and materials.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Certification Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">CERTIFICATIONS</h2>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-600">
                                    Full Stack Web Development Certification
                                    <span className="italic text-xs text-gray-500 ml-2">Issued by Udemy</span>
                                </p>
                                <p className="text-xs text-gray-600 italic">Aug 2023</p>
                            </div>
                            <div className="mt-1 mb-2">
                                <p className="text-xs text-gray-600">
                                    Certificate URL: 
                                    <Link 
                                        href="https://www.udemy.com/certificate/example" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 ml-1 hover:underline"
                                    >
                                        View Certificate
                                    </Link>
                                </p>
                            </div>
                            <p className="text-gray-600 text-xs">
                                Comprehensive certification covering full-stack web development technologies including 
                                React, Node.js, Express, and MongoDB. Completed advanced projects demonstrating 
                                proficiency in modern web development practices.
                            </p>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-gray-600">
                                    React Specialization
                                    <span className="italic text-xs text-gray-500 ml-2">Issued by Coursera</span>
                                </p>
                                <p className="text-xs text-gray-600 italic">Dec 2022</p>
                            </div>
                            <div className="mt-1 mb-2">
                                <p className="text-xs text-gray-600">
                                    Certificate URL: 
                                    <Link 
                                        href="https://www.coursera.org/certificate/example" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-blue-600 ml-1 hover:underline"
                                    >
                                        View Certificate
                                    </Link>
                                </p>
                            </div>
                            <p className="text-gray-600 text-xs">
                                Advanced React certification covering component design, state management, 
                                hooks, and modern React ecosystem best practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button onClick={exportPDF}>Download as PDF</Button>
        </div>
    )
}


