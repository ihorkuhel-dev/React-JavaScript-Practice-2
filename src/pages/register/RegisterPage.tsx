import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/shared/ui/card.tsx";
import {Link} from "@tanstack/react-router";
import {RegisterForm} from "@/features/auth/ui/RegisterForm.tsx";

export function RegisterPage() {
    return (
        <Card className="w-full max-w-md rounded-md ">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold">
                    Nice to see you
                </CardTitle>
                <CardDescription className="text-base">
                    Please, provide your data to register
                </CardDescription>
            </CardHeader>

            <CardContent>
                <RegisterForm />
            </CardContent>

            <CardFooter className="flex justify-center ">
                <div className="text-center text-sm text-secondary-text">
                    Already have an account?{"    "}
                    <Link
                        to="/login"
                        className="text-accent font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}