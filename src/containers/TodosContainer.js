import React, {Component} from 'react';
import TodoModel from '../models/Todo';
import TodoList from '../components/TodoList'
import CreateTodoForm from '../components/CreateTodoForm'

class TodosContainer extends Component{
	constructor() {
		super();
		this.state = {
			todos:[]
		}
	}

	componentDidMount() {
		this.fetchData()
	}
	fetchData(){
		TodoModel.all().then( (res)=> {
			this.setState ({
				todos: res.todos
			})
		})
	}

	createTodo(newBody){
		let newTodo = {
			body: newBody,
			completed: false
		}
		TodoModel.create(newTodo).then( (res) => {
			console.log('created new todo', res)
			let todos = this.state.todos
			let newTodo= todos.push(res)
			this.setState({newTodo})
		})
	}

	deleteTodo(todo){
		console.log('deleting todo' , todo)
		TodoModel.delete(todo).then( (res) =>{
			let todos = this.state.todos.filter(function(todo){
				return todo._id !== res._id
			});
			this.setState({todos})
		})
	}

	updateTodo(todo){
		console.log('updating todo ', todo)
		TodoModel.update(todo).then( (res) => {
			let todos = this.state.todos.filter(function(todo){
				return todo._id !== res._id
			})
			this.setState({todos})
		})
	}


	render(){
		return (
			<div className='todosContainer'>
				<CreateTodoForm 
				  createTodo={this.createTodo.bind(this)} />
			    <TodoList
			    todos = {this.state.todos} 
			    onDeleteTodo = {this.deleteTodo.bind(this)}
			    onUpdateTodo = {this.updateTodo.bind(this)} />
			</div>	
		)
	}
}

export default TodosContainer