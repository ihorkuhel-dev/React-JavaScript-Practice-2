import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {useRegister} from "@/features/auth/api/authApi.ts";
import {toast} from "sonner";

const registerSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 symbols" }),
    password: z.string()
        .min(6, { message: "Minimum 6 symbols" })
        .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 symbols" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegisterForm() {
    const navigate = useNavigate();
    const { mutate: register, isPending, isError, error } = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
    });

    const onSubmit = (values: RegisterFormValues) => {
        register({ username: values.username, password: values.password }, {
            onSuccess: (data) => {
                navigate({ to: "/login" });
                toast.success(`Registration successful: ${data.username}`);
            },
        });
    };

    return {
        form,
        onSubmit,
        isPending,
        isError,
        error,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword
    };
}
