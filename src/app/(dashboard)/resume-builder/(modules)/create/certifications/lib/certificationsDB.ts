import { initDB } from "../../../../lib/indexdb";


export interface CertificationInput {
    name?: string;
    issuedBy?: string;
    date?: Date;
    website?: string;
    description?: string;
}

export interface CertificationSchema {
    id?: number;
    certifications: CertificationInput[];
    createdAt: number;
    updatedAt: number;
}

export const saveCertifications = async (certifications: CertificationInput[]): Promise<number> => {
    const db = await initDB();
    const transaction = db.transaction("certifications", "readwrite");
    const store = transaction.objectStore("certifications");

    return new Promise((resolve, reject) => {
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const existingRecord = getAllRequest.result[0];
            
            const certificationData = {
                certifications,
                createdAt: existingRecord?.createdAt || Date.now(),
                updatedAt: Date.now(),
            };

            let request;
            if (existingRecord?.id) {
                request = store.put({ ...certificationData, id: existingRecord.id });
            } else {
                request = store.add(certificationData);
            }

            request.onsuccess = () => resolve(request.result as number);
            request.onerror = () => reject(request.error);
        };

        getAllRequest.onerror = () => reject(getAllRequest.error);
    });
};

export const getCertifications = async (): Promise<CertificationSchema | undefined> => {
    const db = await initDB();
    const transaction = db.transaction("certifications", "readonly");
    const store = transaction.objectStore("certifications");
    
    const request = store.getAll();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result[0]);
        request.onerror = () => reject(request.error);
    });
};

export const clearCertifications = async (): Promise<void> => {
    const db = await initDB();
    const transaction = db.transaction("certifications", "readwrite");
    const store = transaction.objectStore("certifications");
    
    const request = store.clear();
    
    return new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}; 