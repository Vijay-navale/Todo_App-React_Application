import React, {useState} from 'react';
import { MdDeleteForever,  } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {GoNote} from "react-icons/go";
import uuid from 'react-uuid';

import './App.css';


function App() {
  const [todo, setTodo] = useState('');
  let  [,setState]=useState();
  const [btnText, setBtnText] = useState('Add Todo');

  let todosArray;
  const getArrayFromLS = localStorage.getItem('todosArray');
  
  const inputPlaceholder = () => {
    const input = document.querySelector('.input');
    input.placeholder = (todo === '') ? "Input field can't be empty": "Add Todo";
  };
  
  const handleEvent = (e) => {
    e.preventDefault();
    if(todo === ''){
      inputPlaceholder();
    }else if(getArrayFromLS == null){
      todosArray = [];
      todosArray.push({
        todo,
        id: uuid()
      });
      localStorage.setItem('todosArray', JSON.stringify(todosArray));
      inputPlaceholder();

      setTodo("");
    }else{
      todosArray = JSON.parse(getArrayFromLS);
      todosArray.push({
        todo,
        id: uuid()
      });
      localStorage.setItem('todosArray', JSON.stringify(todosArray));
      inputPlaceholder();
      
      setTodo("");
    };
    buttonSubmit();
  };

  const buttonSubmit = () => {
    const btnSubmit = document.querySelector('.btnSubmit');

    if(btnSubmit.style.backgroundColor === '#45CE30'){
      btnSubmit.style.backgroundColor = '#45CE30';
    }else{
      btnSubmit.style.backgroundColor = '#8B78E6';
    }
  }

  //changing submit button value to Add Todo
  const btnValue = () => {
    setBtnText('Edit Todo' ? 'Add Todo': 'Add Todo');

    buttonSubmit();
  }
/* 
  //creating single function for edit and delete todo is because I want to obey DRY principle. //creating these but it didn't workout.
  
  const editAndDeleteTodoAccordingly = e => {
    const todoId = e.target.closest('li').dataset.id;
    todosArray = JSON.parse(getArrayFromLS);
    todosArray.forEach((userTodo, index) => {
     if(todoId === userTodo.id){

        todosArray.splice(index, 1);
        localStorage.setItem('todosArray', JSON.stringify(todosArray));
        
        if(btnText === 'Edit Todo'){
          setTodo(userTodo.todo);
        }else{
          setState({});
        }

      }
    });
  } */

  //editing particular todo
  const editTodo = e => {
    setBtnText('Edit Todo');
    document.querySelector('.btnSubmit').style.backgroundColor = 'Green';

    const todoId = e.target.closest('li').dataset.id;
    todosArray = JSON.parse(getArrayFromLS);
    todosArray.forEach((userTodo, index) => {
     if(todoId === userTodo.id){

        todosArray.splice(index, 1);
        localStorage.setItem('todosArray', JSON.stringify(todosArray));
        
        setTodo(userTodo.todo);
      }
    });    
  }

  //deleting particular todo
  const deleteTodo = e => {
   
    const todoId = e.target.closest('li').dataset.id;
    todosArray = JSON.parse(getArrayFromLS);

    todosArray.forEach((userTodo, index) => {
     if(todoId === userTodo.id){

      todosArray.splice(index, 1);
      localStorage.setItem('todosArray', JSON.stringify(todosArray));
        
        setState({});
      }
    });    
  };

  // clear all todos from UI and localstorage
  const clearList = () => {
    todosArray = JSON.parse(getArrayFromLS);
    todosArray.splice(0, todosArray.length);
    localStorage.setItem('todosArray', JSON.stringify(todosArray));
    setState({});
  }

  return (
    <div className="container"> 
      <h2>Todo Input</h2>
      <form onSubmit={handleEvent}>
        <span className="span"><GoNote /></span>
        <input 
          type="text" 
          className="input" 
          placeholder="Add Todo"
          value={todo}
          onChange={e => setTodo(e.target.value)}
          />
        <button className="btnSubmit" onClick={btnValue}>{btnText}</button>
      </form>
      <div>
        <h2>Todo List</h2>
        <ul className="ul">
          
          {
            JSON.parse(getArrayFromLS) ? (
              JSON.parse(getArrayFromLS).map(({todo, id}) => (
                <li className="li" key={id} data-id={id}>
                  <span className="text">{todo}</span>
                  <span>
                      <span className="edit" onClick={editTodo}><BiEdit /></span>
                      <span className="delete" onClick={deleteTodo}><MdDeleteForever /></span>
                  </span>
                </li>
              ))
            ) : ('')
          }
        </ul>
        <button className="btn" onClick={clearList}>Clear List</button>
      </div>
    </div>
  );
}

export default App;
