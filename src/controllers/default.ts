import { Request, Response } from 'express';

export async function getOverview(req: Request, res: Response, next: Function) {
    try {
        res.status(200).send({ message: 'Work' });
    } catch (error) {
        console.log('No Products');
    }
}
