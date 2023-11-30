import { TorrentType } from "../types/torrent-type";

export type TaskItemType = {
    title: string;
    id: string;
    status: string;
    files: string[];
}

export type TaskItemPropsType = {
    item: TorrentType;
}