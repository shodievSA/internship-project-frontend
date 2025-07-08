import { ShieldOff } from "lucide-react";

function Unauthorized({ message }) {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-5 w-[500px]">
                <ShieldOff className="w-20 h-20" />
                <div className="flex flex-col gap-y-2 items-center">
                    <h1 className="text-xl  text-center text-balance
					leading-normal">
                        {message}
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default Unauthorized;