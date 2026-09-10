export const ProgressBar = ({progress}: {progress:number}) => {
    return(
        <div className="h-0.5 w-full rounded-full bg-bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-accent transition-colors duration-500 ease-out"
            style={{width: `${progress}%`}}>

            </div>
        </div>
    )
}