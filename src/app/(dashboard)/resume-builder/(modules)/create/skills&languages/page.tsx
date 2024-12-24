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

const skillSchema = z.object({
    skills: z.array(z.object({
        name: z.string()
            .min(2, "Skill name must be at least 2 characters")
            .max(50, "Skill name must not exceed 50 characters"),
        level: z.enum(['beginner', 'intermediate', 'expert'], {
            required_error: "Experience level is required",
            invalid_type_error: "Please select a valid skill level"
        })
    })),
    languages: z.array(z.object({
        name: z.string().min(2, { message: "Language name must be at least 2 characters" }),
        proficiency: z.enum(['native', 'fluent', 'intermediate', 'basic'], {
            required_error: "Proficiency level is required",
            invalid_type_error: "Please select a valid proficiency level"
        })
    }))
})

type SkillFormValues = z.infer<typeof skillSchema>

type SkillState = {
    skills: Array<{name: string, level: 'beginner' | 'intermediate' | 'expert' | undefined}>;
    languages: Array<{name: string, proficiency: 'native' | 'fluent' | 'intermediate' | 'basic' | undefined}>;
    isSkillDialogOpen: boolean;
    isLanguageDialogOpen: boolean;
}

type SkillAction = 
    | { type: 'ADD_SKILL'; payload: {name: string, level: 'beginner' | 'intermediate' | 'expert' | undefined} }
    | { type: 'REMOVE_SKILL'; payload: number }
    | { type: 'ADD_LANGUAGE'; payload: {name: string, proficiency: 'native' | 'fluent' | 'intermediate' | 'basic' | undefined} }
    | { type: 'REMOVE_LANGUAGE'; payload: number }
    | { type: 'TOGGLE_SKILL_DIALOG' }
    | { type: 'TOGGLE_LANGUAGE_DIALOG' }
    | { type: 'CLEAR_ALL_SKILLS' }
    | { type: 'CLEAR_ALL_LANGUAGES' };

function Skills() {
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

    const onSubmit = (data: SkillFormValues) => {
        console.log(data)
    }

    const handleAddSkill = () => {
        const skillName = form.getValues('skills.0.name')
        const skillLevel = form.getValues('skills.0.level')
        if (skillName && skillLevel) {
            dispatch({ type: 'ADD_SKILL', payload: { name: skillName, level: skillLevel } })
            // will reset the form fields after adding
            form.setValue('skills.0.name', '')
            form.setValue('skills.0.level', '' as any)
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
            form.setValue('languages.0.proficiency', '' as any)
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
                        type="submit" 
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
                        onClick={() => form.reset()}
                    >
                        Clear Form
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default Skills