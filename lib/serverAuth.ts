import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from '@/lib/prismadb';

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req });

    if (!session?.user?.email){
        throw new Error("Vous n'êtes pas connecté")
    }

    const currentUser = await prismadb.user.findUnique({
        where: {
            email : session.user.email,
        }
    });

    return { currentUser } ;
};
export default serverAuth;