import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StatusBadge } from "./status-badge";
import { ActionMenu } from "./action-menu";
import { useAuthContext } from "../context/AuthContext";
import { Mail, MoreVertical, User, Pickaxe, Activity } from "lucide-react";
import { TeamMemberProductivityModal } from "./TeamMemberProductivityModal";

export function TeamMemberCard({ member }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { user } = useAuthContext();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showProductivityModal, setShowProductivityModal] = useState(false);

  const buttonRef = useRef(null);

  // Check if this is the current user's card
  const isCurrentUser = user?.id === member.id;

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleCardClick = () => {
    if (!menuOpen) {
      setShowProductivityModal(true);
    }
  };

  return (
    <div
      className={`border border-gray-200 dark:border-neutral-800 rounded-lg p-4 bg-white dark:bg-black 
			relative transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-300 
			hover:dark:border-neutral-700 group cursor-pointer ${
        isCurrentUser ? "ring-2 ring-blue-500/20 hover:ring-blue-500/30" : ""
      }`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center flex-grow min-w-0">
          <div className="flex-shrink-0 mr-4">
            <img
              src={member.avatarUrl}
              alt={member.name}
              width={48}
              height={48}
              className="rounded-full bg-gray-100 dark:bg-gray-800 object-cover"
            />
          </div>

          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg truncate">{member.name}</h3>
              <StatusBadge status={member.role} />
              {isCurrentUser && (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <Activity className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    You
                  </span>
                </div>
              )}
            </div>

            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Pickaxe className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{member.position}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          ref={buttonRef}
          className="flex-shrink-0 ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 
					dark:hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
          onClick={handleMenuToggle}
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <ActionMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorEl={buttonRef.current}
        selectedMember={member}
      />

      <TeamMemberProductivityModal
        member={member}
        isOpen={showProductivityModal}
        onClose={() => setShowProductivityModal(false)}
      />
    </div>
  );
}
