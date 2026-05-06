import { Controller } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";
import {useRegisterForm} from "@/pages/register/lib/useRegisterForm.ts";

export function RegisterForm() {
    const {
        form,
        onSubmit,
        isPending,
        isError,
        error,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword
    } = useRegisterForm();

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
                                <User className="input-icon" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id={field.name}
                                placeholder="Username"
                                autoComplete="username"
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
                                <Lock className="input-icon" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id={field.name}
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            <InputGroupAddon align="inline-end">
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="eye-button"
                                    title={showPassword ? "Show password" : "Hide password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="input-icon mr-2" />
                                    ) : (
                                        <Eye className="input-icon mr-2" />
                                    )}
                                </button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                )}
            />

            <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>

                        <InputGroup >
                            <InputGroupAddon>
                                <Lock className="input-icon" />
                            </InputGroupAddon>
                            <InputGroupInput
                                id={field.name}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                autoComplete="new-password"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            <InputGroupAddon align="inline-end">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="eye-button"
                                    title={showConfirmPassword ? "Show password" : "Hide password"}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="input-icon mr-2" />
                                    ) : (
                                        <Eye className="input-icon mr-2" />
                                    )}
                                </button>
                            </InputGroupAddon>
                        </InputGroup>
                        <FieldError>{fieldState.error?.message}</FieldError>
                    </Field>
                )}
            />

            {isError && (
                <p className="text-myred-darker">
                    {error?.message || "Registration error."}
                </p>
            )}

            <div className="flex gap-3 pt-2 ">
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isPending}
                >
                    {isPending ? "Registering..." : "Register"}
                </Button>
            </div>
        </form>
    );
}