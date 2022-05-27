import "./NotificationModal.css";
import { NotificationModalProps } from "../../utils/types";
import { useEffect, useState } from "react";
import {
  getReceivedInvitations,
  getSentInvitations,
} from "../../utils/apiCalls";

const NotificationModal: React.FC<NotificationModalProps> = ({
  setShowModal,
  showModal,
  userId,
}) => {
  const [invitationsInfo, setInvitationsInfo] = useState({
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
      console.log(receivedResponse, sentResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (showModal) {
      getInvitations();
    }
  }, [displayedInvitation]);

  if (!showModal) return null;

  const invitations = invitationsInfo[displayedInvitation].map(
    invitationInfo => {
      <Invitation type="displayedInvitation" invitationInfo={invitationInfo} />;
    }
  );

  return (
    <div className="notification-modal-container">
      <h2>Invitations</h2>
      <div className="invitations-header-container">
        <button onClick={() => setDisplayedInvitation("received")}>
          Received
        </button>
        <button onClick={() => setDisplayedInvitation("sent")}>Sent</button>
      </div>
      <div className="invitation-container"></div>
    </div>
  );
};

export default NotificationModal;
