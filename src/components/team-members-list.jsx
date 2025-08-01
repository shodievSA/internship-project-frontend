import { TeamMemberCard } from "./team-member-card";

export function TeamMembersList({ members, currentUser, onRemoveMember }) {
	return (
		<div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
		md:gap-6 pb-4"
		>
			{members.map((member) => (
				<TeamMemberCard
					key={member.id}
					member={member}
					currentUser={currentUser}
					onRemoveMember={onRemoveMember}
				/>
			))}
		</div>
	);
}
