import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function TeamMemberDetailsPage() {
    const { memberId } = useParams();
    const { projectData } = useOutletContext();

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold">Team Member Details</h1>
                    <p className="text-gray-500 dark:text-gray-400">Member ID: {memberId}</p>
                </header>

                {/* Add more member details here */}
            </div>
        </div>
    );
} 