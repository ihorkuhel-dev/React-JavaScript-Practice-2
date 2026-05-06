import { Controller } from "react-hook-form";
import { User, Lock, Eye, EyeOff } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/shared/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "@/shared/ui/input-group";
import { Button } from "@/shared/ui/button";
import {useLoginForm} from "@/pages/login/lib/useLoginForm.ts";

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
                                <User className="input-icon" />
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
                                <Lock className="input-icon" />
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

            {isError && (
                <p className="text-myred-darker">
                    {error?.message || "Authorization error"}
                </p>
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