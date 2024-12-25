'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'sonner'
import { CustomCard } from '../_components/cardItem'
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { TypographyH3 } from '@/components/ui/Typography'
import useMainStore from '../../store/store'

const projectSchema = z.object({
    projectName: z.string().optional(),
    website: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
    description: z.string().optional(),
    startDate: z.date({ required_error: "Start date is required" }).optional(),
    endDate: z.date({ invalid_type_error: "Please select a valid end date" }).optional().nullable(),
    ongoing: z.boolean().default(false),
});


type ProjectFormValues = z.infer<typeof projectSchema>

type ProjectState = {
    projectList: ProjectFormValues[];
    isDialogOpen: boolean;
}
type ProjectAction = 
    | { type: 'ADD_PROJECT'; payload: ProjectFormValues }
    | { type: 'REMOVE_PROJECT'; payload: number }
    | { type: 'TOGGLE_DIALOG' }
    | { type: 'CLEAR_ALL_PROJECTS' };

function Projects() {
    const { setProjects } = useMainStore();
    const [projectState, dispatch] = React.useReducer(
        (state: ProjectState, action: ProjectAction) => {
            switch (action.type) {
                case 'ADD_PROJECT':
                    return {
                        ...state,
                        projectList: [...state.projectList, action.payload],
                    };
                case 'REMOVE_PROJECT':
                    return {
                        ...state,
                        projectList: state.projectList.filter((_, i) => i !== action.payload),
                    };
                case 'TOGGLE_DIALOG':
                    return {
                        ...state,
                        isDialogOpen: !state.isDialogOpen,
                    };
                case 'CLEAR_ALL_PROJECTS':
                    return {
                        ...state,
                        projectList: [],
                    };
                default:
                    return state;
            }
        },
        {
            projectList: [],
            isDialogOpen: false,
        }
    )

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
                projectName: "",
                website: "",
                description: "",
                startDate: undefined,
                endDate: undefined,
                ongoing: false,
        }
    })

    React.useEffect(() => {
        const loadStoreData = () => {
            const currentProjects = useMainStore.getState().projects;
            console.log("Current Projects:", currentProjects);
    
            if (currentProjects) {
                if (Array.isArray(currentProjects)) {
                    currentProjects.forEach(project => {
                        dispatch({
                            type: 'ADD_PROJECT',
                            payload: {
                                projectName: project.projectName,
                                website: project.website,
                                description: project.description,
                                startDate: project.startDate ? new Date(project.startDate) : undefined,
                                endDate: project.endDate ? new Date(project.endDate) : undefined,
                                ongoing: project.ongoing
                            }
                        });
                    });                }
            }
        };
    
        loadStoreData();
    }, []);
    

    const onSubmit = async () => {
        try {
            const formattedProjects = projectState.projectList.map(project => ({
                projectName: project.projectName || '',
                website: project.website || '',
                description: project.description || '',
                startDate: project.startDate ? project.startDate.toISOString() : '',
                endDate: project.endDate ? project.endDate.toISOString() : '',
                ongoing: project.ongoing
            }));
            setProjects(formattedProjects);
            toast.success("Projects saved successfully!");
        } catch (error) {
            console.error('Error saving projects:', error);
            toast.error("Failed to save projects");
        }
    };
    
    const handleClearForm = () => {
        try {
            setProjects([]);
            form.reset({
                projectName: '',
                website: '',
                description: '',
                startDate: undefined,
                endDate: undefined,
                ongoing: false
            });
            dispatch({ type: 'CLEAR_ALL_PROJECTS' });
            
            toast.success("Form cleared successfully!");
        } catch (error) {
            console.error('Error clearing form data:', error);
            toast.error("Failed to clear form data");
        }
    };    

    const handleAddProject = () => {
        const values = form.getValues()
        if (values.projectName && values.startDate) {
            dispatch({ type: 'ADD_PROJECT', payload: values })
            form.reset()
        } else {
            toast.error("Please fill in all required fields")
        }
    }

    const handleRemoveProject = (index: number) => {
        dispatch({ type: 'REMOVE_PROJECT', payload: index })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <div className="flex flex-col justify-start items-start gap-5">
                    <TypographyH3>Projects</TypographyH3>

                    {/* Display project cards */}
                    <div className="space-y-4 w-full">
                        {projectState.projectList.slice(0, 2).map((project, index) => (
                            <CustomCard
                                key={index}
                                variant="project"
                                projectName={project.projectName || ""}
                                startDate={project.startDate ? format(project.startDate, "MMM yyyy") : ""}
                                endDate={project.ongoing ? "Present" : project.endDate ? format(project.endDate, "MMM yyyy") : undefined}
                                isOngoing={project.ongoing}
                                description={project.description}
                                onRemove={() => handleRemoveProject(index)}
                            />
                        ))}
                        {projectState.projectList.length > 2 && (
                            <div className="w-full flex justify-end items-center gap-4">
                                <Button 
                                    type="button"
                                    variant="link"
                                    onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
                                >
                                    Show All ({projectState.projectList.length})
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Dialog for showing all project entries */}
                    <Dialog open={projectState.isDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_DIALOG' })}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Projects</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {projectState.projectList.map((project, index) => (
                                    <CustomCard
                                        key={index}
                                        variant="project"
                                        projectName={project.projectName || ""}
                                        startDate={project.startDate ? format(project.startDate, "MMM yyyy") : ""}
                                        endDate={project.ongoing ? "Present" : project.endDate ? format(project.endDate, "MMM yyyy") : undefined}
                                        isOngoing={project.ongoing}
                                        description={project.description}
                                        onRemove={() => handleRemoveProject(index)}
                                    />
                                ))}
                            </div>
                            {projectState.projectList.length > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => dispatch({ type: 'CLEAR_ALL_PROJECTS' })}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Projects
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-2 gap-4 w-full ">
                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Project name" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://project-url.com" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Description *</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Describe your project, technologies used, and key achievements..."
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
                            name="startDate"
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
                            name="endDate"
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
                                                disabled={form.watch("ongoing")}
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
                        name="ongoing"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>Project is ongoing</FormLabel>
                            </FormItem>
                        )}
                    /> 
                    <div className="w-full flex justify-start gap-4 items-center">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="px-4 w-fit flex items-center justify-center"
                            onClick={handleAddProject}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Project
                        </Button>
                    </div>                   
                </div>
                <div className="w-full flex justify-end gap-4 items-center">
                    <Button type="submit" variant="secondary" className="px-4 w-fit flex items-center justify-center">
                        Save Projects
                    </Button>
                    <Button
                        type="button"
                        size="default"
                        variant="destructive"
                        className="min-w-[6rem]"
                        onClick={handleClearForm}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Form>
    )
}
export default Projects