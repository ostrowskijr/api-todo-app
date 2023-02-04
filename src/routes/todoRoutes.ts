import express from 'express';
import validator from '../middleware/validator';
import { getByIdTodo, insertTodo, updateTodo, removeTodo, listAllTodo, doneTodo, undoTodo } from '../controllers/todoController';

const Router = express.Router();

Router.get('/v1/todos/:description?', listAllTodo);
Router.post('/v1/todos', validator, insertTodo);
Router.put('/v1/todos/:id', validator, updateTodo);
Router.delete('/v1/todos/:id', validator, removeTodo);
Router.get('/v1/todos/:id', validator, getByIdTodo);
Router.put('/v1/todos/done/:id', validator, doneTodo);
Router.put('/v1/todos/undo/:id', validator, undoTodo);

export default Router;