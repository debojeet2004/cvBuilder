import { initDB } from "../../../lib/indexdb";

export const addSkillOrLanguage = async (data) => {
    const db = await initDB();
    const transaction = db.transaction("skillsAndLanguages", "readwrite");
    const store = transaction.objectStore("skillsAndLanguages");
    store.add(data);
    return transaction.oncomplete;
};

export const getSkillOrLanguage = async (id) => {
    const db = await initDB();
    const transaction = db.transaction("skillsAndLanguages", "readonly");
    const store = transaction.objectStore("skillsAndLanguages");
    return store.get(id);
}; 