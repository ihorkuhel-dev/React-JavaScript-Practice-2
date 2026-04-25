import { Controller } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";
import { useLoginForm } from "../model/useLoginForm";

export function LoginForm() {
    const {
        form,
        onSubmit,
        handleSetData,
        isPending,
        isError,
        error,
        showPassword,
        setShowPassword
    } = useLoginForm();

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>User name</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id={field.name}
                                placeholder="Username"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                        </InputGroup>
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                )}
            />

            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                        <InputGroup >
                            <InputGroupAddon>
                                <Lock className="h-4 w-4 text-muted-foreground" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id={field.name}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            <InputGroupAddon align="inline-end">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-foreground hover:text-foreground focus:outline-none flex items-center justify-center cursor-pointer"
                                    title={showPassword ? "Show password" : "Hide password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 mr-2" />
                                    ) : (
                                        <Eye className="h-4 w-4 mr-2" />
                                    )}
                                </button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                )}
            />

            {isError && (
                <div className="text-sm text-destructive font-medium">
                    {error?.message || "Authorization error"}
                </div>
            )}

            <div className="flex gap-3 pt-2 ">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSetData}
                    disabled={isPending}
                >
                    Set Data
                </Button>

                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                >
                    {isPending ? "Log in..." : "Log in"}
                </Button>
            </div>
        </form>
    );
}