import { Loader2 } from "lucide-react";

function AuthSpinner() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 dark:bg-black">
            <div className="max-w-md w-full bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6 
			sm:p-8 md:p-10 space-y-8 border dark:border-neutral-700">
                {/* Logo Section */}
                <div className="flex justify-center">
                    <div className="rounded-xl flex items-center justify-center">
                        <span className="text-3xl font-semibold text-white">SmartDesk</span>
                    </div>
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-10 w-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                            Authenticating
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            Please wait while we verify your credentials
                        </p>
                    </div>
                </div>

                <div className="pt-6 text-center">
                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1">
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                        	Secure connection
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-500"></span>
                    </p>
                </div>
                {/* Footer */}
                <footer className="mt-8 text-center text-gray-400 dark:text-gray-500 text-xs sm:text-sm">
                    © 2025 Project Manager. All rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default AuthSpinner;