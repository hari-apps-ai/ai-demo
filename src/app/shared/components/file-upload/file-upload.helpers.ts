import { FileUploadStatus } from "./file-upload.model";

export function acceptedFileTypes(status: FileUploadStatus): string {
    if (status.status !== 'idle') {
        return '';
    }

    if (typeof(status.accept) === 'string') {
        return status.accept;
    }

    if (Array.isArray(status.accept)) {
        return status.accept.join(',');
    }
    return '';
}