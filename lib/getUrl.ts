import {storage} from "@/appwrite";

export async function getUrl(image: Image) {
    const url = storage.getFilePreview(image.bucketId, image.fileId);
    return url;
}
