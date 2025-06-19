import Button from "./ui/Button";
import { Plus, House, Bot, Bell } from "lucide-react";

function EmptyDashboard({ showNewProjectModal }) {

    return (
        <div className="h-full flex justify-center pb-10">
            <div className="flex flex-col gap-y-8 w-11/12 md:w-2/3 my-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Ready to start your first project?</h1>
                <p className="dark:text-gray-400 text-neutral-600 md:text-lg lg:text-xl text-balance text-center lg:px-5">
                    Create your first project and begin organizing your tasks, collaborating with your
                    team, and achieving your goals.
                </p>
                <Button 
                    className={"flex items-center gap-x-3 self-center"} 
                    onClick={() => showNewProjectModal(true)}
                >
                    <Plus className="w-4 h-4" />
                    <span className="lg:text-lg font-medium">Create First Project</span>
                </Button>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-center mt-4 gap-10 pb-10">
                    <div className="flex items-center flex-col gap-y-3">
                        <div className="dark:bg-gray-800 dark:border-0 border-[1px] border-neutral-200 
                        p-3 rounded-lg">
                            <House className="text-purple-400" />
                        </div>
                        <h3 className="font-medium">Organize Tasks</h3>
                        <p className="text-center text-sm dark:text-gray-400 text-neutral-600">
                            Keep track of all your tasks in one place
                        </p>
                    </div>
                    <div className="flex items-center flex-col gap-y-3">
                        <div className="dark:bg-gray-800 dark:border-0 border-[1px] border-neutral-200
                        p-3 rounded-lg">
                            <Bot className="text-blue-400" />
                        </div>
                        <h3 className="font-medium">AI planning</h3>
                        <p className="text-center text-sm dark:text-gray-400 text-neutral-600">
                            Let AI help you plan and prioritize
                        </p>
                    </div>
                    <div className="flex items-center flex-col gap-y-3">
                        <div className="dark:bg-gray-800 dark:border-0 border-[1px] border-neutral-200
                        p-3 rounded-lg">
                            <Bell className="text-green-400" />
                        </div>
                        <h3 className="font-medium">Stay Updated</h3>
                        <p className="text-center text-sm dark:text-gray-400 text-neutral-600">
                            Get notified about important updates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EmptyDashboard;