import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRegister } from "../api/authApi";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const registerSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 symbols" }),
    password: z.string().min(6, { message: "Minimum 6 symbols" }),
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
                console.log("Registration successful!", data);
                navigate({ to: "/login" });
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
