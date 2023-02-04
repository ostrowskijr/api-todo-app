import { Op } from "sequelize";
import Todo, { TodoAttributes } from "../models/todo";

export const insert = (todo: TodoAttributes) => {
    return Todo.create(todo);
}

export const update = (todo: TodoAttributes, id: number) => {
    return Todo.update(todo, {
        where : {
            id: id
        }
    });
}

export const remove = (id: number) => {
    return Todo.destroy({
        where : {
            id: id
        }
    });
}

export const getById = (id: number) => {
    return Todo.findOne({
        raw : true,        
        where : {
            id : id
        }
    });
}

export const listAll = (description: string | '') => {
    if (description) {
        return Todo.findAll({
            where : { description: { [Op.like] : `%${description}%`}}
        });    
    }
    return Todo.findAll();
}