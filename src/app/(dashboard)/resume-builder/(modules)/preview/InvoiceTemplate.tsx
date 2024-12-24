"use client"
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react'
import { savePDF } from '@progress/kendo-react-pdf';
import { Button } from '@/components/ui/button';

const exportPDF = () => {
    const element = document.getElementById('resume');
    if (element) {
        savePDF(element, {
            paperSize: 'A4',
            margin: 5,
            scale: 0.6,
            fileName: 'resume.pdf',
            
        });
    }
};



export default function ResumeTemplate() {
    return (
        <div className=' flex flex-col gap-6 items-center'>
          {/* here this is the resume templet div and this should be a A4 size  and i want to get the preview of this resume templet */}
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg" id="resume"> 
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">John Doe</h1>
                <p className="text-xl text-gray-600">Software Developer</p>
                <div className="mt-2 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    johndoe@example.com
                    
                </div>
                <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    (123) 456-7890
                </div>
                <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    New York, NY
                </div>
                <div className="flex items-center text-gray-600">
                    <Linkedin className="w-4 h-4 mr-2" />
                    linkedin.com/in/johndoe
                </div>
                <div className="flex items-center text-gray-600">
                    <Github className="w-4 h-4 mr-2" />
                    github.com/johndoe
                </div>
                </div>
            </header>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Personal Information</h2>
                <p><strong>Age:</strong> 30</p>
                <p><strong>Gender:</strong> Male</p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Professional Summary</h2>
                <p className="text-gray-700">
                Experienced software developer with a strong background in web technologies and a passion for creating efficient, scalable applications. Skilled in JavaScript, React, and Node.js, with a track record of delivering high-quality projects on time.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Work Experience</h2>
                <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Senior Software Developer</h3>
                <p className="text-gray-600">TechCorp Inc. | 2018 - Present</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Led development of a high-traffic e-commerce platform</li>
                    <li>Implemented CI/CD pipelines, improving deployment efficiency by 40%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                </ul>
                </div>
                <div>
                <h3 className="text-xl font-semibold text-gray-700">Software Developer</h3>
                <p className="text-gray-600">WebSolutions LLC | 2015 - 2018</p>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Developed and maintained multiple client websites</li>
                    <li>Collaborated with design team to implement responsive layouts</li>
                    <li>Optimized database queries, improving site performance by 25%</li>
                </ul>
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Education</h2>
                <div>
                <h3 className="text-xl font-semibold text-gray-700">Bachelor of Science in Computer Science</h3>
                <p className="text-gray-600">University of Technology | Graduated: 2015</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
                <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-2">
                <li>JavaScript (ES6+)</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>HTML5 & CSS3</li>
                <li>Git</li>
                <li>RESTful APIs</li>
                <li>SQL & NoSQL databases</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
                <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-2">
                <li>JavaScript (ES6+)</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>HTML5 & CSS3</li>
                <li>Git</li>
                <li>RESTful APIs</li>
                <li>SQL & NoSQL databases</li>
                </ul>
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
                <ul className="list-disc list-inside text-gray-700 grid grid-cols-2 gap-2">
                <li>JavaScript (ES6+)</li>
                <li>React.js</li>
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>HTML5 & CSS3</li>
                <li>Git</li>
                <li>RESTful APIs</li>
                <li>SQL & NoSQL databases</li>
                </ul>
            </section>
            </div>
            <Button onClick={exportPDF}>Download as PDF</Button>
        </div>
    )
}

