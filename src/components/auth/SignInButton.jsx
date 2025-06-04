const SignInButton = ({ icon: Icon, provider, onClick, className = '' }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${className}`}
        >
            {Icon && <Icon className="w-5 h-5 lg:w-6 lg:h-6 mr-3" />}
            Sign in with {provider}
        </button>
    );
};

export default SignInButton; 