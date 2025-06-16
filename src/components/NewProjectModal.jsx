import { useState } from "react";
import { CircleAlert } from "lucide-react";
import projectService from "../services/projectService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function NewProjectModal({ setShowNewProjectModal }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectUserPosition, setNewProjectUserPosition] = useState("");
  const [showNewProjectTitleError, setShowNewProjectTitleError] =
    useState(false);
  const [showNewProjectUserPositionError, setShowNewProjectUserPositionError] =
    useState(false);
  const [isNewProjectBeingCreated, setIsNewProjectBeingCreated] =
    useState(false);
  const [error, setError] = useState("");

  async function createNewProject() {
    const isValid = isNewProjectInputValid(
      newProjectTitle,
      newProjectUserPosition,
      setShowNewProjectTitleError,
      setShowNewProjectUserPositionError
    );

    if (!isValid) return;

    setIsNewProjectBeingCreated(true);
    setError("");

    try {
      const response = await projectService.createProject(user.id, newProjectTitle, newProjectUserPosition);
      setShowNewProjectModal(false);
      // Navigate to the new project
      navigate(`/projects`);
    } catch (err) {
      setError(err.message || "Failed to create project. Please try again.");
    } finally {
      setIsNewProjectBeingCreated(false);
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full fixed bg-black/90 left-0 top-0">
      <div
        className="w-[350px] lg:[500px] dark:bg-neutral-950 dark:border-neutral-800 bg-white  
            border-[1px] p-8 rounded-lg flex flex-col gap-y-6 w-[350px] lg:w-[500px]"
      >
        <h1 className="dark:text-white text-black text-lg lg:text-xl font-semibold">
          Create New Project
        </h1>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm lg:text-base">Project Title</label>
            <input
              disabled={isNewProjectBeingCreated}
              maxLength={20}
              className="rounded-md text-sm lg:text-base dark:bg-neutral-950 dark:border-neutral-800 
                        dark:focus:border-neutral-600 focus:border-black bg-white border-[1px] py-2 px-4 outline-none"
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
            {showNewProjectTitleError && (
              <div className="flex gap-x-1.5 text-red-500">
                <CircleAlert className="w-4 h-4" />
                <p className="text-red-500 text-sm">
                  You must include project title
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="text-sm lg:text-base">
              Specify your position in this project (e.g team lead)
            </label>
            <input
              disabled={isNewProjectBeingCreated}
              maxLength={50}
              className="rounded-md text-sm lg:text-base dark:bg-neutral-950 dark:border-neutral-800 
                        dark:focus:border-neutral-600 focus:border-black bg-white border-[1px] py-2 px-4 outline-none"
              onChange={(e) => setNewProjectUserPosition(e.target.value)}
            />
            {showNewProjectUserPositionError && (
              <div className="flex gap-x-1.5 text-red-500">
                <CircleAlert className="w-4 h-4" />
                <p className="text-sm">You must include your position</p>
              </div>
            )}
          </div>
          {error && (
            <div className="flex gap-x-1.5 text-red-500">
              <CircleAlert className="w-4 h-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            disabled={isNewProjectBeingCreated}
            className="dark:bg-white dark:hover:bg-slate-200 dark:text-black bg-neutral-900 hover:bg-neutral-900/90 
                        text-white py-2.5 px-4 rounded-lg font-medium text-sm lg:text-base"
            onClick={createNewProject}
          >
            {isNewProjectBeingCreated ? (
              <div className="flex justify-center">
                <div className="relative w-5 h-5">
                  <div className="absolute w-5 h-5 border-2 dark:border-gray-300 border-gray-400 rounded-full"></div>
                  <div
                    className="absolute w-5 h-5 border-2 border-transparent border-t-white 
                                        dark:border-t-black rounded-full animate-spin"
                  ></div>
                </div>
              </div>
            ) : (
              "Create Project"
            )}
          </button>
          <button
            disabled={isNewProjectBeingCreated}
            className={`dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:hover:bg-neutral-800 
                        bg-white hover:bg-slate-100 py-2.5 px-4 border-[1px] rounded-lg font-medium text-sm lg:text-base 
                        disabled:opacity-50 ${isNewProjectBeingCreated
                ? "cursor-not-allowed"
                : "cursor-pointer"
              }`}
            onClick={() => setShowNewProjectModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function isNewProjectInputValid(
  title,
  userPosition,
  displayTitleError,
  displayUserPositionError
) {
  if (!title && !userPosition) {
    displayTitleError(true);
    displayUserPositionError(true);
    return false;
  }

  if (!title) {
    displayTitleError(true);
    return false;
  }

  if (title) {
    displayTitleError(false);
  }

  if (!userPosition) {
    displayUserPositionError(true);
    return false;
  }

  if (userPosition) {
    displayUserPositionError(false);
  }

  return true;
}

export default NewProjectModal;
