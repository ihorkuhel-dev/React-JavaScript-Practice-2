import { Link } from "@tanstack/react-router";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shared/ui/card";

export function LoginPage() {
    return (
            <Card className="w-full max-w-md rounded-md ">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-3xl font-bold">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-base">
                        Please, enter to your account to continue.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>

                <CardFooter className="flex justify-center ">
                    <div className="text-center text-sm text-secondary-text">
                        Don't have an account{"    "}
                        <Link
                            to="/register"
                            className="text-accent font-medium hover:underline"
                        >
                               Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
    );
}