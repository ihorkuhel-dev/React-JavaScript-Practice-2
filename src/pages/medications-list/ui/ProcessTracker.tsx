import {Progress} from "@/shared/ui/progress.tsx";

interface ProcessTrackerProps {
    values: [number, number];
}

export default function ProcessTracker({values}: ProcessTrackerProps) {

    const lineWidth = 120
    const [val1, val2] = values;
    const totalValues = val1 + val2;

    const ratio = totalValues > 0 ? (lineWidth / totalValues) : 0;

    const val1Length = Math.floor(val1 * ratio);

    return(
        <div>
            <p className="mb-2">{val1} / {val2}</p>
            <Progress value={val1Length} className="w-[120px]" />
        </div>
    )
}