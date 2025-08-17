/**
 * Import function triggers from their respective submodules:
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import { onCall } from "firebase-functions/v2/https";

setGlobalOptions({ 
    maxInstances: 10, 
    region: 'me-west1'
});

export const getFilesFromGoogleDrive = onCall<void, Promise<{message: string}>>(async () => {
    return { message: "Files from Google Drive is starting" };
})
