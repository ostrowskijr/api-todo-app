import { DataTypes, Optional, Model } from 'sequelize';
import { database } from '../configs/database';

export interface TodoAttributes {
    id: number,
    description: string,
    done: boolean
};

interface TodoCreatorAttributes extends Optional<TodoAttributes, "id"> {};

interface TodoInstance extends Model<TodoAttributes, TodoCreatorAttributes>,
    TodoAttributes {};

const Todo = database.define<TodoInstance>('tb_todos', {
    //Fields
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    done : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

Todo.sync({force: false})

export default Todo;