import "./NotificationModal.css";
import { NotificationModalProps, InvitationType } from "../../utils/types";
import { useEffect, useState } from "react";
import {
  getReceivedInvitations,
  getSentInvitations,
} from "../../utils/apiCalls";
import Invitation from "../Invitation/Invitation";

interface NotificationState {
  received: InvitationType[];
  sent: InvitationType[];
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  setShowModal,
  showModal,
  userId,
  setMessage,
}) => {
  const [invitationsInfo, setInvitationsInfo] = useState<NotificationState>({
    received: [],
    sent: [],
  });
  const [displayedInvitation, setDisplayedInvitation] = useState<
    "received" | "sent"
  >("received");

  const getInvitations = async () => {
    try {
      const receivedResponse = await getReceivedInvitations(userId);
      const sentResponse = await getSentInvitations(userId);
      setInvitationsInfo(() => {
        return {
          received: receivedResponse,
          sent: sentResponse,
        };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalExit = () => {
    setShowModal(false);
    document.querySelector(".overlay")?.classList.add("hidden");
  };

  useEffect(() => {
    if (showModal) {
      getInvitations();
    }
  }, [displayedInvitation, showModal]);

  if (!showModal) return null;

  const invitations = invitationsInfo[displayedInvitation].map(
    invitationInfo => (
      <Invitation
        key={invitationInfo.id}
        type={displayedInvitation}
        invitationInfo={invitationInfo}
        userId={userId}
        setShowModal={setShowModal}
        setMessage={setMessage}
      />
    )
  );

  return (
    <div className="notification-modal-container">
      <div className="notification-modal-header-container">
        <span className="notification-header-divider"></span>
        <h2 className="notification-header-title">Invitations</h2>
        <span
          className="close-notifications-modal-button"
          onClick={() => handleModalExit()}>
          &times;
        </span>
      </div>
      <div className="notification-nav-button-container">
        <button
          className={`notification-nav-button ${
            displayedInvitation === "received" ? "active-nav-button" : ""
          }`}
          onClick={() => setDisplayedInvitation("received")}>
          Received
        </button>
        <button
          className={`notification-nav-button ${
            displayedInvitation === "sent" ? "active-nav-button" : ""
          }`}
          onClick={() => setDisplayedInvitation("sent")}>
          Sent
        </button>
      </div>
      <div className="invitation-container">
        {invitations.length ? (
          invitations
        ) : (
          <p className="no-invitation-message">
            No {displayedInvitation} invitations
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
