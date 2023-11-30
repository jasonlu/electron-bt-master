import { TaskItemType } from "./components/task-item.type";

interface Window {
    electronAPI: {
        getTorrents: () => Promise<TaskItemType[]>;
    }
}