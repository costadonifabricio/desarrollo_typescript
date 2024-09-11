import { Request, Response, Router } from "express";

const router = Router();

router.get('/equipment', (req : Request, res: Response) => {
    res.json({
        msg: 'Bienvenido'
    })
});

export default router;
