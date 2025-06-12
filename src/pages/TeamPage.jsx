import { useOutletContext } from "react-router-dom";

function TeamPage() {

    const { projectData } = useOutletContext();

    console.log(projectData);

    return (
        <div className="grow pb-6 md:pb-8">
            <h1>This is Team Page</h1>
        </div>
    )

}

export default TeamPage;