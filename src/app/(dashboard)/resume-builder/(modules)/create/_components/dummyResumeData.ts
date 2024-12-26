export const defaultResumeData = {
    personalInfo: {
        name: "Jane Doe",
        bio: "Passionate full stack developer with a knack for creating seamless user experiences.",
        phone: "+1234567890",
        location: "San Francisco, CA",
        email: "janedoe@example.com",
        website: "www.janedoe.com",
        socialLinks: [
            { platform: "LinkedIn", username: "janedoe32" },
            { platform: "Twitter", username: "janedoe24" },
            { platform: "GitHub", username: "janedoe53" },
        ],
        summary:
            "Dedicated and efficient full stack developer with 5+ years of experience in web development. Skilled in modern web technologies and passionate about learning new things. Adept at problem-solving and committed to delivering high-quality solutions. Proven track record of working in agile environments and collaborating with cross-functional teams.",
    },
    skillsAndLanguages: {
        skills: [
            { skillName: "HTML", skillLevel: "Expert" },
            { skillName: "CSS", skillLevel: "Expert" },
            { skillName: "JavaScript", skillLevel: "Expert" },
            { skillName: "React", skillLevel: "Expert" },
            { skillName: "Node.js", skillLevel: "Intermediate" },
            { skillName: "MongoDB", skillLevel: "Intermediate" },
        ],
        languages: [
            { languageName: "English", proficiency: "Fluent" },
            { languageName: "Spanish", proficiency: "Intermediate" },
        ],
    },
    educations: [
        {
            institutionName: "Stanford University",
            website: "https://www.stanford.edu",
            degree: "Bachelor of Science",
            typeOfStudy: "Computer Science",
            startDate: "2015-09-01",
            endDate: "2019-06-15",
            ongoing: false,
        },
        {
            institutionName: "Online Certification",
            website: "https://www.coursera.org",
            degree: "Full Stack Web Development",
            typeOfStudy: "Web Development",
            startDate: "2020-01-01",
            ongoing: true,
        },
    ],
    projects: [
        {
            projectName: "Personal Portfolio",
            website: "https://www.janedoe.com/portfolio",
            description:
                "Developed a personal portfolio to showcase my projects and skills. The portfolio includes detailed descriptions of each project, the technologies used, and the challenges faced during development. Implemented responsive design and optimized for performance.",
            startDate: "2021-01-01",
            endDate: "2021-03-01",
            ongoing: false,
            technologies: ["React", "Next.js", "Tailwind CSS", "Vercel", "TypeScript"],
        },
        {
            projectName: "E-commerce Platform",
            website: "https://www.shoponline.com",
            description:
                "Built a full-fledged e-commerce platform with user authentication and product management. The platform supports various payment methods, real-time inventory tracking, and a user-friendly interface. Integrated third-party APIs for enhanced functionality.",
            startDate: "2022-05-01",
            endDate: "2022-08-01",
            ongoing: false,
            technologies: ["Node.js", "Express", "MongoDB", "Stripe", "React", "Redux"],
        },
    ],
    experiences: [
        {
            companyName: "Tech Solutions Inc.",
            position: "Full Stack Developer",
            description:
                "Led the development of web applications and collaborated with cross-functional teams to deliver high-quality products. Implemented best practices for code quality and performance optimization. Responsible for designing and implementing scalable and efficient solutions to complex problems.",
            startDate: "2020-07-01",
            endDate: "2023-05-01",
            currentlyWorking: false,
        },
        {
            companyName: "Innovatech",
            position: "Frontend Developer",
            description:
                "Implemented responsive UI components and ensured seamless user experience. Worked closely with designers to translate design mockups into functional and visually appealing web pages. Optimized the front-end codebase for performance and maintainability.",
            startDate: "2019-01-01",
            endDate: "2020-06-01",
            currentlyWorking: false,
        },
    ],
    certificates: [
        {
            certificateName: "Certified Full Stack Developer",
            issuedBy: "Coursera",
            date: "2020-06-01",
            description:
                "Certification in full stack web development covering various modern technologies. The course included hands-on projects and real-world scenarios to build practical skills.",
            website: "https://www.coursera.org/certificate/example",
        },
        {
            certificateName: "Advanced React",
            issuedBy: "Udemy",
            date: "2021-12-01",
            description:
                "Comprehensive course on advanced React concepts and best practices. Topics covered include state management, performance optimization, and building scalable applications.",
            website: "https://www.udemy.com/certificate/example",
        },
    ],
};