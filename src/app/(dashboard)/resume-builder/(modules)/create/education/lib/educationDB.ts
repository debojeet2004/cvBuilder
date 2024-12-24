import { initDB } from "../../../../lib/indexdb";

export interface EducationInput {
    institutionName: string;
    website?: string;
    areaOfStudy: string;
    typeOfStudy: string;
    description?: string;
    startDate?: Date;
    endDate?: Date | null;
    ongoing: boolean;
}

export interface EducationSchema {
    id?: number;
    education: EducationInput[];
    createdAt: number;
    updatedAt: number;
}

export const saveEducation = async (education: EducationInput[]): Promise<number> => {
    const db = await initDB();
    const transaction = db.transaction("education", "readwrite");
    const store = transaction.objectStore("education");

    return new Promise((resolve, reject) => {
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const existingRecord = getAllRequest.result[0];
            
            const educationData = {
                education,
                createdAt: existingRecord?.createdAt || Date.now(),
                updatedAt: Date.now(),
            };

            let request;
            if (existingRecord?.id) {
                request = store.put({ ...educationData, id: existingRecord.id });
            } else {
                request = store.add(educationData);
            }

            request.onsuccess = () => resolve(request.result as number);
            request.onerror = () => reject(request.error);
        };

        getAllRequest.onerror = () => reject(getAllRequest.error);
    });
};

export const getEducation = async (): Promise<EducationSchema | undefined> => {
    const db = await initDB();
    const transaction = db.transaction("education", "readonly");
    const store = transaction.objectStore("education");
    
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result[0]);
        request.onerror = () => reject(request.error);
    });
};

export const clearEducation = async (): Promise<void> => {
    const db = await initDB();
    const transaction = db.transaction("education", "readwrite");
    const store = transaction.objectStore("education");
    
    const request = store.clear();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}; 