"use client"

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'sonner'

// UI Components imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { TypographyH3 } from '@/components/ui/Typography'
import { CustomCard } from '../_components/cardItem'

// Schema definition
const experienceSchema = z.object({
    experience: z.array(z.object({
        company: z.string().min(1, "Company name is required"),
        position: z.string().min(1, "Position is required"),
        description: z.string().min(1, "Description is required"),
        startDate: z.date({ required_error: "Start date is required" }),
        endDate: z.date({ invalid_type_error: "Please select a valid end date" }).optional().nullable(),
        currentlyWorking: z.boolean().default(false),
    }))
})

type ExperienceFormValues = z.infer<typeof experienceSchema>

type ExperienceState = {
    experienceList: ExperienceFormValues['experience'];
    isDialogOpen: boolean;
}

type ExperienceAction = 
    | { type: 'ADD_EXPERIENCE'; payload: ExperienceFormValues['experience'][0] }
    | { type: 'REMOVE_EXPERIENCE'; payload: number }
    | { type: 'TOGGLE_DIALOG' }
    | { type: 'CLEAR_ALL_EXPERIENCE' };

function Experience() {
    const [experienceState, dispatch] = React.useReducer(
        (state: ExperienceState, action: ExperienceAction) => {
            switch (action.type) {
                case 'ADD_EXPERIENCE':
                    return {
                        ...state,
                        experienceList: [...state.experienceList, action.payload],
                    };
                case 'REMOVE_EXPERIENCE':
                    return {
                        ...state,
                        experienceList: state.experienceList.filter((_, i) => i !== action.payload),
                    };
                case 'TOGGLE_DIALOG':
                    return {
                        ...state,
                        isDialogOpen: !state.isDialogOpen,
                    };
                case 'CLEAR_ALL_EXPERIENCE':
                    return {
                        ...state,
                        experienceList: [],
                    };
                default:
                    return state;
            }
        },
        {
            experienceList: [],
            isDialogOpen: false,
        }
    )

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            experience: [{
                company: "",
                position: "",
                description: "",
                startDate: undefined,
                endDate: undefined,
                currentlyWorking: false,
            }]
        }
    })

    function onSubmit(data: ExperienceFormValues) {
        console.log(data)
        // Handle form submission
    }

    const handleAddExperience = () => {
        const values = form.getValues().experience[0]
        if (values.company && values.position && values.startDate) {
            dispatch({ type: 'ADD_EXPERIENCE', payload: values })
            form.reset()
        } else {
            toast.error("Please fill in all required fields")
        }
    }

    const handleRemoveExperience = (index: number) => {
        dispatch({ type: 'REMOVE_EXPERIENCE', payload: index })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">   
                <div className="flex flex-col justify-start items-start gap-5">
                    <TypographyH3>Experience</TypographyH3>

                    {/* Display experience cards */}
                    <div className="space-y-4 w-full">
                        {experienceState.experienceList.slice(0, 2).map((exp, index) => (
                            <CustomCard
                                key={index}
                                variant="experience"
                                companyName={exp.company}
                                position={exp.position}
                                startDate={format(exp.startDate, "MMM yyyy")}
                                endDate={exp.currentlyWorking ? "Present" : exp.endDate ? format(exp.endDate, "MMM yyyy") : undefined}
                                description={exp.description}
                                onRemove={() => handleRemoveExperience(index)}
                            />
                        ))}
                        {experienceState.experienceList.length > 2 && (
                            <div className="w-full flex justify-end items-center gap-4">
                                <Button 
                                    type="button"
                                    variant="link"
                                    onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
                                >
                                    Show All ({experienceState.experienceList.length})
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Dialog for showing all experience entries */}
                    <Dialog open={experienceState.isDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_DIALOG' })}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Experience</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {experienceState.experienceList.map((exp, index) => (
                                    <CustomCard
                                        key={index}
                                        variant="experience"
                                        companyName={exp.company}
                                        position={exp.position}
                                        startDate={format(exp.startDate, "MMM yyyy")}
                                        endDate={exp.currentlyWorking ? "Present" : exp.endDate ? format(exp.endDate, "MMM yyyy") : undefined}
                                        description={exp.description}
                                        onRemove={() => handleRemoveExperience(index)}
                                    />
                                ))}
                            </div>
                            {experienceState.experienceList.length > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => dispatch({ type: 'CLEAR_ALL_EXPERIENCE' })}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Experience
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="experience.0.company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="experience.0.position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Job title" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="experience.0.description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Describe your role, responsibilities, and achievements..."
                                        className="min-h-[12rem] max-h-[18rem] hide-scrollbar"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="experience.0.startDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Start Date *</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value || undefined}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="experience.0.endDate"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>End Date *</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                disabled={form.watch("experience.0.currentlyWorking")}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value || undefined}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                            </FormItem>
                        )}
                    />
                    </div>

                
                    <FormField
                        control={form.control}
                        name="experience.0.currentlyWorking"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-end space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Currently working here</FormLabel>
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-start items-center gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="px-4 w-fit flex items-center justify-center"
                            onClick={handleAddExperience}
                        >
                            <PlusIcon />
                            Add Experience
                        </Button>
                    </div>
                </div> 
                

                
                <div className="w-full flex justify-end items-center gap-4">
                    <Button type="submit" variant="secondary" className="px-4 w-fit flex items-center justify-center">
                        Save Experience
                    </Button> 
                    <Button
                        type="button"
                        size="default"
                        variant="destructive"
                        // disabled={isLoading}
                        className="min-w-[6rem]"
                        onClick={() => form.reset()}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default Experience   