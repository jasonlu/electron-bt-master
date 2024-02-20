/** @jsxImportSource @emotion/react */
import { useEffect, type FunctionComponent } from "react";
import { type TaskItemPropsType } from "./task-item.type";
import { type Interpolation, type Theme } from "@emotion/react";

const taskItemStylee: Interpolation<Theme> = {
  background: "#ccc",
  marginTop: "20px",
  padding: "10px",
  fontSize: "12px",
  ":hover": {
    position: "relative",
    top: "3px",
    left: "3px",
    cursor: "pointer",
    color: "#fff",
  },
  ".torrent-name": {
    marginBottom: "5px",
    paddingBottom: "5px",
    borderBottom: "solid #fff 1px",
  },
};

const TaskItem: FunctionComponent<TaskItemPropsType> = ({ item }) => {
  const { hash, name, state } = item;
  useEffect(() => {
    window.electronAPI
      .getFiles(hash)
      .then((files) => {
        console.log(files);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <li css={taskItemStylee} className={`state-${state}`}>
      <div className="torrent-name">{name}</div>
      <div className="torrent-hash">{hash}</div>
    </li>
  );
};

export default TaskItem;
