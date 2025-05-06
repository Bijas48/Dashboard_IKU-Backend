import { Request, Response } from 'express';

export const mainHello = (req: Request, res: Response) => {
    res.json({ message: 'Hello, TypeScript + Express!' });
};

export const getHello = (req: Request, res: Response) => {
    res.json({ message: 'Hello from getHello!' });
};