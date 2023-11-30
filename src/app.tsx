/** @jsxImportSource @emotion/react */
import { createRoot } from 'react-dom/client';
import TaskList from './components/task-list';
import { useEffect, useState } from 'react';
import { TaskItemType } from './components/task-item.type';

const root = createRoot(document.body);
const mainStyle = {
    color: 'red'
    
}
const App = () => {
    const [items, setItems] = useState<TaskItemType>([]);
    useEffect(() => {
        const result = window.electronAPI.getTorrents().then(res => {
            console.log(res);
            setItems(res);
        });;
        console.log(result);
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