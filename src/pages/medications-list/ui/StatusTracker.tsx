export default function StatusTracker() {
    return (
        <div className="w-30 h-1.5 flex gap-1">
            <div className="h-full w-4 bg-accent"></div>
            <div className="h-full w-10 bg-myred-darker"></div>
            <div className="h-full w-2 bg-myorange-darker"></div>
            <div className="h-full w-14 bg-mygreen-darker"></div>
        </div>
    );
}