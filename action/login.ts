"use server";

import * as z from "zod";


import { LoginScehma } from "../schemas";

export const login = async (values: z.infer<typeof LoginScehma>) => {
    const validatedFields = LoginScehma.safeParse(values);

    if (!validatedFields.success){
        return { error: "invalid field!" };
    }
     return { success: "Email sent" };
};