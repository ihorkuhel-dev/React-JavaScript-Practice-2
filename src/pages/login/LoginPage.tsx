import { Link } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";
import {LoginForm} from "@/pages/login/ui/LoginForm.tsx";

export function LoginPage() {
    return (
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle>
                        <h1>
                            Welcome back
                        </h1>
                    </CardTitle>
                    <CardDescription>
                        Please, enter to your account to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p>
                        Don't have an account
                        <Link
                            to="/register"
                            className="link-accent"
                        >
                               Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
    );
}