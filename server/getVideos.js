import { google } from 'googleapis';

let driveClient;

export function setDriveClient(auth) {
  driveClient = google.drive({ version: 'v3', auth });
}

async function getFolderNameById(folderId) {
  try {
    const res = await driveClient.files.get({
      fileId: folderId,
      fields: 'name',
    });
    return res.data.name;
  } catch (error) {
    console.error(`Error fetching folder name for ID ${folderId}:`, error);
    return null;
  }
}

export async function listVideoFiles() {
  if (!driveClient) {
    throw new Error('Drive client is not set.');
  }

  try {
    const res = await driveClient.files.list({
      q: "mimeType contains 'video/'",
      fields: 'files(id, name, mimeType, parents)',
    });

    const files = res.data.files;
    if (!files.length) {
      return [];
    }

    const filesWithFolders = await Promise.all(
      files.map(async (file) => {
        let folderNames = [];
        if (file.parents && file.parents.length) {
          for (const parentId of file.parents) {
            const folderName = await getFolderNameById(parentId);
            if (folderName) {
              folderNames.push(folderName);
            }
          }
        }

        return {
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          folderPath: folderNames.reverse().join('/'),
        };
      })
    );

    return filesWithFolders;
  } catch (err) {
    console.error('Error listing video files:', err);
    throw err;
  }
}
