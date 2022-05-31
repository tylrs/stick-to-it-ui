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
      />
    )
  );

  return (
    <div className="notification-modal-container">
      <h2 className="notification-header-title">Invitations</h2>
      <div className="notification-nav-button-container">
        <button
          className="notification-nav-button"
          onClick={() => setDisplayedInvitation("received")}>
          Received
        </button>
        <button
          className="notification-nav-button"
          onClick={() => setDisplayedInvitation("sent")}>
          Sent
        </button>
      </div>
      <div className="invitation-container">{invitations}</div>
    </div>
  );
};

export default NotificationModal;
