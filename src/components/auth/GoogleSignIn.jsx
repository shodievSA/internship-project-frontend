import BrandSection from './BrandSection';
import GoogleSignInSection from './GoogleSignInSection';

const GoogleSignIn = () => {
    return (
        <div className="flex flex-col lg:flex-row h-full">
            <BrandSection />
            <div className="lg:fixed lg:right-0 lg:top-0 lg:bottom-0 lg:w-[40%]">
                <GoogleSignInSection />
            </div>
        </div>
    );
};

export default GoogleSignIn;