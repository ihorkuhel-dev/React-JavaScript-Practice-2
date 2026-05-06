import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import {Link} from "@tanstack/react-router";
import {RegisterForm} from "@/pages/register/ui/RegisterForm.tsx";

export function RegisterPage() {
    return (
        <Card className="w-full max-w-md ">
            <CardHeader className="space-y-2 text-center">
                <CardTitle>
                    <h1>
                        Nice to see you
                    </h1>
                </CardTitle>
                <CardDescription>
                    Please, provide your data to register
                </CardDescription>
            </CardHeader>

            <CardContent>
                <RegisterForm />
            </CardContent>

            <CardFooter className="flex justify-center">
                <p>
                    Already have an account?
                    <Link
                        to="/login"
                        className="link-accent"
                    >
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}