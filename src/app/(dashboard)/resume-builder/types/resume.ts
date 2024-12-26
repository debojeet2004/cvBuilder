export interface SocialLink {
    platform: string;
    username: string;
}

export interface PersonalInfo {
    name: string;
    bio: string;
    phone: string;
    location: string;
    email: string;
    website: string;
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
    degree: string;
    typeOfStudy: string;
    description: string;
    startDate: string;
    ongoing: boolean;
    endDate: string;
}

export interface SkillsAndLanguages {
    skills: {
        skillName: string;
        skillLevel:string;
    }[];
    languages: {
        languageName: string;
        proficiency: string;
    }[];
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
    certificateName: string;
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