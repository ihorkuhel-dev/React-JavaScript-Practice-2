import {Badge} from "@/shared/ui/badge.tsx";

interface ReactionBadgeProps {
    isSuccess: boolean;
}

export default function ReactionBadge ({ isSuccess }: ReactionBadgeProps) {
    return(
        <>
            {isSuccess ? (
                    <Badge variant="circle" className="text-mygreen-darker bg-mygreen-lighter">
                        &#10003;
                    </Badge>
                ) :
                (
                    <Badge variant="circle" className="text-myred-darker bg-myred-lighter">
                        &#x2715;
                    </Badge>
                )}
        </>
    )
}