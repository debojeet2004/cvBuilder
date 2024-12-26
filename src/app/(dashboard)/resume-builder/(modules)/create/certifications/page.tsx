"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TypographyH3 } from '@/components/ui/Typography'
import { CalendarIcon, PlusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CustomCard } from '../_components/cardItem'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from 'sonner'
import useMainStore from '../../store/store'

const certificationsSchema = z.object({
    certificateName: z.string().optional(),
    issuedBy: z.string().optional(),
    date: z.date().optional(),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    description: z.string().optional(),
})

type CertificationsFormValues = z.infer<typeof certificationsSchema>

type CertificationState = {
    certifications: CertificationsFormValues[];
    isDialogOpen: boolean;
}

type CertificationAction = 
    | { type: 'ADD_CERTIFICATION'; payload: CertificationsFormValues }
    | { type: 'REMOVE_CERTIFICATION'; payload: number }
    | { type: 'TOGGLE_DIALOG' }
    | { type: 'CLEAR_ALL_CERTIFICATIONS' };

function Certifications() {
    const { setCertificates } = useMainStore();
    const [certificateState, dispatch] = React.useReducer(
        (state: CertificationState, action: CertificationAction) => {
            switch (action.type) {
                case 'ADD_CERTIFICATION':
                    return {
                        ...state,
                        certifications: [...state.certifications, action.payload],
                    };
                case 'REMOVE_CERTIFICATION':
                    return {
                        ...state,
                        certifications: state.certifications.filter((_, i) => i !== action.payload),
                    };
                case 'TOGGLE_DIALOG':
                    return {
                        ...state,
                        isDialogOpen: !state.isDialogOpen,
                    };
                case 'CLEAR_ALL_CERTIFICATIONS':
                    return {
                        ...state,
                        certifications: [],
                    };
                default:
                    return state;
            }
        },
        {
            certifications: [],
            isDialogOpen: false,
        }
    )

    const form = useForm<CertificationsFormValues>({
        resolver: zodResolver(certificationsSchema),
        defaultValues: {
            certificateName: '',
            issuedBy: '',
            date: undefined,
            website: '',
            description: ''
        }
    })

    React.useEffect(() => {
        const loadStoreData = () => {
            const currentCertificates = useMainStore.getState().certificates;
            console.log("Current Certificates:", currentCertificates);
    
            if (currentCertificates) {
                if (Array.isArray(currentCertificates)) {
                    currentCertificates.forEach(certificate => {
                        dispatch({
                            type: 'ADD_CERTIFICATION',
                            payload: {
                                certificateName: certificate.certificateName,
                                issuedBy: certificate.issuedBy,
                                date: certificate.date ? new Date(certificate.date) : undefined,
                                website: certificate.website,
                                description: certificate.description
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
            const formattedCertificates = certificateState.certifications.map(certificate => ({
                certificateName: certificate.certificateName || '',
                issuedBy: certificate.issuedBy || '',
                date: certificate.date ? certificate.date.toISOString() : '',
                website: certificate.website || '',
                description: certificate.description || ''
            }));
    
            setCertificates(formattedCertificates);
            
            toast.success("Certifications saved successfully!");
        } catch (error) {
            console.error('Error saving certifications:', error);
            toast.error("Failed to save certifications");
        }
    }
    
    

    const handleAddCertification = () => {
        const values = form.getValues()
        if (values.certificateName && values.issuedBy && values.date) {
            dispatch({ type: 'ADD_CERTIFICATION', payload: values })
            form.reset()
        } else {
            toast.error("Please fill in the required fields")
        }
    }

    const handleRemoveCertification = (index: number) => {
        dispatch({ type: 'REMOVE_CERTIFICATION', payload: index })
    }

    const handleClearForm = () => {
        try {
            // Clear Zustand store
            setCertificates([]);
            
            // Reset form to empty values
            form.reset({
                certificateName: '',
                issuedBy: '',
                date: undefined,
                website: '',
                description: ''
            });
            
            // Clear all certifications from state
            dispatch({ type: 'CLEAR_ALL_CERTIFICATIONS' });
            
            toast.success("Form cleared successfully!");
        } catch (error) {
            console.error('Error clearing form data:', error);
            toast.error("Failed to clear form data");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
                <div className="space-y-4">
                    <TypographyH3>Certifications</TypographyH3>
                    <div className="space-y-4">
                        {certificateState.certifications.slice(0, 2).map((cert, index) => (
                            <CustomCard
                                key={index}
                                variant="certification"
                                certificateName={cert.certificateName || ''}
                                issuedBy={cert.issuedBy || ''}
                                issuedDate={cert.date ? format(cert.date, "yyyy-MM") : ''}
                                description={cert.description}
                                onRemove={() => handleRemoveCertification(index)}
                            />
                        ))}
                        {certificateState.certifications.length > 2 && (
                            <div className="w-full flex justify-end items-center gap-4">
                                <Button 
                                    type="button"
                                    variant="link"
                                    onClick={() => dispatch({ type: 'TOGGLE_DIALOG' })}
                                >
                                    Show All ({certificateState.certifications.length})
                                </Button>
                            </div>
                        )}
                    </div>

                    <Dialog open={certificateState.isDialogOpen} onOpenChange={() => dispatch({ type: 'TOGGLE_DIALOG' })}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>All Certifications</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                {certificateState.certifications.map((cert, index) => (
                                    <CustomCard
                                        key={index}
                                        variant="certification"
                                        certificateName={cert.certificateName || ''}
                                        issuedBy={cert.issuedBy || ''}
                                        issuedDate={cert.date ? format(cert.date, "yyyy-MM") : ''}
                                        description={cert.description}
                                        onRemove={() => handleRemoveCertification(index)}
                                    />
                                ))}
                            </div>
                            {certificateState.certifications.length > 0 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => dispatch({ type: 'CLEAR_ALL_CERTIFICATIONS' })}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear All Certifications
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="certificateName"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="mb-2">Certification Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. AWS Solutions Architect" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="issuedBy"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="mb-2">Issued By *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Amazon Web Services" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="mb-2">Issue Date *</FormLabel>
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
                            name="website"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="mb-2">Certificate URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://certificate-url.com" {...field} />
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
                                <FormLabel className="mb-2">Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Describe what you learned and the skills you gained..."
                                        className="min-h-[12rem] max-h-[18rem] hide-scrollbar"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-600 font-inter font-normal text-xs" />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-start items-center gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="px-4 w-fit flex items-center justify-center"
                            onClick={handleAddCertification}
                        >
                            <PlusIcon />
                            Add Certification
                        </Button>   
                    </div>
                </div>

                <div className="w-full flex justify-end items-center gap-4"> 
                    <Button 
                        type="submit" 
                        variant="secondary" 
                        className="px-4 w-fit flex items-center justify-center"
                    >
                        Save Certifications
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
export default Certifications