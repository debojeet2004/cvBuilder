import { initDB } from "../../../../lib/indexdb";

export interface PersonalInfoInput {
    name: string;
    bio: string;
    phoneNumber: string;
    location: string;
    email: string;
    website?: string;
    socials?: Array<{
        platform: string;
        username: string;
    }>;
    summary?: string;
}
export interface PersonalInfoSchema extends PersonalInfoInput {
    id?: number;
    createdAt: number;
    updatedAt: number;
}


export const getFirstPersonalInfo = async (): Promise<PersonalInfoSchema | undefined> => {
    const db = await initDB();
    const transaction = db.transaction("personalInfo", "readonly");
    const store = transaction.objectStore("personalInfo");
    
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
        const records = request.result;
        resolve(records[0]); // Return the first record if it exists
        };
        request.onerror = () => reject(request.error);
    });
};

// Function to save or update personal info
export const savePersonalInfo = async (data: PersonalInfoInput): Promise<number> => {
    const db = await initDB();
    const transaction = db.transaction("personalInfo", "readwrite");
    const store = transaction.objectStore("personalInfo");

    return new Promise((resolve, reject) => {
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
        const existingRecord = getAllRequest.result[0];
        
        const personalInfo: Omit<PersonalInfoSchema, 'id'> = {
            ...data,
            createdAt: existingRecord?.createdAt || Date.now(),
            updatedAt: Date.now(),
        };

        let request;
        if (existingRecord?.id) {
            request = store.put({ ...personalInfo, id: existingRecord.id });
        } else {
            request = store.add(personalInfo);
        }

        request.onsuccess = () => {
            resolve(request.result as number);
        };

        request.onerror = () => {
            reject(request.error);
        };
        };

        getAllRequest.onerror = () => {
        reject(getAllRequest.error);
        };

        transaction.onerror = () => {
        reject(transaction.error);
        };
    });
};

// Optional: Function to clear all personal info
export const clearPersonalInfo = async () => {
    const db = await initDB();
    const transaction = db.transaction("personalInfo", "readwrite");
    const store = transaction.objectStore("personalInfo");
    
    const request = store.clear();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};