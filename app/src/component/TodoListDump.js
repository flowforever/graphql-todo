import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List} from 'antd';
import {TodoListItem} from "./TodoListItem";


export class TodoListDumpPure extends PureComponent {
    render() {
        const {todos, newTodoEditor, onRemoveItem} = this.props;
        const header = (<div> {"Todo List"} </div>);

        return (
            <List
                header={header}
                footer={newTodoEditor}
                bordered
                dataSource={todos}
                renderItem={o => <TodoListItem {...o} onRemoveItem={onRemoveItem} />}
            />
        )
    }
}

export const TodoListDump = React.memo(({todos, newTodoEditor, onRemoveItem}) => {
    const header = (<div> {"Todo List"} </div>);

    return (
        <List
            header={header}
            footer={newTodoEditor}
            bordered
            dataSource={todos}
            renderItem={o => <TodoListItem {...o} onRemoveItem={onRemoveItem}/>}
        />
    )
});

// export const TodoListDump = TodoListDumpFn;

TodoListDump.propTypes =  {
    newTodoEditor: PropTypes.object.isRequired,
};