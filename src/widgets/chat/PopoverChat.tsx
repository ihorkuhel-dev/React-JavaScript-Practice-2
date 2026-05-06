import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover.tsx";
import { Button } from "@/shared/ui/button.tsx";
import { ChatIcon } from "@/shared/assets/ChatIcon.tsx";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/ui/card.tsx";
import { Input } from "@/shared/ui/input.tsx";
import { ScrollArea } from "@/shared/ui/scroll-area.tsx";
import { Field } from "@/shared/ui/field.tsx";
import { SendIcon } from "@/shared/assets/SendIcon.tsx";
import { useGetCurrentUser, type User } from "@/features/auth/api/authApi.ts";
import { Skeleton } from "@/shared/ui/skeleton.tsx";
import { ServerIcon } from "@/shared/assets/ServerIcon.tsx";
import { useRef, useState, memo, useEffect } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { Trash2 } from "lucide-react";
import { useChat } from "./lib/useChat.ts";
import type { ChatMessage, ConnectionStatus } from "./lib/useChat.ts";

const ConnectionIndicator = ({ status }: { status: ConnectionStatus }) => {
    const config: Record<ConnectionStatus, { color: string; label: string }> = {
        open:       { color: 'bg-mygreen-darker',  label: 'Connected'    },
        connecting: { color: 'bg-myorange-darker', label: 'Connecting...' },
        closed:     { color: 'bg-mygrey',   label: 'Disconnected' },
        error:      { color: 'bg-myred-darker',    label: 'Error'        },
    };

    const { color, label } = config[status];

    return (
        <span className="flex items-center gap-1.5 text-xs text-mygrey">
            <span className={`inline-block w-2 h-2 rounded-full ${color}`} />
            {label}
        </span>
    );
};

const UserMessage = ({ user, isLoading, text }: { user?: User, isLoading: boolean, text: string }) => {
    return (
        <div>
            <p className="text-right  ml-auto message-block">
                {text}
            </p>
            {isLoading ? (
                <Skeleton className="w-9 h-9 rounded-full ml-auto mt-1" />
            ) : user?.image ? (
                <img src={user.image} alt="Avatar" className="message-icon ml-auto" />
            ) : (
                <Skeleton className="w-9 h-9 rounded-full ml-auto mt-1" />
            )}
        </div>
    );
};

const ServerMessage = ({ text }: { text: string }) => {
    return (
        <div>
            <p className="text-left mr-auto message-block">
                {text}
            </p>
            <ServerIcon className="message-icon mr-auto" />
        </div>
    );
};

const TypingIndicator = () => {
    return (
        <div>
            <div className="flex items-center gap-1 bg-mygrey-lighter p-2 rounded-md w-min mr-auto">
                <span className="typing-indicator [animation-delay:0ms]" />
                <span className="typing-indicator [animation-delay:150ms]" />
                <span className="typing-indicator [animation-delay:300ms]" />
            </div>
            <ServerIcon className="message-icon mr-auto" />
        </div>
    );
};

function PopoverChat() {
    const { data: user, isLoading } = useGetCurrentUser();
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { messages, sendMessage, clearChat, connectionStatus, isTyping } = useChat({ chatEnabled: isOpen });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (sendMessage(message)) {
            setMessage("");
            inputRef.current?.focus();
        }
    };

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSendMessage();
    };

    const isConnected = connectionStatus === 'open';

    useEffect(() => {
        if (isConnected) {
            inputRef.current?.focus();
        }
    }, [isConnected]);

    return (
        <div className="fixed z-99 right-5 bottom-5">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        className="text-white h-11"
                        aria-label="Open chat"
                    >
                        <ChatIcon className="size-6" color="currentColor" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="bg-inherit border border-mygrey-lighter background-blur" align="end" side="top">
                    <Card className="w-80">
                        <CardHeader className="accent-block p-4  flex flex-row items-center justify-between space-y-0">
                            <div className="titles-block gap-0.5">
                                <h4>E-commerce - Tech Support</h4>
                                <ConnectionIndicator status={connectionStatus} />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={clearChat}
                                type="button"
                                aria-label="Clear chat"
                                className="h-8 w-8 text-mygrey hover:text-myred-darker hover:bg-myred-lighter"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-160 max-h-[45vh] p-4">
                                <div className="flex flex-col gap-4">
                                    {messages.map((msg: ChatMessage) => (
                                        msg.sender === 'me'
                                            ? <UserMessage key={msg.id} user={user} isLoading={isLoading} text={msg.text} />
                                            : <ServerMessage key={msg.id} text={msg.text} />
                                    ))}
                                    {isTyping && <TypingIndicator />}
                                    <div ref={bottomRef} />
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className="accent-block p-0">
                            <form className="flex w-full" onSubmit={onSubmit}>
                                <Field className="flex-1">
                                    <Input
                                        ref={inputRef}
                                        name="message"
                                        placeholder={isConnected ? "Type message" : "Waiting for connection..."}
                                        value={message}
                                        onChange={handleChange}
                                        disabled={!isConnected}
                                        className="border-0 p-4 h-full border-transparent focus-visible:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </Field>
                                <Button
                                    type="submit"
                                    aria-label="Send message"
                                    disabled={!isConnected}
                                    className=" text-mywhite h-10 m-2"
                                >
                                    <SendIcon color="currentColor" className="size-5" />
                                </Button>
                            </form>
                        </CardFooter>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default memo(PopoverChat);