type UploadIdle = {
    readonly status: 'idle';
    readonly accept: string | string[];
}

type UploadInProgress = {
    readonly status: 'in-progress';
    readonly progress: number; // 0 to 1    
}

type UploadSuccess = {
    readonly status: 'success';
    readonly fileUrl: string;
}

type UploadError = {
    readonly status: 'error';
    readonly errorMessage: string;
}

export type FileUploadStatus = UploadIdle | UploadInProgress | UploadSuccess | UploadError;
export type FileUploadStatusType = FileUploadStatus['status'];

