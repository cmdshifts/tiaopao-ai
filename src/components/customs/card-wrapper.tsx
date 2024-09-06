"use client";

import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from "../ui/card";
import { BackButton } from "./back-button";
 import { HeaderLogin } from "./headerlogin";
import { Social } from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backLaabelHref: string;
    showSocial?: boolean;

};

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backLaabelHref,
    showSocial

}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <HeaderLogin label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backLaabelHref}
                />
            </CardFooter>
        </Card>
    );
};