"use client";
import * as z from "zod"

import { CardWrapper } from "./card-wrapper"
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { RegisterScehma } from "../../../schemas"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { register } from "../../../action/register";
import { useState } from "react";

export const Registerform = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof RegisterScehma>>({
        resolver: zodResolver(RegisterScehma),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterScehma>) => {
       setError("");
       setSuccess("");
       
        startTransition(() => {
            register(values)
            .then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
       <CardWrapper
       headerLabel="Create an account"
       backButtonLabel="Already have an account?"
       backLaabelHref="/auth/login"
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    disabled={isPending}
                                    placeholder="Man nie"
                                   
                                />
                            </FormControl>
                        </FormItem>
                    )}/>
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
                    className="w-full"
                    >
                        Create an account
                    </Button>
            </form>
        </Form>
       </CardWrapper>
      
    )
  }
  
