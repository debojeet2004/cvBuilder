"use client";
import { savePDF } from '@progress/kendo-react-pdf';
import { Button } from "@/components/ui/button";
import { TypographyH4 } from '@/components/ui/Typography';
import Link from 'next/link';


const exportPDF = () => {
    const element = document.getElementById('resume3');
    if (element) {
        savePDF(element, {
            paperSize: 'A4',
            avoidLinks: false,
            margin: 0,
            scale: 0.62,
            fileName: 'resume.pdf',
        });
    }
};

const projects = [
    {
        name: "E-Commerce Platform",
        duration: "2023",
        description: "Developed a full-stack e-commerce platform using Next.js and Node.js",
        technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    },
    {
        name: "AI-Powered Analytics Dashboard",
        duration: "2022",
        description: "Built a real-time analytics dashboard with AI-driven insights",
        technologies: ["React", "Python", "TensorFlow", "AWS"],
    },
    {
        name: "Mobile Payment App",
        duration: "2021",
        description: "Designed and developed a secure mobile payment application",
        technologies: ["React Native", "Firebase", "Redux"],
    },
    {
        name: "Mobile Payment App",
        duration: "2021",
        description: "Designed and developed a secure mobile payment application",
        technologies: ["React Native", "Firebase", "Redux"],
    }
];


export default function ResumeTemplet3() {
    return (
        <div className=' flex flex-col gap-6 items-center'>
        <div className="max-w-4xl mx-auto p-8 bg-white " id='resume3'>
            {/* Header */}
            <header className="text-center mb-4">
            <h1 className="text-3xl font-semibold text-[#8B5CF6] mb-2 uppercase">
                Debojeet Karmakar
            </h1>
            <h3 className='text-gray-500'>Designer | Developer</h3>
            <div className='text-sm'>
                <div className='flex flex-wrap justify-center items-center gap-x-2 gap-y-0 text-gray-600 space-y-1 w-full  '>
                    <p>+917488355142</p>,
                    <p>Kolkata, West Bengal</p>,
                    <p>debojeetkarmakar.com</p>,
                    <p>debojeetkarmakar2020@gmail.com</p>,
                    <p>Github-@debojeet2004</p>,
                    <Link href="https://www.linkedin.com/in/debojeet-karmakar-852820210/" target="_blank" >Linkdine-@debojeet2004</Link>,
                    <p>Twitter-@debojeet2004</p>
                </div>
            </div>
            </header>
    
            {/* Summary Section */}
            <section className="mb-3">
            <TypographyH4 className="text-[#8B5CF6] font-semibold mb-1">SUMMARY</TypographyH4>
            <p className="text-gray-700 text-justify">
                Pursuing Bachelor&apos;s in Computer Science at JIS University, actively learning full-stack
                development alongside studies. Focused on frontend development, web design, and intrigued
                by artificial intelligence. Passionate about innovation and committed to excelling in the tech
                industry.
            </p>
            </section>
    
            {/* Work Experience Section */}
            <section className="mb-3">
            <TypographyH4 className="text-[#8B5CF6] font-semibold mb-3">WORK EXPERIENCE</TypographyH4>
            <div className="space-y-3">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-semibold">Engineering Executive, Borcelle Technologies</h3>
                        <span className="text-gray-600 text-sm italic">Jan 2023 - Present</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Implemented cost-effective solutions, resulting in a 20% reduction in project expenses.</li>
                        <li>Streamlined project workflows, enhancing overall efficiency by 25%.</li>
                        <li>Led a team in successfully delivering multiple engineering projects within the allocated budget.</li>
                    </ul>
                </div>
    
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-semibold">Project Engineer, Selford & Co.</h3>
                        <span className="text-gray-600 text-sm italic">Mar 2021 - Dec 2022</span>
                    </div>
                    <p className=" list-disc list-inside text-gray-700 space-y-1 text-sm">
                        Managed project timelines with strategic efficiency, successfully reducing delivery times by 30%. Spearheaded the adoption of cutting-edge engineering software, which significantly improved process accuracy by 15%. Additionally, collaborated effectively with cross-functional teams, enhancing overall project success rates by 10%.
                    </p>
                </div>
    
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-black font-semibold">Graduate Engineer, Arorewal Industries</h3>
                        <span className="text-gray-600 text-sm italic">Feb 2020 - Jan 2021</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Coordinated project tasks while ensuring adherence to engineering standards and regulations.</li>
                        <li>Conducted comprehensive project analyses, identifying and rectifying discrepancies in engineering designs.</li>
                    </ul>
                </div>
            </div>
            </section>
            {/* Projects Section */}
            {/* if even then col 2 if odd  then col 1 */}
            <section className="mb-3">
                    <TypographyH4 className="text-[#8B5CF6] font-semibold mb-2">PROJECTS</TypographyH4>
                    <div className="grid grid-cols-2 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-black font-semibold">{project.name}</h3>
                                    <span className="text-gray-600 text-sm">{project.duration}</span>
                                </div>
                                <p className="text-gray-700 text-sm mb-2 flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-purple-50 text-purple-600 rounded-md text-xs"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            {/* Education Section */}
            <section className="mb-3">
            <TypographyH4 className="text-[#8B5CF6] font-semibold mb-3">EDUCATION</TypographyH4>
            
            <div className="space-y-4">
                <div>
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="text-black font-semibold">Master of Science in Mechanical Engineering</h3>
                        <p className="text-gray-700 text-sm">University of Engineering and Technology</p>
                    </div>
                    <span className="text-gray-600 text-sm italic">Sep 2019 - Oct 2020</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 text-xs">
                    <li>Specialization in Advanced Manufacturing</li>
                    <li>Research Project: "Optimization of Manufacturing Practices"</li>
                </ul>
                </div>
    
                <div>
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="text-black font-semibold">Bachelor of Science in Civil Engineering</h3>
                        <p className="text-gray-700 text-sm">City College of Engineering</p>
                    </div>
                    <span className="text-gray-600 text-sm italic">Aug 2015 - Aug 2019</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 text-xs">
                    <li>Relevant coursework in Structural Design and Project Management.</li>
                </ul>
                </div>
            </div>
            </section>
    
            {/* Additional Information Section */}
            <section>
            <TypographyH4 className="text-[#8B5CF6] font-semibold mb-3">ADDITIONAL INFORMATION</TypographyH4>
            
            <div className="space-y-2">
                <div>
                <span className="text-black font-semibold">Technical Skills:</span>
                <span className="text-gray-700"> Project Management, Structural Analysis, Robotics and Automation, CAD</span>
                </div>
                <div>
                <span className="text-black font-semibold">Languages:</span>
                <span className="text-gray-700"> English, Malay, German</span>
                </div>
                <div>
                <span className="text-black font-semibold">Certifications:</span>
                <span className="text-gray-700"> Professional Engineer (PE) License, Project Management Professional (PMP)</span>
                </div>
            </div>
            </section>
        </div>
        <Button onClick={exportPDF}>Download as PDF</Button>
            
        </div>
    )
}
