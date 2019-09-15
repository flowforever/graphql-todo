import React from 'react';
import {Input} from 'antd';

export const NewTodoDump = React.memo(({newTodo, onUpdate, onAdd}) => {
    return (
        <Input.Search
            value={newTodo}
            placeholder={"Add TODO"}
            enterButton={"Add"}
            onChange={onUpdate}
            onSearch={onAdd}
        />
    );
});