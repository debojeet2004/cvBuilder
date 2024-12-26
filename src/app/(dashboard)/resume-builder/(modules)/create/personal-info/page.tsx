'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { User, PlusIcon } from "lucide-react"
import { TypographyH3 } from '@/components/ui/Typography'
import BadgeItem from '../_components/BadgeItem'
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import useMainStore from '../../store/store' // Import the Zustand store

export const personalInfoSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    bio: z.string().max(80, { message: "Bio must not exceed 80 characters" }),
    phoneNumber: z.string().max(15, "Phone Number cannot exceed 15 characters"),
    location: z.string().min(2, { message: "Location must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    website: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
    socials: z.array(z.object({
        platform: z.string().optional(),
        username: z.string().optional()
    })).optional().default([]),
    summary: z.string().min(80, { message: "Summary must be at least 80 characters" }).optional().or(z.literal(''))
})

type PersonalInfoValues = z.infer<typeof personalInfoSchema>

type SocialState = {
    socialList: Array<{platform: string, username: string}>;
    isDialogOpen: boolean;
}

type SocialAction = 
    | { type: 'ADD_SOCIAL'; payload: {platform: string, username: string} }
    | { type: 'REMOVE_SOCIAL'; payload: number }
    | { type: 'TOGGLE_DIALOG' }
    | { type: 'CLEAR_ALL_SOCIALS' };

function PersonalInfo() {
    const { setPersonalInfo } = useMainStore();

    const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
        name: "",
        bio: "",
        phoneNumber: "",
        location: "",
        email: "",
        website: "",
        socials: [{ platform: '', username: '' }],
        summary: "",
    },
    })

    const [socialState, dispatch] = React.useReducer(
        (state: SocialState, action: SocialAction) => {
            switch (action.type) {
                case 'ADD_SOCIAL':
                    return {
                        ...state,
                        socialList: [...state.socialList, action.payload],
                    };
                case 'REMOVE_SOCIAL':
                    return {
                        ...state,
                        socialList: state.socialList.filter((_, i) => i !== action.payload),
                    };
                case 'TOGGLE_DIALOG':
                    return {
                        ...state,
                        isDialogOpen: !state.isDialogOpen,
                    };
                case 'CLEAR_ALL_SOCIALS':
                    return {
                        ...state,
                        socialList: [],
                    };
                default:
                    return state;
            }
        },
        {
            socialList: [],
            isDialogOpen: false,
        }
    );

    const handleAddSocial = () => {
        const platform = form.getValues('socials.0.platform');
        const username = form.getValues('socials.0.username');
        if (platform && username) {
            dispatch({ type: 'ADD_SOCIAL', payload: { platform, username } });
            form.setValue('socials.0.platform', '');
            form.setValue('socials.0.username', '');
        } else {
            toast.error("Please fill in all social fields");
        }
    };

    const handleRemoveSocial = (index: number) => {
        dispatch({ type: 'REMOVE_SOCIAL', payload: index });
    };

    React.useEffect(() => {
        const loadStoreData = () => {
            const currentPersonalInfo = useMainStore.getState().personalInfo;
            console.log("Current PersonalInfo:", currentPersonalInfo);
            if (currentPersonalInfo.name) {
                form.reset({
                    name: currentPersonalInfo.name,
                    bio: currentPersonalInfo.bio || '',
                    phoneNumber: currentPersonalInfo.phone,
                    location: currentPersonalInfo.location,
                    email: currentPersonalInfo.email,
                    website: currentPersonalInfo.website || '',
                    summary: currentPersonalInfo.summary || ''
                });

                if (currentPersonalInfo.socialLinks && currentPersonalInfo.socialLinks.length > 0) {
                    currentPersonalInfo.socialLinks.forEach(social => {
                        dispatch({ 
                            type: 'ADD_SOCIAL', 
                            payload: { 
                                platform: social.platform, 
                                username: social.username 
                            } 
                        });
                    });
                }
            }
        };
        loadStoreData();
    }, [form]);

const onSubmit = async (data: PersonalInfoValues) => {
    try {
        // Update Zustand store
        setPersonalInfo({
            name: data.name,
            bio: data.bio,
            phone: data.phoneNumber,
            location: data.location,
            email: data.email,
            website: data.website,
            socialLinks: socialState.socialList.map(social => ({
                platform: social.platform,
                username: social.username
            })),
            summary: data.summary 
        });
        
        toast.success("Personal information updated successfully!");
        console.log('Current Personal Info State page.tsx: ', useMainStore.getState().personalInfo);

    } catch (error) {
        console.error('Error saving personal info:', error);
        toast.error("Failed to save personal information");
    }
}

const handleClearForm = () => {
    try {
        // Clear Zustand store
        setPersonalInfo({
            name: undefined,
            bio: undefined,
            phone: undefined,
            location: undefined,
            email: undefined,
            website: undefined,
            socialLinks: undefined,
            summary: undefined
        });
        
        // Reset form to empty values
        form.reset({
            name: "",
            bio: "",
            phoneNumber: "",
            location: "",
            email: "",
            website: "",
            socials: [{ platform: '', username: '' }],
            summary: "",
        });
        
        // Clear social links
        dispatch({ type: 'CLEAR_ALL_SOCIALS' });
        
        toast.success("Form cleared successfully!");
    } catch (error) {
        console.error('Error clearing form data:', error);
        toast.error("Failed to clear form data");
    }
};

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <div className="space-y-4">
                    {/* Profile section */}
                    <div className=' space-y-4 '>
                        <TypographyH3>Profile Info</TypographyH3>
                        <div className="flex gap-4">
                            <div className="w-[30%] h-[14rem] border-2 border-dashed rounded-lg flex items-center justify-center">
                                <User className="w-16 h-16 text-gray-400" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="bio"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Bio/Headline</FormLabel>
                                            <FormControl>
                                                <Input placeholder="A brief headline about yourself" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact section */}
                    <div className="space-y-4 ">
                        <TypographyH3>Contact Info</TypographyH3>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                defaultCountry="IN"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City, Country" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your@email.com" {...field} />
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
                                        <FormLabel>Website</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://yourwebsite.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    
                    {/* Socials section */}
                    <div className="space-y-4">
                        <TypographyH3>Social Links</TypographyH3>
                        <div className="flex flex-wrap gap-2">
                            {socialState.socialList.slice(0, 6).map((social, index) => (
                                <BadgeItem
                                    key={index}
                                    title={social.platform}
                                    onclick={() => handleRemoveSocial(index)}
                                />
                            ))}
                            {socialState.socialList.length > 6 && (
                                <Button
                                    variant="link"
                                    onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
                                    className="text-primary hover:underline"
                                >
                                    Show All ({socialState.socialList.length})
                                </Button>
                            )}
                        </div>

                        <Dialog open={socialState.isDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_DIALOG' })}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>All Social Links</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-wrap gap-2 max-h-[60vh] overflow-y-auto">
                                    {socialState.socialList.map((social, index) => (
                                        <BadgeItem
                                            key={index}
                                            title={`${social.platform}: ${social.username}`}
                                            onclick={() => handleRemoveSocial(index)}
                                        />
                                    ))}
                                </div>
                                {socialState.socialList.length > 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => dispatch({ type: 'CLEAR_ALL_SOCIALS' })}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Clear All Socials
                                    </Button>
                                )}
                            </DialogContent>
                        </Dialog>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="socials.0.platform"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Platform Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Github, Twitter, LinkedIn" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="socials.0.username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your username" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="flex items-center gap-2"
                                onClick={handleAddSocial}
                            >
                                <PlusIcon className="h-4 w-4" />
                                Add Social Link
                            </Button>
                        </div>
                    </div>

                    {/* Summary section */}
                    <div className="flex flex-col justify-start items-start gap-5 ">
                        <TypographyH3>Summary</TypographyH3>
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    {/* <Label>Professional Summary</Label> */}
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Write a brief summary about your professional background, key skills, and career objectives..."
                                            className="min-h-[12rem] max-h-[18rem] hide-scrollbar"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-end items-center gap-4 py-2">
                    <Button type="submit" variant="secondary" className="px-6 w-fit flex items-center justify-center">
                        Save Personal Info
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

export default PersonalInfo