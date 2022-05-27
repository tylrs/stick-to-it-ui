import "./NotificationModal.css";
import { NotificationModalProps } from "../../utils/types";
import { useState } from "react";

const NotificationModal: React.FC<NotificationModalProps> = ({
  setShowModal,
  showModal,
}) => {
  const [receivedInvitations, setReceivedInvitations] = useState([]);
  const [sentInvitations, setSentInvitations] = useState([]);
  const [displayedInvitation, setDisplayedInvitation] = useState<
    "received" | "sent"
  >("received");

  if (!showModal) return null;

  return (
    <div className="notification-modal-container">
      <h2>Invitations</h2>
      <div className="invitations-header-container">
        <button>Received</button>
        <button>Sent</button>
      </div>
      <div className="invitation-container"></div>
    </div>
  );
};

export default NotificationModal;
