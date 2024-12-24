import { initDB } from "../../../lib/indexdb";

export const addExperience = async (data) => {
    const db = await initDB();
    const transaction = db.transaction("experience", "readwrite");
    const store = transaction.objectStore("experience");
    store.add(data);
    return transaction.complete;
};

export const getExperience = async (id) => {
    const db = await initDB();
    const transaction = db.transaction("experience", "readonly");
    const store = transaction.objectStore("experience");
    return store.get(id);
}; 