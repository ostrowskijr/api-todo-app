import { Response, Request, NextFunction } from 'express';
import { TodoAttributes } from '../models/todo';
import { insert, update, remove, getById, listAll } from '../repositories/todoRepository';

export const insertTodo = async (req: Request, res: Response, next: NextFunction) => {
    const todo = req.body;
    try {
        await insert(todo)
            .then((resp) => {
                res.status(200).json({
                    status: 'OK',
                    message: 'Todo Cadastrado com sucesso!',
                    data: resp
                })
            })
            .catch((err: any) => {
                res.status(400).json({
                    status: 'ERROR',
                    message: `Erro ao Cadastrar Todo ${err.message}`                    
                })
            })
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const id = (req.params.id) as unknown as number;
    const todo = await getById(id);
    if (!todo) {
        res.status(200).json({
            status: 'OK',
            message: `Todo não encontrado com o ID: ${id} informado.`            
        }) 
    };
    try {
        update(body, id)
        .then((resp) => {
            res.status(200).json({
                status: 'OK',
                message: 'Todo Alterado com sucesso!',
                data: resp
            })
        })
        .catch((err: any) => {
            res.status(400).json({
                status: 'ERROR',
                message: `Erro ao Alterar Todo ${err.message}`                    
            })
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const getByIdTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.params.id) as unknown as number;
    try {
        const todo = await getById(id);
        if (todo) {
            res.status(200)
            .json({
                status: "OK",
                message : "Todo Listado com sucesso!",
                data : todo
            })
        }
        res.status(200).json({
            status: 'OK',
            message: `Todo não encontrado com o ID: ${id} informado.`            
        }) 
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const listAllTodo = async (req: Request, res: Response, next: NextFunction) => {
    const description = req.params.description as string;
    try {
        const todos = await listAll(description);
        if (todos) {
            res.status(200)
                .json({
                    status: "OK",
                    message : "Todos listados com sucesso!",
                    data : todos
                })
        }
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.params.id) as unknown as number;
    const todo = await getById(id);
    if (!todo) {
        res.status(200).json({
            status: 'OK',
            message: `Todo não encontrado com o ID: ${id} informado.`            
        }) 
    };
    try {
        remove(id)
        .then((resp: any) => {
            res.status(200).json({
                status: 'OK',
                message: 'Todo Removido com sucesso!',
                data: []
            })
        })
        .catch((err: any) => {
            res.status(400).json({
                status: 'ERROR',
                message: `Erro ao Remover Todo ${err.message}`                    
            })
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const doneTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.params.id) as unknown as number;
    const todo = await getById(id);
    if (!todo) {
        res.status(200).json({
            status: 'OK',
            message: `Todo não encontrado com o ID: ${id} informado.`            
        }) 
    };
    const body = {
        done: true 
    } as TodoAttributes;
    try {
        update(body, id)
        .then((resp) => {
            res.status(200).json({
                status: 'OK',
                message: 'Todo Finalizado com sucesso!',
                data: resp
            })
        })
        .catch((err: any) => {
            res.status(400).json({
                status: 'ERROR',
                message: `Erro ao Finalizar Todo ${err.message}`                    
            })
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};

export const undoTodo = async (req: Request, res: Response, next: NextFunction) => {
    const id = (req.params.id) as unknown as number;
    const todo = await getById(id);
    if (!todo) {
        res.status(200).json({
            status: 'OK',
            message: `Todo não encontrado com o ID: ${id} informado.`            
        }) 
    };
    const body = {
        done: false 
    } as TodoAttributes;
    try {
        update(body, id)
        .then((resp) => {
            res.status(200).json({
                status: 'OK',
                message: 'Todo Reaberto com sucesso!',
                data: resp
            })
        })
        .catch((err: any) => {
            res.status(400).json({
                status: 'ERROR',
                message: `Erro ao Reabrir Todo ${err.message}`                    
            })
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Internal Server Error',
            message: `Internal Server Error ${error}`
        });
    };
};