import React, { useState } from "react";
import { formatDateTime } from "../../utils/miscUtils";
import { InviteModalProps } from "../../utils/types";
import { createInvitation } from "../../utils/apiCalls";

const InviteModal: React.FC<InviteModalProps> = ({
  habitPlanInfo,
  userId,
  showInviteModal,
  setMessage,
}) => {
  const [formStep, setFormStep] = useState(1);
  const [recipientInfo, setRecipientInfo] = useState({
    recipient_name: "",
    recipient_email: "",
  });
  const [error, setError] = useState("");

  if (!showInviteModal) return null;
  // const invitationHeader = (
  //   <>
  //     <h2>Invitation for:</h2>
  //     <h3>{habitPlanInfo.habit.name}</h3>
  //     <p className="habit-plan-invite-date-range">
  //       {`${formatDateTime(habitPlanInfo.start_datetime)}-${formatDateTime(
  //         habitPlanInfo.end_datetime
  //       )}`}
  //     </p>
  //   </>
  // );
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientInfo(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitUserInvite = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createInvitation(recipientInfo, userId, habitPlanInfo.id);
      setMessage("Invitation Sent");
      setFormStep(1);
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError(err);
      }
    }
  };

  let invitationBody;
  switch (formStep) {
    case 1:
      invitationBody = (
        <div>
          <button onClick={() => setFormStep(2)}>Find user by email</button>
          <button onClick={() => setFormStep(3)}>
            Invite someone without account
          </button>
        </div>
      );
      break;
    case 2:
      invitationBody = <div></div>;
      break;
    case 3:
      invitationBody = (
        <form onSubmit={e => submitUserInvite(e)}>
          <h4>Invite unregistered user:</h4>
          <label htmlFor="invite-name">Name: </label>
          <input
            required
            id="invite-name"
            className="invite-input"
            type="text"
            name="recipient_name"
            placeholder="Recipient Name"
            maxLength={20}
            value={recipientInfo.recipient_name}
            onChange={e => handleUserInput(e)}
          />
          <label htmlFor="invite-email">Email: </label>
          <input
            required
            id="invite-email"
            className="invite-input"
            type="text"
            name="recipient_email"
            placeholder="Recipient Email"
            maxLength={20}
            value={recipientInfo.recipient_email}
            onChange={e => handleUserInput(e)}
          />
          <button>Submit</button>
        </form>
      );
      break;
    default:
      invitationBody = <p></p>;
  }

  return (
    <div>
      {error && <p className="invitation-error">{error}</p>}
      <h2>Invitation for:</h2>
      <h3>{habitPlanInfo.habit.name}</h3>
      <p className="habit-plan-invite-date-range">
        {`${formatDateTime(habitPlanInfo.start_datetime)}-${formatDateTime(
          habitPlanInfo.end_datetime
        )}`}
      </p>
      {invitationBody}
    </div>
  );
};

export default InviteModal;
