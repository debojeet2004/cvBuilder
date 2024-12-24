import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Folder, X } from "lucide-react";


interface BaseCardProps {
    description?: string;
    onRemove: () => void;
}

interface ExperienceCard extends BaseCardProps {
    variant: 'experience';
    companyName: string;
    position: string;
    startDate?: string;
    endDate?: string;
}

interface EducationCard extends BaseCardProps {
    variant: 'education';
    institutionName: string;
    areaOfStudy: string;
    startDate: string;
    endDate?: string;
    degree?: string;
    fieldOfStudy?: string;
}

interface ProjectCard extends BaseCardProps {
    variant: 'project';
    projectName: string;
    startDate?: string;
    endDate?: string;
    isOngoing?: boolean;
}

interface CertificationCard extends BaseCardProps {
    variant: 'certification';
    certificateName: string;
    issuedBy: string;
    issuedDate?: string;
}
type CardProps = ExperienceCard | EducationCard | ProjectCard | CertificationCard;

// For Icon 
const CARD_ICONS = {
    experience: <Briefcase className="w-8 h-8 text-muted-foreground" />,
    education: <GraduationCap className="w-8 h-8 text-muted-foreground" />,
    project: <Folder className="w-8 h-8 text-muted-foreground" />,
    certification: <Award className="w-8 h-8 text-muted-foreground" />
} as const;

// For Title 
const getTitleField = {
    experience: (props: ExperienceCard) => props.companyName,
    education: (props: EducationCard) => props.institutionName,
    project: (props: ProjectCard) => props.projectName,
    certification: (props: CertificationCard) => props.certificateName
} as const;

// For Subtitle 
const getSubtitleFormat = {
    experience: (props: ExperienceCard) => {
        const date = props.startDate ? `(${props.startDate}${props.endDate ? ` - ${props.endDate}` : ''})` : '';
        return `${props.position} ${date}`;
    },
    education: (props: EducationCard) => {
        const degree = `${props.degree || ''} ${props.fieldOfStudy || props.areaOfStudy}`;
        return `${degree} (${props.startDate} - ${props.endDate || 'Present'})`;
    },
    project: (props: ProjectCard) => {
        return props.isOngoing 
        ? `${props.startDate} - Ongoing`
        : `${props.startDate} - ${props.endDate}`;
    },
    certification: (props: CertificationCard) => {
        const date = props.issuedDate ? ` on ${props.issuedDate}` : '';
        return `Issued by ${props.issuedBy}${date}`;
    }
} as const;

export function CustomCard(props: CardProps) {
    const getIcon = () => CARD_ICONS[props.variant];
    const getTitle = () => getTitleField[props.variant](props as any);
    const getSubtitle = () => getSubtitleFormat[props.variant](props as any);

    return (
        <Card className="flex gap-3 p-3 hover:bg-muted/50 transition cursor-pointer">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-muted rounded-md">
                {getIcon()}
            </div>

            <div className="flex-1">
                <CardHeader className="flex flex-row items-center justify-between p-0 space-y-0">
                    <h3 className="text-base font-semibold">{getTitle()}</h3>
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{getSubtitle()}</p>
                        <Button 
                            type="button"
                            variant="ghost"
                            onClick={(e) => {
                                e.stopPropagation();
                                props.onRemove();
                            }}
                            className="px-3 hover:bg-muted rounded-full"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-1 mt">
                    {props.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">{props.description}</p>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}