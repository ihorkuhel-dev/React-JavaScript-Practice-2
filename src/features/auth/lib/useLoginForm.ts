import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../api/authApi";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const loginSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 symbols" }),
    password: z.string().min(6, { message: "Minimum 6 symbols" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm() {
    const navigate = useNavigate();
    const { mutate: login, isPending, isError, error } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        login(values, {
            onSuccess: () => navigate({ to: "/" }),
        });
    };

    const handleSetData = () => {
        form.setValue("username", "emilys", { shouldValidate: true });
        form.setValue("password", "emilyspass", { shouldValidate: true });
    };

    return {
        form,
        onSubmit,
        handleSetData,
        isPending,
        isError,
        error,
        showPassword,
        setShowPassword
    };
}
