import { GoogleIcon } from "../icons";

const GoogleSignInSection = () => {
    return (
        <div className="w-full h-full bg-white flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-[400px] lg:max-w-[480px] mx-auto">
                <div className="text-center space-y-8 lg:space-y-10">
                    <div className="space-y-4 lg:space-y-6">
                        <h2 className="text-[40px] leading-[48px] lg:text-[48px] lg:leading-[56px] tracking-[-0.02em] font-bold text-gray-900">
                            Ready to boost productivity?
                        </h2>
                        <p className="text-[18px] leading-[28px] lg:text-[22px] lg:leading-[32px] text-gray-600">
                            Join thousands of teams already benefiting from SmartDesk
                        </p>
                    </div>

                    <button className="w-full h-[52px] lg:h-[60px] px-6 lg:px-8 bg-white border border-gray-300 rounded-[14px] lg:rounded-[16px] text-[16px] lg:text-[18px] text-gray-700 font-medium flex items-center justify-center gap-3 lg:gap-4 hover:bg-gray-50 transition-colors">
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