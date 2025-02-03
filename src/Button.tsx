type ButtonProps = {
    text: string
    onClick(event: any): void;
}

function Button({ text, onClick }: ButtonProps){
    return (
        <div>
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition cursor-pointer" onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default Button
