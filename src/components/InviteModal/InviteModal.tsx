import React, { useState } from "react";
import { formatDateTime } from "../../utils/miscUtils";
import { InviteModalProps } from "../../utils/types";
import { createInvitation, getUserByEmail } from "../../utils/apiCalls";

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
  const [recipientEmailLookup, setRecipientEmailLookup] = useState("");
  const [error, setError] = useState("");

  if (!showInviteModal) return null;

  const handleUserInvitationInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecipientInfo(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleUserLookupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientEmailLookup(e.target.value);
  };

  const handleFailedLookupContinue = () => {
    setRecipientInfo(prevState => {
      return { ...prevState, recipient_email: recipientEmailLookup };
    });
    setFormStep(3);
  };

  const submitUserInvite = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
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

  const submitUserLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await getUserByEmail(recipientEmailLookup);
      setRecipientInfo({
        recipient_name: response.name,
        recipient_email: response.email,
      });
      setFormStep(4);
    } catch (err: any) {
      if (err.errors === "User not found") {
        setFormStep(5);
      } else if (err.errors) {
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
      invitationBody = (
        <form onSubmit={e => submitUserLookup(e)}>
          <h4>Lookup registered user:</h4>
          <label htmlFor="lookup-recipient-email">Email: </label>
          <input
            required
            id="lookup-recipient-email"
            className="invite-input"
            type="text"
            name="recipient_email"
            placeholder="Recipient Email"
            maxLength={40}
            value={recipientEmailLookup}
            onChange={e => handleUserLookupInput(e)}
          />
          <button>Submit</button>
        </form>
      );
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
            onChange={e => handleUserInvitationInput(e)}
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
            onChange={e => handleUserInvitationInput(e)}
          />
          <button>Submit</button>
        </form>
      );
      break;
    case 4:
      invitationBody = (
        <div>
          <p>Would you like to invite this user:</p>
          <p>{recipientInfo.recipient_name}</p>
          <p>{recipientInfo.recipient_email}</p>
          <button onClick={e => submitUserInvite(e)}>Yes</button>
          <button onClick={() => setFormStep(1)}>No</button>
        </div>
      );
      break;
    case 5:
      invitationBody = (
        <div>
          <p>User could not be found!</p>
          <p>Would you like to send an invite to this email anyway:</p>
          <p>{recipientEmailLookup}</p>
          <button onClick={() => handleFailedLookupContinue()}>Yes</button>
          <button onClick={() => setFormStep(1)}>No</button>
        </div>
      );
      break;
    default:
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