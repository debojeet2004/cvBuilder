import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
    Certificate, 
    Education, 
    Experience, 
    PersonalInfo, 
    Project, 
    SkillsAndLanguages
} from '../../types/resume';

interface MainStoreState {
    personalInfo: PersonalInfo;
    skillsAndLanguages: SkillsAndLanguages[];
    educations: Education[];
    experiences: Experience[];
    projects: Project[];
    certificates: Certificate[];
    
    setPersonalInfo: (info: Partial<PersonalInfo>) => void;
    setSkillsandLanguages: (skillsAndLanguages: SkillsAndLanguages[]) => void;
    setProjects: (projects: Project[]) => void;
    setEducation: (projects: Education[]) => void;
    setExperience: (projects: Experience[]) => void;
    setCertificates: (certificates: Certificate[]) => void;
}

const useMainStore = create<MainStoreState>()(
    persist(
        (set) => ({
            personalInfo: {
                name: '',
                bio: '',
                email: '',
                phone: '',
                location: '',
                website: '',
                socialLinks: [],
                summary: '',
            },
            skillsAndLanguages: [],
            experiences: [],
            educations: [],
            projects: [],
            certificates: [],
            
            setPersonalInfo: (info: Partial<PersonalInfo>) => {
                set((state) => {
                    const updatedPersonalInfo = { 
                        ...state.personalInfo, 
                        ...info 
                    };
                    return { personalInfo: updatedPersonalInfo };
                });
            },
            setSkillsandLanguages: (skillsAndLanguages: SkillsAndLanguages[]) => {
                set(() => ({
                    skillsAndLanguages: skillsAndLanguages
                }));
            },
            setEducation: (educations: Education[]) => {
                set(() => ({
                    educations: educations
                }));
            },
            setProjects: (projects: Project[]) => {
                set(() => ({
                    projects: projects
                }));
            },
            setCertificates: (certificates: Certificate[]) => {
                set(() => ({
                    certificates: certificates
                }));
            },
            setExperience: (experiences: Experience[]) => {
                set(() => ({
                    experiences: experiences
                }));
            },
        }), { name: 'main-store', })
);
export default useMainStore;
