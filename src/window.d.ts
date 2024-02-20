import { type TaskItemType } from "./components/task-item.type";
declare global {
  interface Window {
    electronAPI: {
      getTorrents: () => Promise<TaskItemType[]>;
      getFiles: (hash: string) => Promise<string[]>;
    };
  }
}
