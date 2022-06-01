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
  const [error, setError] = useState("");

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
    } catch (err: any) {
      setError(err.errors);
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

  useEffect(() => {
    if (error) {
      let timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

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
        setError={setError}
      />
    )
  );

  return (
    <div className="notification-modal-container">
      {error && <p className="notification-error">{error}</p>}
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
        <span>
          <button
            className={`notification-nav-button ${
              displayedInvitation === "received" ? "active-nav-button" : ""
            }`}
            onClick={() => setDisplayedInvitation("received")}>
            Received
          </button>
          {invitationsInfo.received.length && (
            <span className="notification-counter counter-received">
              {invitationsInfo.received.length}
            </span>
          )}
        </span>
        <span>
          <button
            className={`notification-nav-button ${
              displayedInvitation === "sent" ? "active-nav-button" : ""
            }`}
            onClick={() => setDisplayedInvitation("sent")}>
            Sent
          </button>
          {invitationsInfo.sent.length && (
            <span className="notification-counter counter-sent">
              {invitationsInfo.sent.length}
            </span>
          )}
        </span>
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
