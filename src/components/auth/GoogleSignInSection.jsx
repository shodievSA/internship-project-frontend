import { GoogleIcon } from "../icons";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const GoogleSignInSection = () => {

    function handleRedirect() {

        window.location.href = `${SERVER_BASE_URL}/api/v1/auth/google`;

    }

    return (
        <div className="w-full h-full bg-white flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-[400px] lg:max-w-[480px] mx-auto">
                <div className="text-center space-y-8 lg:space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-2xl lg:text-3xl leading-[40px] tracking-[-0.02em] font-bold text-gray-900">
                            Ready to boost your team's productivity?
                        </h2>
                        <p className="text-[18px] leading-[28px] lg:text-xl lg:leading-[32px] text-gray-600">
                            Join thousands of teams already benefiting from SmartDesk
                        </p>
                    </div>

                    <button onClick={handleRedirect} className="w-full h-[52px] lg:h-[60px] px-6 lg:px-8 bg-white border border-gray-300 rounded-[14px] lg:rounded-xl text-[16px] lg:text-[18px] text-gray-700 font-medium flex items-center justify-center gap-3 lg:gap-4 hover:bg-gray-50 transition-colors">
                        <GoogleIcon />
                        Continue with Google
                    </button>

                    <div className="space-y-4 lg:space-y-6">
                        <p className="text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px] text-gray-500">
                            Trusted by 10,000+ teams worldwide
                        </p>

                        <p className="text-[14px] lg:text-[16px] leading-[20px] lg:leading-[24px] text-gray-400">
                            By continuing, you agree to our{" "}
                            <a href="#" className="text-[#4285F4] hover:underline">
                                Terms
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-[#4285F4] hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleSignInSection; 