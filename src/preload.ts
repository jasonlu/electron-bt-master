// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  getTorrents: async () => await ipcRenderer.invoke("getTorrents"),
  getFiles: async (hash: string) => await ipcRenderer.invoke("getFiles", hash),
});
