/** @jsxImportSource @emotion/react */
import { type FunctionComponent } from "react";
import TaskItem from "./task-item";
import { type TorrentType } from "../types/torrent-type";
import { type Interpolation, type Theme } from "@emotion/react";

const TaskListStyle: Interpolation<Theme> = {
  listStyleType: "none",
};
type TaskListPropsType = {
  items: TorrentType[];
};
const TaskList: FunctionComponent<TaskListPropsType> = ({ items }) => {
  return (
    <ul css={TaskListStyle}>
      {items.map((item) => {
        return <TaskItem key={item.hash} item={item} />;
      })}
    </ul>
  );
};

export default TaskList;
