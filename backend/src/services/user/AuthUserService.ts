import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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

        return {ok: true}
        }
    }

export { AuthUserService };