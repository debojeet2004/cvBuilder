"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TypographyH3 } from "@/components/ui/Typography"
import { PlusIcon } from "lucide-react"
import BadgeItem from '../_components/BadgeItem'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'sonner'
import useMainStore from '../../store/store'

const skillSchema = z.object({
    skills: z.array(z.object({
        name: z.string(),
        level: z.string().optional()
    })),
    languages: z.array(z.object({
        name: z.string(),
        proficiency: z.string().optional()
    }))
})

type SkillFormValues = z.infer<typeof skillSchema>

type SkillState = {
    skills: Array<{name: string, level: string}>;
    languages: Array<{name: string, proficiency: string}>;
    isSkillDialogOpen: boolean;
    isLanguageDialogOpen: boolean;
}

type SkillAction = 
    | { type: 'ADD_SKILL'; payload: {name: string, level:string} }
    | { type: 'REMOVE_SKILL'; payload: number }
    | { type: 'ADD_LANGUAGE'; payload: {name: string, proficiency: string} }
    | { type: 'REMOVE_LANGUAGE'; payload: number }
    | { type: 'TOGGLE_SKILL_DIALOG' }
    | { type: 'TOGGLE_LANGUAGE_DIALOG' }
    | { type: 'CLEAR_ALL_SKILLS' }
    | { type: 'CLEAR_ALL_LANGUAGES' };

function Skills() {
    const { setSkillsandLanguages } = useMainStore();
    const [skillState, dispatch] = React.useReducer(
        (state: SkillState, action: SkillAction) => {
            switch (action.type) {
                case 'ADD_SKILL':
                    return {
                        ...state,
                        skills: [...state.skills, action.payload],
                    };
                case 'REMOVE_SKILL':
                    return {
                        ...state,
                        skills: state.skills.filter((_, i) => i !== action.payload),
                    };
                case 'ADD_LANGUAGE':
                    return {
                        ...state,
                        languages: [...state.languages, action.payload],
                    };
                case 'REMOVE_LANGUAGE':
                    return {
                        ...state,
                        languages: state.languages.filter((_, i) => i !== action.payload),
                    };
                case 'TOGGLE_SKILL_DIALOG':
                    return {
                        ...state,
                        isSkillDialogOpen: !state.isSkillDialogOpen,
                    };
                case 'TOGGLE_LANGUAGE_DIALOG':
                    return {
                        ...state,
                        isLanguageDialogOpen: !state.isLanguageDialogOpen,
                    };
                case 'CLEAR_ALL_SKILLS':
                    return {
                        ...state,
                        skills: [],
                    };
                case 'CLEAR_ALL_LANGUAGES':
                    return {
                        ...state,
                        languages: [],
                    };
                default:
                    return state;
            }
        },
        {
            skills: [],
            languages: [],
            isSkillDialogOpen: false,
            isLanguageDialogOpen: false,
        }
    )

    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: {
            skills: [{
                name: '', 
                level: undefined ,
            }],
            languages: [{
                name: '',
                proficiency: undefined,
            }]
        }
    })

    React.useEffect(() => {
        const loadStoreData = () => {
            // Type assertion or optional chaining with type guard
            const currentSkillsAndLanguages = useMainStore.getState().skillsAndLanguages;
            
            console.log("Current Skills and Languages:", currentSkillsAndLanguages);

            // Type-safe check
            if (currentSkillsAndLanguages) {
                // Check and process skills
                if (Array.isArray(currentSkillsAndLanguages.skills)) {
                    currentSkillsAndLanguages.skills.forEach(skill => {
                        dispatch({
                            type: 'ADD_SKILL',
                            payload: {
                                name: skill.skillName,
                                level: skill.skillLevel
                            }
                        });
                    });
                }

                // Check and process languages
                if (Array.isArray(currentSkillsAndLanguages.languages)) {
                    currentSkillsAndLanguages.languages.forEach(language => {
                        dispatch({
                            type: 'ADD_LANGUAGE',
                            payload: {
                                name: language.language,
                                proficiency: language.proficiency
                            }
                        });
                    });
                }
            }
        };
        
        loadStoreData();
    }, []);

    const onSubmit = () => {
        try {
            // Validate that there are skills or languages to save
            if (skillState.skills.length === 0 && skillState.languages.length === 0) {
                toast.error("Please add at least one skill or language");
                return;
            }
    
            // Update Zustand store with skills and languages
            setSkillsandLanguages({
                skills: skillState.skills.map(skill => ({
                    skillName: skill.name,
                    skillLevel: skill.level || 'beginner'
                })),
                languages: skillState.languages.map(language => ({
                    language: language.name,
                    proficiency: language.proficiency || 'basic'
                }))
            });
    
            toast.success("Skills and Languages saved successfully!");
            
            // Log the current state for verification
            console.log('Current Skills and Languages State page.tsx :', 
                useMainStore.getState().skillsAndLanguages
            );
    
        } catch (error) {
            console.error('Error saving skills and languages:', error);
            toast.error("Failed to save skills and languages");
        }
    };
    

    const handleClearForm = () => {
        try {
            // Clear Zustand store with correct structure
            setSkillsandLanguages({
                skills: [],
                languages: []
            });
    
            // Reset form
            form.reset({
                skills: [{
                    name: '', 
                    level: undefined,
                }],
                languages: [{
                    name: '',
                    proficiency: undefined,
                }]
            });
    
            // Clear local state
            dispatch({ type: 'CLEAR_ALL_SKILLS' });
            dispatch({ type: 'CLEAR_ALL_LANGUAGES' });
    
            toast.success("Form cleared successfully!");
        } catch (error) {
            console.error('Error clearing form:', error);
            toast.error("Failed to clear form");
        }
    };
    const handleAddSkill = () => {
        const skillName = form.getValues('skills.0.name')
        const skillLevel = form.getValues('skills.0.level')
        if (skillName && skillLevel) {
            dispatch({ type: 'ADD_SKILL', payload: { name: skillName, level: skillLevel } })
            // will reset the form fields after adding
            form.setValue('skills.0.name', '')
            form.setValue('skills.0.level', '')
        }else {
            toast.error("Please fill in all fields")
        }
    }
    const handleRemoveSkill = (index: number) => {
        dispatch({ type: 'REMOVE_SKILL', payload: index })
    }

    const handleAddLanguage = () => {
        const languageName = form.getValues('languages.0.name')
        const languageProficiency = form.getValues('languages.0.proficiency')
        if (languageName && languageProficiency) {
            dispatch({ type: 'ADD_LANGUAGE', payload: { name: languageName, proficiency: languageProficiency } })
            form.setValue('languages.0.name', '')
            form.setValue('languages.0.proficiency', '')
        } else {
            toast.error("Please fill in all language fields")
        }
    }

    const handleRemoveLanguage = (index: number) => {
        dispatch({ type: 'REMOVE_LANGUAGE', payload: index })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <>
                    <TypographyH3>Skills</TypographyH3>
                    <div className="flex flex-wrap gap-2">
                        {skillState.skills.slice(0, 6).map((skill, index) => (
                            <BadgeItem 
                                key={index}
                                title={skill.name}
                                badge={skill.level}
                                onclick={() => handleRemoveSkill(index)}
                            />
                        ))}
                        {skillState.skills.length > 6 && (
                            <Button
                                variant="link"
                                onClick={() => dispatch({ type: 'TOGGLE_SKILL_DIALOG' })}
                                className="text-primary hover:underline"
                            >
                                Show All ({skillState.skills.length})
                            </Button>
                        )}
                    </div>

                    <Dialog open={skillState.isSkillDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_SKILL_DIALOG' })}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Skills</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto">
                                {skillState.skills.map((skill, index) => (
                                    <BadgeItem 
                                        key={index}
                                        title={skill.name}
                                        badge={skill.level}
                                        onclick={() => handleRemoveSkill(index)}
                                    />
                                ))}
                            </div>
                            {skillState.skills.length > 0 && (
                                <Button
                                type="button"
                                variant="outline"
                                onClick={() => dispatch({ type: 'CLEAR_ALL_SKILLS' })}
                                className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Skills
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="skills.0.name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Skill Name *</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g. React.js" 
                                                {...field} 
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="skills.0.level"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Experience Level *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value || ''}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="beginner">Beginner</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="expert">Expert</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex justify-start items-center gap-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="px-4 w-fit flex items-center justify-center"
                                onClick={handleAddSkill}
                            >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Add Skill
                            </Button>
                        </div>
                    </div>
                </>

                <>
                    <TypographyH3>Languages</TypographyH3>
                    <div className="flex flex-wrap gap-2">
                        {skillState.languages.slice(0, 6).map((language, index) => (
                            <BadgeItem 
                                key={index}
                                title={language.name}
                                badge={language.proficiency}
                                onclick={() => handleRemoveLanguage(index)}
                            />
                        ))}
                        {skillState.languages.length > 6 && (
                            <Button
                                variant="link"
                                onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE_DIALOG' })}
                                className="text-primary hover:underline"
                            >
                                Show All ({skillState.languages.length})
                            </Button>
                        )}
                    </div>

                    <Dialog open={skillState.isLanguageDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_LANGUAGE_DIALOG' })}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Languages</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto">
                                {skillState.languages.map((language, index) => (
                                    <BadgeItem 
                                        key={index}
                                        title={language.name}
                                        badge={language.proficiency}
                                        onclick={() => handleRemoveLanguage(index)}
                                    />
                                ))}
                            </div>
                            {skillState.languages.length > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => dispatch({ type: 'CLEAR_ALL_LANGUAGES' })}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Languages
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={form.control}
                                name="languages.0.name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Language Name *</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g. English" 
                                                {...field} 
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="languages.0.proficiency"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Proficiency Level *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value || ''}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select proficiency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="native">Native</SelectItem>
                                                <SelectItem value="fluent">Fluent</SelectItem>
                                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                                <SelectItem value="basic">Basic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex justify-start items-center gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="px-4 w-fit flex items-center justify-center"
                            onClick={handleAddLanguage}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Language
                        </Button>
                    </div>
                    </div>
                </>

                <div className="w-full flex justify-end items-center gap-4">
                    <Button 
                        type='submit'
                        variant="secondary" 
                        className="px-4 w-fit flex items-center justify-center"
                    >
                        Save Skills
                    </Button>
                    <Button
                        type="button"
                        size="default"
                        variant="destructive"
                        className="min-w-[6rem]"
                        onClick={handleClearForm}                    >
                        Clear Form
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default Skills