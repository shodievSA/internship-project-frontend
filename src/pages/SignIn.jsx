import GoogleSignIn from "../components/auth/GoogleSignIn";

const SignIn = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="flex flex-col lg:flex-row min-h-screen lg:gap-8">
				<div className="flex-1">
					<GoogleSignIn />
				</div>
			</div>
		</div>
	);
};

export default SignIn;
