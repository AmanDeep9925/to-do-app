import React, { useState, useEffect } from 'react';
import { Button, Input, FormControl, InputLabel } from '@material-ui/core';
import db from '../../firebase';
import firebase from 'firebase';
import Todo from '../Todo/Todo'
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);

  // need to get todos from the firebsae database as soon as the app loaded
  useEffect(() => {
    // this code fires when the app load
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id : doc.id, todo : doc.data().todo})))
    })
  }, [])

  const [input, setInput] = useState('');

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>
        <span role="img" aria-label="Rocket">🚀</span>
        To Do App
        <span role="img" aria-label="Fire">🔥</span>
      </h1>

      <form action="" className="input-container">
        <FormControl>
          <InputLabel>Write a Todo </InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>
          Add Todo
        </Button>
      </form>
      <Todo todos={todos} />
    </div>
  );
}

export default App;
