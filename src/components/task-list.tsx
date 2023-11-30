import React, { FunctionComponent } from 'react';
import TaskItem from './task-item';
import { TaskItemType } from './task-item.type';
import { TorrentType } from '../types/torrent-type';

type TaskListPropsType = {
    items: TorrentType[];
}
const TaskList: FunctionComponent<TaskListPropsType> = ({items}) => {
    // const taskItems: TaskItemType[] = [];

    return (
    <ul>
        {items.map(item => {
            return <TaskItem key={item.hash} item={item} />
        })}
    </ul>
    );
};

export default TaskList;