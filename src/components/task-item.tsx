import React, { FunctionComponent } from 'react';
import { TaskItemPropsType, TaskItemType } from './task-item.type';

const TaskItem: FunctionComponent<TaskItemPropsType> = ({item}) => {
    const {hash, name, state} = item;
    return <li className={`state-${state}`}>{name}</li>
};


export default TaskItem