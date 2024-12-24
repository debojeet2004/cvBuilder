'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { MoreVerticalIcon } from "lucide-react"

export default function DialogeButton({onClick}:{onClick?:()=>void}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className='px-0 py-1 h-fit w-fit rounded-md group'>
                    <MoreVerticalIcon size={8} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Resume</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this resume? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-3 mt-4">
                    {/* <Button variant="outline" onClick={() => {}}>Cancel</Button> */}
                    <Button variant="destructive"  onClick={onClick}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}