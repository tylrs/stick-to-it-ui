import { InviteModalProps } from "../../utils/types";

const InviteModal: React.FC<InviteModalProps> = ({ showInviteModal }) => {
  if (!showInviteModal) return null;
  return <p>Hello I'm a modal</p>;
};

export default InviteModal;
