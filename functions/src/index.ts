/**
 * Import function triggers from their respective submodules:
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { defineSecret } from 'firebase-functions/params';
import { setGlobalOptions } from 'firebase-functions/v2';
import { onCall } from 'firebase-functions/v2/https';
import { google } from 'googleapis';
// // this is not stored in github for security reasons,
// // It was created in the Google Cloud Console and downloaded as a JSON file

setGlobalOptions({
  maxInstances: 10,
  region: 'me-west1',
});

const isEmulator = process.env.FUNCTIONS_EMULATOR === 'true';
const envName = isEmulator ? 'local' : 'production';

export const getFilesFromGoogleDrive = onCall<void, Promise<string[]>>(  
  {secrets: ['GOOGLE_DRIVE_CREDENTIALS']},
  async () => {
    const secret64 = defineSecret('GOOGLE_DRIVE_CREDENTIALS');
    const credentialsTxt = Buffer.from(secret64.value(), 'base64').toString('utf-8');
    const credentials = JSON.parse(credentialsTxt);


    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      credentials
    });

    const drive = google.drive({
      version: 'v3',
      auth: auth,
    });
    const folderName = '1hKf4_-Xh8n4Pu78MlN_dmLnYC4NHCdXd';
    const res = await drive.files.list({
      q: `'${folderName}' in parents`,
      fields: 'files(id, name, mimeType)',
    });

    const files = res.data.files;
    const names = files
      ? files.map((file) => file.name || 'NO NAME')
      : ['No files found'];

    return [
      `Environment: ${envName}`,
      `Files in folder "${folderName}":`,
      ...names,
    ];
  }
);
