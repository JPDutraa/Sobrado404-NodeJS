import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        // Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });
        // Se não existir, retornar erro
        if(!user){
            throw new Error("Email/Password incorreta");
        }
        
        const passrodMatch = await compare(password, user.password);

        // Se existir, verificar se a senha está correta
        if(!passrodMatch){
            throw new Error("Email/Password incorreta");
        }

        // Gerar Token JWT e Devolver os dados do usuário autenticado
        const token = sign({
            email: user.email,
            name: user.name
        },process.env.JWT_SECRET,
        {
            subject: user.id,
            expiresIn: "30d"
        }
        );
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
        }
    }

export { AuthUserService };