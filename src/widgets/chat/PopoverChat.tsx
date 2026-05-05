import {Popover, PopoverContent, PopoverTrigger} from "@/shared/ui/popover.tsx";
import {Button} from "@/shared/ui/button.tsx";
import {ChatIcon} from "@/shared/assets/ChatIcon.tsx";
import {Card, CardContent, CardFooter, CardHeader} from "@/shared/ui/card.tsx";
import {Input} from "@/shared/ui/input.tsx";
import {ScrollArea} from "@/shared/ui/scroll-area.tsx";
import {Field} from "@/shared/ui/field.tsx";
import {SendIcon} from "@/shared/assets/SendIcon.tsx";
import { useGetCurrentUser, type User } from "@/features/auth/api/authApi.ts";
import {Skeleton} from "@/shared/ui/skeleton.tsx";
import {ServerIcon} from "@/shared/assets/ServerIcon.tsx";
import {useEffect, useRef, useState, memo} from "react";

const UserMessage = ({user, isLoading}: {user?: User, isLoading: boolean})=> {
    return (
        <div>
            <p className="text-right min-w-[60%] w-min ml-auto bg-mygrey-lighter p-2 rounded-md">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium deleniti dolores doloribus eius enim
            </p>
            {isLoading ? (
                <Skeleton className="w-9 h-9 rounded-full" />
            ) :  user?.image ? (
                <img src={user.image} alt="Avatar" className="size-10 object-fit ml-auto mt-1 p-1 rounded-full bg-mygrey-lighter" />
            ) : (
                <p>kk</p>
            )}
        </div>
    )
}
const ServerMessage = () => {
    return (
        <div>
            <p className="text-left min-w-[60%] w-min mr-auto bg-mygrey-lighter p-2 rounded-md">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium deleniti dolores doloribus eius enim
            </p>
            <ServerIcon className="size-10 mr-auto mt-1 p-1 rounded-full bg-mygrey-lighter"/>
        </div>
    )
}

function PopoverChat(){

    const { data: user, isLoading } = useGetCurrentUser();
    const [message, setMessage] = useState("");
    const popoverOpen = useRef(false);
    const inputRef = useRef(null);

    const ws = useRef(null);

    console.log(1)

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage =  () => {
        if(message.trim().length > 0){
            console.log(message)
            setMessage("");
            inputRef.current?.focus();
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        sendMessage()
    };

    useEffect(() => {

        const socket = new WebSocket("wss://ws.ifelse.io");

        socket.onopen = () => console.log("Connection opened");
        socket.onclose = () => console.log("Connection close");

        ws.current = socket

        return () => {
            socket.close()
        }

    }, [])

    return(
        <div className="fixed z-100 right-5 bottom-5">
            <Popover onOpenChange={(e) => {popoverOpen.current = e}}>
                <PopoverTrigger asChild>
                    <Button
                        className="text-white"
                        aria-label="Open chat"
                    >
                        <ChatIcon color="currentColor"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="border border-mygrey-lighter background-blur" align="end" side="top" >
                    <Card className="w-80 ">
                        <CardHeader className="bg-mywhite  p-4  rounded-sm">
                            <h4 className="text-myblack font-medium">E-commerce - Tech Support</h4>
                        </CardHeader>
                        <CardContent className=" p-0">
                            <ScrollArea className="h-100">
                                <div className="flex flex-col gap-2">
                                    <UserMessage user={user} isLoading={isLoading}/>
                                    <ServerMessage/>
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter className={`bg-mywhite rounded-sm p-0`}>
                            <form className="flex w-full" onSubmit={onSubmit}>
                                <Field className="flex-1">
                                    <Input ref={inputRef} name="message" placeholder="Type message" value={message} onChange={handleChange} className="border-0 p-4 h-full border-transparent" />
                                </Field>
                                <Button type="submit" aria-label="send message" onClick={sendMessage} className='bg-accent text-mywhite h-10 m-2'>
                                    <SendIcon color="currentColor" className="size-5"/>
                                </Button>
                            </form>


                        </CardFooter>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>

    )
}

export default memo(PopoverChat)