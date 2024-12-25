"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { TypographyH3 } from "@/components/ui/Typography";
import { CustomCard } from "../_components/cardItem";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import useMainStore from "../../store/store";
// Schema definition
const educationSchema = z.object({
    institutionName: z.string(),
    website: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional()
        .or(z.literal("")),
    areaOfStudy: z.string(),
    typeOfStudy: z.string(),
    description: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional().nullable(),
    ongoing: z.boolean().default(false),
});

type EducationFormValues = z.infer<typeof educationSchema>;

type EducationState = {
    educationList: EducationFormValues[];
    isDialogOpen: boolean;
};

type EducationAction =
    | { type: "ADD_EDUCATION"; payload: EducationFormValues }
    | { type: "REMOVE_EDUCATION"; payload: number }
    | { type: "TOGGLE_DIALOG" }
    | { type: "CLEAR_ALL_EDUCATION" };

function Education() {
    const { setEducation } = useMainStore();
    const [educationState, dispatch] = React.useReducer(
        (state: EducationState, action: EducationAction) => {
            switch (action.type) {
                case "ADD_EDUCATION":
                    return {
                        ...state,
                        educationList: [...state.educationList, action.payload],
                    };
                case "REMOVE_EDUCATION":
                    return {
                        ...state,
                        educationList: state.educationList.filter(
                            (_, i) => i !== action.payload
                        ),
                    };
                case "TOGGLE_DIALOG":
                    return {
                        ...state,
                        isDialogOpen: !state.isDialogOpen,
                    };
                case "CLEAR_ALL_EDUCATION":
                    return {
                        ...state,
                        educationList: [],
                    };
                default:
                    return state;
            }
        },
        {
            educationList: [],
            isDialogOpen: false,
        }
    );

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            institutionName: "",
            website: "",
            areaOfStudy: "",
            typeOfStudy: "",
            description: "",
            startDate: undefined,
            endDate: undefined,
            ongoing: false,
        },
    });

    React.useEffect(() => {
        const loadStoreData = () => {
            const currentEducation = useMainStore.getState().educations;
            console.log("Current Education from Store:", currentEducation);
    
            if (currentEducation) {
                if (Array.isArray(currentEducation)) {
                    currentEducation.forEach(edu => {
                        dispatch({
                            type: 'ADD_EDUCATION',
                            payload: {
                                institutionName: edu.institutionName,
                                website: edu.website,
                                areaOfStudy: edu.areaOfStudy,
                                typeOfStudy: edu.typeOfStudy,
                                description: edu.description,
                                startDate: edu.startDate ? new Date(edu.startDate) : undefined,
                                endDate: edu.endDate ? new Date(edu.endDate) : undefined,
                                ongoing: edu.ongoing,
                            }
                        });
                    });
                }
            }
        };
        loadStoreData();
    }, []);
    
    

    const onSubmit = async () => {
        try {
            const formattedEducation = educationState.educationList.map((edu) => ({
                institutionName: edu.institutionName,
                website: edu.website || "",
                areaOfStudy: edu.areaOfStudy,
                typeOfStudy: edu.typeOfStudy,
                description: edu.description || "",
                startDate: edu.startDate ? edu.startDate.toISOString() : "",
                endDate: edu.endDate ? edu.endDate.toISOString() : "",
                ongoing: edu.ongoing,
            }));
            setEducation(formattedEducation);
            toast.success("Education saved successfully!");
        } catch (error) {
            console.error("Error saving education:", error);
            toast.error("Failed to save education");
        }
    };

    const handleClearForm = () => {
        try {
            setEducation([]);
            form.reset({
                institutionName: '',
                website: '',
                areaOfStudy: '',
                typeOfStudy: '',
                description: '',
                startDate: undefined,
                endDate: undefined,
                ongoing: false
            });
            dispatch({ type: 'CLEAR_ALL_EDUCATION' });
            toast.success("Form cleared successfully!");
        } catch (error) {
            console.error('Error clearing form data:', error);
            toast.error("Failed to clear form data");
        }
    }

    const handleAddEducation = () => {
        const values = form.getValues();
        if (values.institutionName && values.areaOfStudy && values.startDate) {
            dispatch({ type: "ADD_EDUCATION", payload: values });
            form.reset();
        } else {
            toast.error("Please fill in all required fields");
        }
    };

    const handleRemoveEducation = (index: number) => {
        dispatch({ type: "REMOVE_EDUCATION", payload: index });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <div className="flex flex-col justify-start items-start gap-5">
                    <TypographyH3>Education</TypographyH3>

                    {/* Display education cards */}
                    <div className="space-y-4 w-full">
                        {educationState.educationList.slice(0, 2).map((edu, index) => (
                            <CustomCard
                                key={index}
                                variant="education"
                                institutionName={edu.institutionName}
                                areaOfStudy={edu.areaOfStudy}
                                startDate={edu.startDate ? format(edu.startDate, "MMM yyyy") : ""}
                                endDate={
                                    edu.ongoing
                                        ? "Present"
                                        : edu.endDate
                                            ? format(edu.endDate, "MMM yyyy")
                                            : undefined
                                }
                                degree={edu.typeOfStudy}
                                description={edu.description}
                                onRemove={() => handleRemoveEducation(index)}
                            />
                        ))}
                        {educationState.educationList.length > 2 && (
                            <div className="w-full flex justify-end items-center gap-4">
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => dispatch({ type: "TOGGLE_DIALOG" })}
                                >
                                    Show All ({educationState.educationList.length})
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Dialog for showing all education entries */}
                    <Dialog
                        open={educationState.isDialogOpen}
                        onOpenChange={() => dispatch({ type: "TOGGLE_DIALOG" })}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Education</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {educationState.educationList.map((edu, index) => (
                                    <CustomCard
                                        key={index}
                                        variant="education"
                                        institutionName={edu.institutionName}
                                        areaOfStudy={edu.areaOfStudy}
                                        startDate={edu.startDate ? format(edu.startDate, "MMM yyyy") : ""}
                                        endDate={
                                            edu.ongoing
                                                ? "Present"
                                                : edu.endDate
                                                    ? format(edu.endDate, "MMM yyyy")
                                                    : undefined
                                        }
                                        degree={edu.typeOfStudy}
                                        description={edu.description}
                                        onRemove={() => handleRemoveEducation(index)}
                                    />
                                ))}                            </div>
                            {educationState.educationList.length > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => dispatch({ type: "CLEAR_ALL_EDUCATION" })}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Education
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="institutionName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Institution Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Institution name" {...field} />
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
                                    <FormLabel>Institution Website</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://institution-website.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="areaOfStudy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area of Study *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Computer Science" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="typeOfStudy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of Study *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Bachelor's Degree" {...field} />
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe your academic achievements, relevant coursework, etc..."
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
                                <FormLabel>Currently studying here</FormLabel>
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex justify-start items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="px-4 w-fit flex items-center justify-center"
                            onClick={handleAddEducation}
                        >
                            <PlusIcon />
                            Add Education
                        </Button>
                    </div>
                </div>
                <div className="w-full flex justify-end items-center gap-4">
                    <Button
                        type="submit"
                        variant="secondary"
                        className="px-4 w-fit flex items-center justify-center"
                    >
                        Save Education
                    </Button>
                    <Button
                        type="button"
                        size="default"
                        variant="destructive"
                        // disabled={isLoading}
                        className="min-w-[6rem]"
                        onClick={handleClearForm}
                    >
                        Clear
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default Education;
