import BrandSection from '../components/auth/BrandSection';
import SignInForm from '../components/auth/SignInForm';

const SignIn = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <BrandSection />
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <SignInForm />
            </div>
        </div>
    );
}

export default SignIn;
