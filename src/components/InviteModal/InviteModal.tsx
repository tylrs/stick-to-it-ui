import { useState } from "react";
import { formatDateTime } from "../../utils/miscUtils";
import { InviteModalProps } from "../../utils/types";

const InviteModal: React.FC<InviteModalProps> = ({
  habitPlanInfo,
  showInviteModal,
}) => {
  const [formStep, setFormStep] = useState(1);

  if (!showInviteModal) return null;
  const invitationHeader = (
    <>
      <h2>Invitation for:</h2>
      <h3>{habitPlanInfo.habit.name}</h3>
      <p className="habit-plan-invite-date-range">
        {`${formatDateTime(habitPlanInfo.start_datetime)}-${formatDateTime(
          habitPlanInfo.end_datetime
        )}`}
      </p>
    </>
  );
  switch (formStep) {
    case 1:
      return (
        <div>
          {invitationHeader}
          <button>Find user by email</button>
          <button>Invite someone without account</button>
        </div>
      );
    default:
      return <></>;
  }
};

export default InviteModal;
