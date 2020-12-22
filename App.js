import './App.css';

import { useEffect, useState } from 'react';

import {connect} from  'react-redux';

function App({todos, addTodoInList, removeTodo, fetchTodos, updateTodoInList}){
    
    const[todo, setTodo]=useState('');
    const [todoToedit, setTodoToedit] = useState(undefined)

    useEffect(() => {
        fetchTodos();
    }, [])

    const onAddTodo=()=>{
        addTodoInList({
            id: Math.floor(Math.random()*100),
            value:todo
        });
        setTodo("");

        
    }
    const deleteItem=(item)=>{
        removeTodo(item)
    }

    const onEdit = (item) => {
        setTodo(item.value)
        setTodoToedit(item)
    }

    const updateTodo = () => {
        updateTodoInList({
            ...todoToedit,
            value: todo
        })
        setTodo('')
        setTodoToedit(undefined)
    }

    return(
        <div className="main-content">
            <h1> Add Your Tasks</h1>
            <input type="text" value={todo} onChange={(e) =>setTodo(e.target.value)} placeholder="Type Here..."/>
            {todoToedit ? <button onClick={updateTodo} type="submit">Update</button> : <button onClick={onAddTodo} type="submit">Add</button>}
            <ul>
                {
                    todos.map((item,index)=>{
                        return(
                            <li key={index}>
                                <span onClick={()=> deleteItem(item.id)} className="delete-icon">X</span>
                                <span style={{padding:'0 10px'}}>{item && item.value}</span>
                                <button className="edit-button" onClick={() => onEdit(item)}>Edit</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

const mapStateToProps=(state)=>{
    return{
        todos:state.todos
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        addTodoInList:(value)=>{
            dispatch({
                type:'ADD_TODO',
                payload: value
            })
        },
        removeTodo: (value)=>{
            dispatch({
                type: 'REMOVE_TODO',
                payload:value
            })
        },
        fetchTodos: ()=>{
            dispatch({
                type: 'FETCH_TODOS'
            })
        },
        updateTodoInList: (value) => {
            dispatch({
                type: 'UPDATE_TODO',
                payload: value
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
