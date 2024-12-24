const dbName = "ResumeBuilderDB";
const dbVersion = 1;

interface StoreConfig {
    keyPath: string;
    autoIncrement: boolean;
    indexes?: string[];
}

interface DBStores {
    [key: string]: StoreConfig;
}

const stores: DBStores = {
    resumes: { 
        keyPath: "id", 
        autoIncrement: true 
    },
    personalInfo: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    },
    education: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    },
    experience: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    },
    projects: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    },
    skillsAndLanguages: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    },
    certifications: { 
        keyPath: "id", 
        autoIncrement: true, 
        indexes: ["resumeId"] 
    }
};

export const initDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {

        if (!window.indexedDB) {
            reject(new Error('IndexedDB is not supported in this browser'));
            return;
        }
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
        const db = request.result;
        // const oldVersion = event.oldVersion;
        // const newVersion = event.newVersion || dbVersion;

        Object.entries(stores).forEach(([storeName, storeConfig]) => {
            if (!db.objectStoreNames.contains(storeName)) {
            const store = db.createObjectStore(storeName, {
                keyPath: storeConfig.keyPath,
                autoIncrement: storeConfig.autoIncrement
            });

            if (storeConfig.indexes) {
                storeConfig.indexes.forEach(indexName => {
                store.createIndex(indexName, indexName, { unique: false });
                });
            }
            }
        });
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};