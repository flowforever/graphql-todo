import React from 'react';
import {Icon, List} from 'antd';

export const TodoListItem = React.memo(({text, id, onRemoveItem}) => {

    const actions = [
        <Icon
            onClick={()=> onRemoveItem(id)}
            type="minus-circle"
            theme="twoTone"
            twoToneColor="#eb2f96"
        />
    ];

    return (
        <List.Item actions={actions}>
            <List.Item.Meta
                description={text}
            />
        </List.Item>
    );
});
