import {ID, storage} from "@/appwrite";

export async function uploadImage(file: File) {
    if (!file) return;

    const fileUploaded = await storage.createFile("648b663e15aed9e0fe6c", ID.unique(), file);

    return fileUploaded;
}
