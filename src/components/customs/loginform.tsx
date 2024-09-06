"use client";
import * as z from "zod"

import { CardWrapper } from "@/components/customs/card-wrapper"
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { LoginScehma } from "../../../schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "../../../action/login";
import { useState } from "react";

export const LoginForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginScehma>>({
        resolver: zodResolver(LoginScehma),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginScehma>) => {
       setError("");
       setSuccess("");
       
        startTransition(() => {
            login(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
       <CardWrapper
       headerLabel="Welcome back"
       backButtonLabel="Don't have ac account?"
       backLaabelHref="/auth/register"
       showSocial
       >
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            >
                <div className="space-y-4">
                    <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="man.nie@example.com"
                                    type="email"
                                />
                            </FormControl>
                        </FormItem>
                    )}/>
                     <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                />
                            </FormControl>
                        </FormItem>
                    )}/>
                </div>
                    <FormError message="error"/>
                    <FormSuccess message="success"/>
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full">
                        Login
                    </Button>
            </form>
        </Form>
       </CardWrapper>
      
    )
  }
  
