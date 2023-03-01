import { Request, Response } from 'express';
import BoilerPlateModel from '../models/BoilerPlateModel';
import { BoilerPlateRepository } from '../repositories/base/BoilerPlateRepository';

export async function getTasks(req: Request, res: Response, next: Function) {
    try {
        const categoryId = req.params.categoryId;
        console.log(categoryId);
        const tasks = await BoilerPlateRepository.getInstance().findByCategory(
            categoryId
        );
        res.status(200).send({ tasks: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function addTask(req: Request, res: Response, next: Function) {
    try {
        const categoryId = req.body.categoryId;
        const name = req.body.name;
        if (!name) {
            return res.status(400).send({ message: 'Name could not be empty' });
        }

        await BoilerPlateRepository.getInstance().createTask(
            new BoilerPlateModel(req.body.name, categoryId)
        );
        console.log('Task created ' + req.body.name);
        res.status(200).send({ message: 'New task created' });
    } catch (error) {
        console.log('Could not create task');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function removeTask(req: Request, res: Response, next: Function) {
    try {
        await BoilerPlateRepository.getInstance().removeTask(req.params.taskId);
        console.log('Task deleted ' + req.params.categoryId);
        res.status(200).send({ message: 'Task deleted' });
    } catch (error) {
        console.log('Could not remove Task');
        res.status(500).send({ message: 'Internal server error' });
    }
}

export async function updateTask(req: Request, res: Response, next: Function) {
    try {
        const taskId = req.params.taskId;
        const name = req.body.name;

        if (!taskId || !name) {
            return res.status(400).send({ message: 'Invalid data provided' });
        }

        const task = await BoilerPlateRepository.getInstance().findOne(taskId);
        if (!task) {
            return res.status(404).send({
                message: `Cannot find category with id ${taskId}`,
            });
        }
        task.name = name;

        await BoilerPlateRepository.getInstance().updateTask(taskId, task);

        res.status(200).send({ message: 'Task updated' });
    } catch (error) {
        console.log('Could not remove category');
        res.status(500).send({ message: 'Internal server error' });
    }
}
