import SignInButton from './SignInButton';
import { GoogleIcon, DiscordIcon } from '../icons/Icons';

const SignInForm = () => {
    return (
        <div className="max-w-md lg:max-w-lg w-full space-y-8 lg:space-y-10">
            <div className="text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Welcome back</h2>
                <p className="mt-2 text-sm lg:text-base text-gray-600">Sign in to your account to continue</p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Card Header */}
                <div className="px-6 lg:px-8 py-8 lg:py-10 border-b border-gray-200">
                    <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900">Sign in</h3>
                    <p className="mt-2 text-sm lg:text-base text-center text-gray-600">Choose your sign in method</p>
                </div>

                {/* Card Content */}
                <div className="px-6 lg:px-8 py-6 lg:py-8 space-y-4 lg:space-y-6">
                    <SignInButton
                        icon={GoogleIcon}
                        provider="Google"
                        onClick={() => console.log('Google sign in')}
                        className="lg:py-4 lg:text-lg"
                    />
                    <SignInButton
                        icon={DiscordIcon}
                        provider="Discord"
                        onClick={() => console.log('Discord sign in')}
                        className="lg:py-4 lg:text-lg"
                    />
                </div>

                {/* Card Footer */}
                <div className="px-6 lg:px-8 py-6 lg:py-8 bg-gray-50 border-t border-gray-200">
                    <p className="text-center text-sm lg:text-base text-gray-600">
                        Don't have an account?{' '}
                        <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-xs lg:text-sm text-gray-500">
                    By signing in, you agree to our{' '}
                    <a href="/terms" className="text-blue-600 hover:text-blue-500">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInForm; 