"use server";

import * as z from "zod";


import { RegisterScehma } from "../schemas";

export const register = async (values: z.infer<typeof RegisterScehma>) => {
    const validatedFields = RegisterScehma.safeParse(values);

    if (!validatedFields.success){
        return { error: "invalid field!" };
    }
     return { success: "Email sent" };
};