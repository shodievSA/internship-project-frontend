import { Loader2 } from "lucide-react";

function AuthSpinner() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-8">
                {/* Logo Section */}
                <div className="flex justify-center">
                    <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">SD</span>
                    </div>
                </div>

                {/* Loading Animation */}
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                            Authenticating
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base">
                            Please wait while we verify your credentials
                        </p>
                    </div>
                </div>

                {/* Security Message */}
                <div className="pt-6 text-center">
                    <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-1">
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-400"></span>
                        Secure connection
                        <span className="inline-block h-1 w-1 rounded-full bg-gray-400"></span>
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-gray-400 text-xs sm:text-sm">
                © 2025 Project Manager. All rights reserved.
            </footer>
        </div>
    );
}

export default AuthSpinner;