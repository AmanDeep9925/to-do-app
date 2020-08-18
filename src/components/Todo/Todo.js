import React from 'react'

import { List, ListItemAvatar, ListItem, ListItemText } from '@material-ui/core';
function Todo(props) {

    const { todos } = props;
    return (
        <div>
            {
                todos.map((todo) => (
                    <List>
                        <ListItem>
                            <ListItemAvatar>

                            </ListItemAvatar>
                            <ListItemText primary={todo} />
                        </ListItem>
                    </List>
                ))
            }
        </div>
    )
}

export default Todo
