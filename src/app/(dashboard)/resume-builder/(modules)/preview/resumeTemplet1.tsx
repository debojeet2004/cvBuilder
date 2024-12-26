"use client";
// import Image from "next/image";
import React, { forwardRef } from 'react';
import Link from "next/link";
import { TypographyH4 } from "@/components/ui/Typography";

interface ResumeTemplet1Props {
    personalInfo: {
        name: string;
        bio: string;
        phone: string;
        location: string;
        email: string;
        website: string;
        socialLinks: {
            platform: string;
            username: string;
        }[];
        summary: string;
    };
    skillsAndLanguages: {
        skills: {
            skillName: string;
            skillLevel: string;
        }[];
        languages: {
            languageName: string;
            proficiency: string;
        }[];
    };
    educations: {
        institutionName: string;
        website: string;
        degree: string;
        typeOfStudy: string;
        startDate: string;
        endDate?: string;
        ongoing: boolean;
        score?: string;
    }[];
    projects: {
        projectName: string;
        website: string;
        description: string;
        startDate: string;
        endDate: string;
        ongoing: boolean;
        technologies?: string[];
    }[];
    experiences: {
        companyName: string;
        position: string;
        description: string;
        startDate: string;
        endDate: string;
        currentlyWorking: boolean;
    }[];
    certificates: {
        certificateName: string;
        issuedBy: string;
        date: string;
        description: string;
        website: string;
    }[];
}

const formatDate = (date: string | Date) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const d = new Date(date);
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${month} ${year}`;
};

const ResumeTemplet1 = forwardRef<HTMLDivElement, ResumeTemplet1Props>(({
    personalInfo,
    skillsAndLanguages,
    educations,
    projects,
    experiences,
    certificates,
}, ref) => {
    return (
        <div
            ref={ref}
            id="resume2"
            className="max-w-[56rem] min-h-[70rem] mx-auto  bg-white shadow-lg flex"
        >
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
                    <TypographyH4 className="text-lg font-semibold mb-2">
                        CONTACT
                    </TypographyH4>
                    <div className="space-y-2 text-sm">
                        <div className="flex flex-col justify-start items-start text-xs font-thin gap-2">
                            <p>{personalInfo.phone}</p>
                            <p>{personalInfo.email}</p>
                            <p>{personalInfo.location}</p>
                            <p>{personalInfo.website}</p>
                        </div>
                    </div>
                </div>
                {/* Education Section */}
                <div>
                    <TypographyH4 className="text-lg font-semibold mb-1">
                        EDUCATION
                    </TypographyH4>
                    <div className="space-y-4">
                        {educations.map((education, index) => (
                            <div
                                key={index}
                                className="flex flex-col justify-start items-start gap-1"
                            >
                                <p className="text-[0.65rem] text-gray-300">
                                    {/* Start Date - End Date or Ongoing */}
                                    {new Date(education.startDate).getFullYear()} -{" "}
                                    {education.ongoing
                                        ? "Present"
                                        : education.endDate
                                            ? new Date(education.endDate).getFullYear()
                                            : "Present"}
                                </p>
                                <div>
                                    <p className="font-medium text-md">
                                        {/* Institution Name */}
                                        {education.institutionName}
                                    </p>
                                    <div className="text-xs flex flex-wrap">
                                        {/* Degree , field of study*/}
                                        {education.degree}, {education.typeOfStudy}
                                    </div>
                                    <p className="text-[0.7rem]">
                                        Score: 8.7 <span className="text-[0.5rem]">CGPA</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Skills Section */}
                <div className="">
                    <TypographyH4 className="text-lg font-semibold mb-1">
                        SKILLS
                    </TypographyH4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        {skillsAndLanguages.skills.map((skill, index) => (
                            <li key={index}>
                                {skill.skillName}{" "}
                                <span className="italic text-[0.5rem] text-gray-400">
                                    {skill.skillLevel}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Languages Section */}
                <div>
                    <TypographyH4 className="text-lg font-semibold mb-1">
                        LANGUAGES
                    </TypographyH4>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                        {skillsAndLanguages.languages.map((language, index) => (
                            <li key={index}>
                                {language.languageName}{" "}
                                <span className="italic text-[0.6rem] text-gray-400">
                                    ({language.proficiency})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 py-8 px-4">
                {/* Header */}
                <div className="mb-1">
                    <h1 className="text-3xl font-bold text-gray-700 uppercase">
                        {personalInfo.name}
                    </h1>
                    <p className="text-md tracking-normal text-gray-600">
                        {personalInfo.bio}
                    </p>
                </div>

                {/* Social Links Section */}
                <div className="mb-4">
                    <div className="flex gap-1 italic text-gray-600 text-xs">
                        {personalInfo.socialLinks?.map((link, index) => (
                            <Link key={index} href={"#"} target="_blank">
                                {link.platform}- <span className="text-[0.65rem]">@</span>
                                {link.username},
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Profile Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">
                        Summary
                    </h2>
                    <p className="text-gray-600 text-sm text-justify">
                        {personalInfo.summary}
                    </p>
                </div>

                {/* Project Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {" "}
                        {projects.map((project, index) => (
                            <div key={index}>
                                {" "}
                                <div className="flex justify-between items-center">
                                    {" "}
                                    <p className="font-semibold text-gray-600">
                                        {" "}
                                        {project.projectName}{" "}
                                        <span className="italic text-xs text-gray-500 font-thin uppercase">
                                            {" "}
                                            {formatDate(project.startDate)} -{" "}
                                            {project.ongoing
                                                ? "Present"
                                                : formatDate(project.endDate)}{" "}
                                        </span>{" "}
                                    </p>{" "}
                                    <p className="text-xs text-gray-600 italic">
                                        {project.website}
                                    </p>{" "}
                                </div>{" "}
                                <div className="mt-2 mb-2 flex flex-wrap gap-2">
                                    {" "}
                                    {project.technologies?.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-[0.6rem]"
                                        >
                                            {tech}
                                        </span>
                                    ))}{" "}
                                </div>{" "}
                                <p className="text-gray-600 text-xs">
                                    {project.description}
                                </p>{" "}
                            </div>
                        ))}{" "}
                    </div>
                </div>
                {/* Work Experience Section */}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-600 mb-1">
                        WORK EXPERIENCE
                    </h2>
                    <div className="space-y-4">
                        {" "}
                        {experiences.map((experience, index) => (
                            <div key={index}>
                                {" "}
                                <div className="flex justify-between items-center">
                                    {" "}
                                    <p className="font-semibold text-gray-600 text-[1rem]">
                                        {experience.companyName}
                                    </p>{" "}
                                    <p className="text-xs text-gray-600 italic">
                                        {" "}
                                        {experience.currentlyWorking
                                            ? "Currently Working"
                                            : `${formatDate(experience.startDate)} - ${formatDate(
                                                experience.endDate
                                            )}`}{" "}
                                    </p>{" "}
                                </div>{" "}
                                <div className="text-sm text-gray-500 font-medium mb-2">
                                    {" "}
                                    {experience.position}{" "}
                                </div>{" "}
                                <div className="list-disc list-outside pl-4 space-y-1 text-xs text-gray-600">
                                    {" "}
                                    {experience.description
                                        .split("\n")
                                        .map((desc, descIndex) => (
                                            <p key={descIndex} className="pl-2">
                                                {desc}
                                            </p>
                                        ))}{" "}
                                </div>{" "}
                            </div>
                        ))}{" "}
                    </div>
                </div>

                {/* Certification Section */}
                <div>
                    <h2 className="text-xl font-bold text-gray-600 mb-1 uppercase">
                        CERTIFICATIONS
                    </h2>
                    <div className="space-y-4">
                        {certificates.map((certificate, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-gray-600">
                                        {certificate.certificateName}
                                        <span className="italic text-xs text-gray-500 ml-2">
                                            Issued by {certificate.issuedBy}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-600 italic">{new Date(certificate.date).toLocaleString('default', { month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div className="mt-1 mb-2">
                                    <p className="text-xs text-gray-600">
                                        Certificate URL:
                                        <Link
                                            href={certificate.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 ml-1 hover:underline"
                                        >
                                            View Certificate
                                        </Link>
                                    </p>
                                </div>
                                <p className="text-gray-600 text-xs">
                                    {certificate.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
ResumeTemplet1.displayName = 'ResumeTemplet1';
export default ResumeTemplet1;



