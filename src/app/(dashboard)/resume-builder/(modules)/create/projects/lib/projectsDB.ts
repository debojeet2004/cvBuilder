import { initDB } from "../../../lib/indexdb";

export const addProject = async (data) => {
    const db = await initDB();
    const transaction = db.transaction("projects", "readwrite");
    const store = transaction.objectStore("projects");
    store.add(data);
    return transaction.complete;
};

export const getProject = async (id) => {
    const db = await initDB();
    const transaction = db.transaction("projects", "readonly");
    const store = transaction.objectStore("projects");
    return store.get(id);
}; 