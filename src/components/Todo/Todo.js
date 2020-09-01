import React, { useState } from 'react'
import db from '../../firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItemAvatar, ListItem, ListItemText, Modal, Button, Input, InputLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './Todo.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        top: '20%',
        left: '35%',
        width: 350,
        height: 100,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,5,3),
        outline: 'none'
    },
}));

function Todo(props) {

    const { todos } = props;

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const updateTodo = (id) => {
        db.collection('todos').doc(id).set({
            todo: input
        }, { merge: true })
        setOpen(false)
    }

    return (
        <div className ="todo-container">
            {
                todos.map((todo) => (
                    <div >
                        <Modal open={open} onClose={e => setOpen(false)}>
                            <div className={classes.paper}>
                                <h3>Update Todo</h3>
                                <form action="">
                                    <FormControl>
                                    <InputLabel>Update TODO </InputLabel>
                                        <Input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                                    </FormControl>
                                    <Button onClick={() => updateTodo(todo.id)} variant="contained" color="primary">Update Todo</Button>
                                </form>
                            </div>
                        </Modal>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                </ListItemAvatar>
                                <ListItemText primary={todo.todo} />
                                <Button variant="contained" onClick={e => setOpen(true)} color="primary" style={{marginRight:'50px'}}>Edit Me</Button>
                                <Button onClick={event => db.collection('todos').doc(todo.id).delete()} variant="contained" color="secondary" ><DeleteIcon />Delete</Button>
                            </ListItem>
                        </List>
                    </div>
                ))
            }
        </div>
    )
}

export default Todo
