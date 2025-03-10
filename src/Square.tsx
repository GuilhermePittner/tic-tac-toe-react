

type Props = {
    index: number
    player?: string
    onClick(event: any): void;
}

function Square({ player, index, onClick }: Props) {

    // whenever a player's up, highlight his name
    const colorScale = player ? "scale-100" : "scale-0";
    const textColor = player === "X" ? "text-yellow-200" : "text-fuchsia-300";
    const hoverStyle = "transition duration-500 hover:scale-105 transform";


    return (
        <div
            data-cell-index={index}
            className={`h-36 border-solid border-4 border-slate-200 font-lobster text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}
            {... {onClick}}>

            <span data-cell-index={index} className={`transform transition-all duration-150 ease-out ${colorScale} ${textColor}`}>{player}</span>
        </div>
    )
}

export default Square
