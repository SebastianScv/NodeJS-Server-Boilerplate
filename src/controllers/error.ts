import { Request, Response } from 'express';

export function get404(req: Request, res: Response) {
    res.status(404).send({ message: 'Not found' });
}
