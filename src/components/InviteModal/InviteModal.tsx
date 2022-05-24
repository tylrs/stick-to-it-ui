import { formatDateTime } from "../../utils/miscUtils";
import { InviteModalProps } from "../../utils/types";

const InviteModal: React.FC<InviteModalProps> = ({
  habitPlanInfo,
  showInviteModal,
}) => {
  if (!showInviteModal) return null;
  return (
    <div>
      <h2>Invitation for:</h2>
      <h3>{habitPlanInfo.habit.name}</h3>
      <p className="habit-plan-invite-date-range">
        {` ${formatDateTime(habitPlanInfo.start_datetime)}-${formatDateTime(
          habitPlanInfo.end_datetime
        )}`}
      </p>
    </div>
  );
};

export default InviteModal;
