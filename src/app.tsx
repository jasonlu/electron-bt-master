/** @jsxImportSource @emotion/react */
import { createRoot } from "react-dom/client";
import TaskList from "./components/task-list";
import {
  type FunctionComponent,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { type TaskItemType } from "./components/task-item.type";
import { type Interpolation, type Theme } from "@emotion/react";
import "./index.css";

const root = createRoot(document.body);
const mainStyle: Interpolation<Theme> = {
  fontFamily: "Helvetica, sens-serif",
  color: "red",
  width: "80%",
  margin: "0 auto",
  marginBottom: "50px",
};
const App: FunctionComponent<PropsWithChildren> = () => {
  const [items, setItems] = useState<TaskItemType[]>([]);
  const getTorrentsInfo = useCallback(async () => {
    const result = await window.electronAPI.getTorrents();
    console.log(result);
    setItems(result);
  }, []);
  useEffect(() => {
    void getTorrentsInfo();
  }, []);
  return (
    <div css={mainStyle}>
      <h2>Electron BT master</h2>
      <div>
        <TaskList items={items} />
      </div>
    </div>
  );
};
root.render(<App />);
