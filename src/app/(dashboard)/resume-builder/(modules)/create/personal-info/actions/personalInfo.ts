'use server'

import { prisma } from '@/lib/prisma'
import { personalInfoSchema } from "../page"
import { z } from 'zod'

export async function savePersonalInfo(data: z.infer<typeof personalInfoSchema>, userId: string) {
    try {
        // First, find or create a resume for this user
        const resume = await prisma.resume.upsert({
            where: { id: userId },
            update: {},
            create: { 
                id: userId,
                userId: userId,
                name: data.name,
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                location: data.location,
                email: data.email,
                website: data.website || '',
                summary: data.summary || ''
            }
        })

        // Delete existing socials for this resume
        await prisma.social.deleteMany({
            where: { resumeId: resume.id }
        })

        // Create new socials if exist
        if (data.socials && data.socials.length > 0) {
            await prisma.social.createMany({
                data: data.socials.map(social => ({
                    resumeId: resume.id,
                    platform: social.platform || '',
                    username: social.username || ''
                }))
            })
        }

        return resume.id
    } catch (error) {
        console.error('Error saving personal info:', error)
        throw new Error('Failed to save personal information')
    }
}