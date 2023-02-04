import { Request, Response, NextFunction } from 'express';
import { TodoAttributes } from './../models/todo';

export default function validator(req: Request, res: Response, next: NextFunction) {
    const todo = req.body as TodoAttributes;
    const errors = []; 
    if (req.method === 'POST' && (todo.description === null || todo.description === undefined)) {
        errors.push({
            status: 'REQUIRED',
            param: 'Description',
            message: 'A Descrição da tarefa deve ser informada.'
        })
    }
    if (errors.length > 0) {
        res.status(400).json(errors);
    }
    next();
}