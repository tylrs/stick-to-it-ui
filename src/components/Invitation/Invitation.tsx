import { formatDateTime } from "../../utils/miscUtils";
import { InvitationProps } from "../../utils/types";
import "./Invitation.css";

const Invitation: React.FC<InvitationProps> = ({ type, invitationInfo }) => {
  const { habit_plan, sender } = invitationInfo;
  console.log(type, invitationInfo);
  return (
    <article className="invitation-card">
      <h3>{habit_plan.habit.name}</h3>
      <p className="invitation-habit-plan-date-range">
        {`${formatDateTime(habit_plan.start_datetime)}-${formatDateTime(
          habit_plan.end_datetime
        )}`}
      </p>
    </article>
  );
};

export default Invitation;
