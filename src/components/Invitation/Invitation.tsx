import { acceptInvitation } from "../../utils/apiCalls";
import { formatDateTime } from "../../utils/miscUtils";
import { InvitationProps } from "../../utils/types";
import "./Invitation.css";

const Invitation: React.FC<InvitationProps> = ({
  type,
  invitationInfo,
  userId,
  setShowModal,
  setMessage,
  setError,
}) => {
  const { id, habit_plan, sender, recipient_email } = invitationInfo;

  const handleAcceptInvitation = async () => {
    try {
      await acceptInvitation(userId, id);
      setMessage("Invitation Accepted");
      setShowModal(false);
      document.querySelector(".overlay")?.classList.add("hidden");
    } catch (err: any) {
      setError(err.errors);
    }
  };

  return (
    <article className="invitation-card">
      <h3>{habit_plan.habit.name}</h3>
      <p>{habit_plan.habit.description}</p>
      <p className="invitation-habit-plan-date-range">
        {`${formatDateTime(habit_plan.start_datetime)}-${formatDateTime(
          habit_plan.end_datetime
        )}`}
      </p>
      <p>{type === "received" ? "With" : "Invitation To"}:</p>
      {type === "received" ? (
        <>
          <p>{sender.name}</p>
          <button
            className="accept-invitation-button"
            onClick={() => handleAcceptInvitation()}>
            Accept Invitation
          </button>
        </>
      ) : (
        <p>{recipient_email}</p>
      )}
    </article>
  );
};

export default Invitation;
