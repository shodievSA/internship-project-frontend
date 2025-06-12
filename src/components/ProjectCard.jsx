
import { Calendar, Users, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { statusColors } from "../utils/constant"
import ProgressBar from "./ProgressBar"

const ProjectCard = ({ project }) => {
  const { id, name, createdAt, members, isOwner, status, tasks } = project
  const progress = Math.round((tasks.completed / tasks.total) * 100)
  const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/projects/${id}/team`, { state: { projectInfo: project } });
    }

  return (
    <div className="card" onClick={handleClick}>
      {/* Header with title and badges */}
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{name}</h2>
        <div className="flex gap-2">
          {isOwner ? (
            <span className="owner-badge">
              Owner
            </span>
          ) : (
            <span className="member-badge">
              Member
            </span>
          )}

          <span className={`${statusColors[status]} status-badge`}>
            {status}
          </span>
        </div>
      </div>

      {/* Created date */}
      <div className="flex items-center gap-2 mb-6 text-gray-500 dark:text-gray-400">
        <Calendar className="w-4 h-4" />
        <span className="text-sm">Created: {createdAt}</span>
      </div>

      {/* Members and tasks row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">{members} members</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm">{tasks.completed}/{tasks.total} tasks</span>
        </div>
      </div>

      {/* Progress section */}
      <ProgressBar progress={progress} />
    </div>
  )
}

export default ProjectCard;
