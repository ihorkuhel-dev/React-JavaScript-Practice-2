import { useEffect, useRef, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CHAT_QUERY_KEY = ['chat-messages'];

export type ConnectionStatus = 'connecting' | 'open' | 'closed' | 'error';

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'me' | 'server';
}

export interface UseChatReturn {
    messages: ChatMessage[];
    sendMessage: (text: string) => boolean;
    clearChat: () => void;
    connectionStatus: ConnectionStatus;
    isTyping: boolean;
}

export function useChat( {chatEnabled} : { chatEnabled: boolean }): UseChatReturn {
    const queryClient = useQueryClient();

    const ws = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const isIntentionalCloseRef = useRef(false);
    const enabledRef = useRef(chatEnabled);

    const { data: connectionStatus = 'closed' } = useQuery<ConnectionStatus>({
        queryKey: ['chat-connection-status'],
        queryFn: () => 'closed',
        staleTime: Infinity,
    });

    const { data: isTyping = false } = useQuery<boolean>({
        queryKey: ['chat-is-typing'],
        queryFn: () => false,
        staleTime: Infinity,
    });

    const { data: messages = [] } = useQuery<ChatMessage[]>({
        queryKey: CHAT_QUERY_KEY,
        queryFn: () => {
            try {
                const saved = localStorage.getItem('chat-messages');
                return saved ? JSON.parse(saved) : [];
            } catch {
                return [];
            }
        },
        staleTime: Infinity,
    });

    useEffect(() => {
        localStorage.setItem('chat-messages', JSON.stringify(messages));
    }, [messages]);

    const setStatus = useCallback((status: ConnectionStatus) => {
        queryClient.setQueryData(['chat-connection-status'], status);
    }, [queryClient]);

    const setIsTyping = useCallback((value: boolean) => {
        queryClient.setQueryData(['chat-is-typing'], value);
    }, [queryClient]);

    useEffect(() => {
        enabledRef.current = chatEnabled;
    }, [chatEnabled]);

    const connect = useCallback(function connectSocket() {
        if (!enabledRef.current) return;

        setStatus('connecting');
        const socket = new WebSocket("wss://ws.ifelse.io");
        ws.current = socket;

        socket.onopen = () => {
            console.log("Connection opened");
            setStatus('open');
            if (reconnectTimeoutRef.current) {
                window.clearTimeout(reconnectTimeoutRef.current);
            }
        };

        socket.onmessage = (event) => {
            if (typeof event.data === 'string' && event.data.startsWith('Request served by')) return;

            setIsTyping(false);

            let incomingMessage: ChatMessage;
            try {
                const parsed = JSON.parse(event.data);
                incomingMessage = {
                    id: parsed.id ? `${parsed.id}_server` : crypto.randomUUID(),
                    text: parsed.text !== undefined ? parsed.text : event.data,
                    sender: 'server'
                };
            } catch {
                incomingMessage = {
                    id: crypto.randomUUID(),
                    text: event.data,
                    sender: 'server'
                };
            }

            queryClient.setQueryData(CHAT_QUERY_KEY, (oldMessages: ChatMessage[] = []) => {
                return [...oldMessages, incomingMessage];
            });
        };

        socket.onclose = () => {
            console.log("Connection closed");
            setStatus('closed');
            setIsTyping(false);
            if (!isIntentionalCloseRef.current) {
                console.log("Reconnecting in 3 seconds...");
                setStatus('connecting');
                reconnectTimeoutRef.current = window.setTimeout(() => {
                    connectSocket();
                }, 3000);
            }
        };

        socket.onerror = (error) => {
            console.error("WS Error:", error);
            setStatus('error');
            socket.close();
        };
    }, [queryClient, setStatus, setIsTyping]);

    useEffect(() => {
        if (!chatEnabled) {
            isIntentionalCloseRef.current = true;
            if (reconnectTimeoutRef.current) {
                window.clearTimeout(reconnectTimeoutRef.current);
            }
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
            setStatus('closed');
            return;
        }

        isIntentionalCloseRef.current = false;
        connect();

        return () => {
            isIntentionalCloseRef.current = true;
            if (reconnectTimeoutRef.current) {
                window.clearTimeout(reconnectTimeoutRef.current);
            }
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, [connect, chatEnabled, setStatus]);

    const sendMessage = useCallback((text: string) => {
        if (text.trim().length > 0 && ws.current?.readyState === WebSocket.OPEN) {
            const messageData: ChatMessage = {
                id: crypto.randomUUID(),
                text: text.trim(),
                sender: 'me'
            };

            queryClient.setQueryData(CHAT_QUERY_KEY, (oldMessages: ChatMessage[] = []) => {
                return [...oldMessages, messageData];
            });

            ws.current.send(JSON.stringify(messageData));

            setIsTyping(true);

            return true;
        }
        return false;
    }, [queryClient, setIsTyping]);

    const clearChat = useCallback(() => {
        queryClient.setQueryData(CHAT_QUERY_KEY, []);
        localStorage.removeItem('chat-messages');
    }, [queryClient]);

    return {
        messages,
        sendMessage,
        clearChat,
        connectionStatus,
        isTyping,
    };
}