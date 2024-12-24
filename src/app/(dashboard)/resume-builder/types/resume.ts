export interface SocialLink {
    platform: string;
    username: string;
}

export interface PersonalInfo {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    address: string;
    socialLinks: SocialLink[];
    summary: string;
}

export interface Experience {
    companyName: string;
    position: string;
    description: string;
    startDate: string;
    currentlyWorking: boolean;
    endDate: string;
}

export interface Education {
    institutionName: string;
    website: string;
    areaOfStudy: string;
    typeOfStudy: string;
    description: string;
    startDate: string;
    ongoing: boolean;
    endDate: string;
}

export interface Skill {
    skillName: string;
    skillLevel: 'beginner' | 'intermediate' | 'expert';
}

export interface Language {
    language: string;
    proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
}

export interface SkillsAndLanguages {
    skills: Skill[];
    languages: Language[];
}

export interface Project {
    projectName: string;
    website: string;
    description: string;
    startDate: string;
    endDate: string;
    ongoing: boolean;
}

export interface Certificate {
    name: string;
    issuedBy: string;
    date: string;
    website: string;
    description: string;
}

export interface Resume {
    id: string;
    filename: string;
    visibility: 'public' | 'private';
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    skillsAndLanguages: SkillsAndLanguages;
    projects: Project[];
    certificates: Certificate[];
}