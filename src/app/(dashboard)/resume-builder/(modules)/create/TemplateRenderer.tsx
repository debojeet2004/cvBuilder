"use client";
import React, { useRef } from 'react';
import useMainStore from "../store/store";
import ResumeTemplet1 from "../preview/resumeTemplet1";
import ResumeTemplet2 from "../preview/resumeTemplet2";
import  {defaultResumeData}  from "./_components/dummyResumeData";
import { savePDF } from '@progress/kendo-react-pdf';
export default function TemplateRenderer() {
    const resumeRef = useRef<HTMLDivElement>(null);

    const personalInfo = useMainStore((state) => state.personalInfo);
    const skillsAndLanguages: {
        skills: { skillName: string; skillLevel: string }[];
        languages: { languageName: string; proficiency: string }[];
    } = useMainStore((state) => state.skillsAndLanguages);
    const educations = useMainStore((state) => state.educations);
    const projects = useMainStore((state) => state.projects);
    const experiences = useMainStore((state) => state.experiences);
    const certificates = useMainStore((state) => state.certificates);
    const selectedTemplate = useMainStore((state) => state.selectedTemplate);

    const final_PersonalInfo = personalInfo && Object.keys(personalInfo).length > 0 ? personalInfo : defaultResumeData.personalInfo;
    const final_SkillsAndLanguages = skillsAndLanguages && skillsAndLanguages.skills.length > 0  ||  skillsAndLanguages.languages.length > 0  ? skillsAndLanguages : defaultResumeData.skillsAndLanguages;
    const final_Educations = educations && educations.length > 0 ? educations : defaultResumeData.educations;
    const final_Projects = projects && projects.length > 0 ? projects : defaultResumeData.projects;
    const final_Experiences = experiences && experiences.length > 0 ? experiences : defaultResumeData.experiences;
    const final_Certificates = certificates && certificates.length > 0 ? certificates : defaultResumeData.certificates;

    const exportPDF = () => {
        if (resumeRef.current) {
            savePDF(resumeRef.current, {
                paperSize: "A4",
                margin: 0,
                scale: 0.75,
                fileName: "resume.pdf",
            });
        }
    };
    useMainStore.setState({ exportPDF });
    return (
        <>
            {selectedTemplate === "Template1" && (
                <ResumeTemplet1
                ref={resumeRef}
                personalInfo={final_PersonalInfo}
                skillsAndLanguages={{
                skills: final_SkillsAndLanguages.skills.map((skill) => ({
                    skillName: skill.skillName,
                    skillLevel: skill.skillLevel,
                })),
                languages: final_SkillsAndLanguages.languages.map((language) => ({
                    languageName: language.languageName,
                    proficiency: language.proficiency,
                })),
                }}
                educations={final_Educations}
                projects={final_Projects}
                experiences={final_Experiences}
                certificates={final_Certificates}
            />
            )}
            {selectedTemplate === "Template2" && <ResumeTemplet2 />}
        </>
        );
}
