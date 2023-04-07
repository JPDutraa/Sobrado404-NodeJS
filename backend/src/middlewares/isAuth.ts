import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken';

interface Payload{
    sub: string;
}

export function isAuth(
    req: Request,
    res: Response,
    next: Function
){
    //Receber token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try{
        //validar token
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

        //recuperar informações do usuário e colocar dentro de um variável user_id dentro do req
        req.user_id = sub;

        return next();

    }catch(err){
        return res.status(401).end();
    }
}