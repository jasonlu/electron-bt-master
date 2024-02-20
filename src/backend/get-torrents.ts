import axios from "axios";
import { type TorrentType } from "../types/torrent-type";

// Set the parameters
const baseUrl = "http://localhost:8080"; // Set the base URL of the qbittorrent web UI
const username = ""; // Set the username if you have authentication enabled
const password = ""; // Set the password if you have authentication enabled
// const MIN_FILE_SIZE = 1024 * 1024 * 200;

export function normalizeFilename(fileName: string): string {
  const invalidCharsRegex = /[\\/:*?"<>|]/g;
  const cleanFileName = fileName.replace(invalidCharsRegex, "");
  return cleanFileName;
}

export function getFIleExtension(filePath: string): string {
  const extension = filePath.split(".").pop() ?? "";
  return extension;
}

export async function getTorrents(): Promise<TorrentType[]> {
  const response = await axios.get(`${baseUrl}/api/v2/torrents/info`, {
    params: {
      filter: "completed",
    },
    auth: {
      username,
      password,
    },
  });

  const torrents: TorrentType[] = response.data;
  torrents.forEach((torrent) => {
    getFiles(torrent.hash)
      .then((files) => {
        torrent.files = files;
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log('Torrent Name:', torrent.name);
    // console.log('Hash:', torrent.hash);
    // console.log('Size:', torrent.total_size);
    // console.log('State:', torrent.state);
    // console.log('---');
  });
  return torrents;
}

export async function getFiles(hash: string): Promise<string[]> {
  const response = await axios.get(`${baseUrl}/api/v2/torrents/files`, {
    params: {
      hash,
    },
    auth: {
      username,
      password,
    },
  });
  const files = response.data;
  return files;
}

export async function renameFile(
  hash: string,
  oldPath: string,
  newPath: string,
): Promise<string[]> {
  const bodyFormData = new FormData();
  bodyFormData.append("hash", hash);
  bodyFormData.append("oldPath", hash);

  bodyFormData.append("newPath", hash);

  const response = await axios.post(
    `${baseUrl}/api/v2/torrents/renameFile`,
    {
      hash,
      oldPath,
      newPath,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
  const files = response.data;
  return files;
}

export default getTorrents;

// (async function(){
//     // all your code here
//     const torrents = await getTorrents();
//     torrents.forEach(async torrent => {
//         const torrentName = torrent.name;
//         const safeTorrentName = normalizeFilename(torrentName);
//         const files = await getFiles(torrent.hash);
//         const videoFiles = files.filter(file => getFIleExtension(file.name) === 'mp4');
//         const mainVideoFiles = videoFiles.filter(videoFile => videoFile.size > MIN_FILE_SIZE);
//         mainVideoFiles.forEach( async (mainVideoFile, index, arr) => {
//             const numberOfFiles = arr.length;
//             const ext = getFIleExtension(mainVideoFile.name);
//             const newName = numberOfFiles === 1 ? `${safeTorrentName}.${ext}` : `${safeTorrentName}_${index}.${ext}`;
//             const renameResponse = await renameFile(torrent.hash, mainVideoFile.name, newName);
//             console.log(renameResponse);
//         });
//     });
// })();
