import "./HabitPlan.css";
import { HabitPlanProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { generateHabitLogList, getDayOfWeek } from "../../utils/miscUtils";
import { useState } from "react";
import InviteModal from "../InviteModal/InviteModal";

const HabitPlan: React.FC<HabitPlanProps> = ({
  userId,
  habitPlanInfo,
  habitLogsInfo,
  handleDelete,
  listType,
  setMessage,
}) => {
  let [showInviteModal, setShowInviteModal] = useState(false);
  let allLogs;
  const belongsToPartner = userId !== habitPlanInfo.user_id ? true : false;

  if (listType === "all") {
    allLogs = generateHabitLogList({
      habitPlanInfo,
      habitLogsInfo,
      belongsToPartner,
      listType,
      setMessage,
    });
  }

  const todayHeader = (
    <p className="habit-log-header">
      {belongsToPartner ? `${habitPlanInfo.user.name}:` : "You:"}
    </p>
  );

  const weekHeader = (
    <p className="habit-log-header">
      {belongsToPartner
        ? `${habitPlanInfo.user.name} Progress This Week:`
        : "Your Progress This Week:"}
    </p>
  );

  return (
    <div className="habit-plan-container">
      {belongsToPartner && <div className="habit-plan-divider"></div>}
      <div className="habit-log-header-container">
        {listType === "all" ? weekHeader : todayHeader}
        {!belongsToPartner && (
          <span
            className="habit-plan-delete-button"
            onClick={() => {
              handleDelete(habitPlanInfo.id, habitPlanInfo.habit_id);
            }}>
            &times;
          </span>
        )}
      </div>
      {listType !== "all" && (
        <HabitLog
          habitLogInfo={habitLogsInfo[0]}
          userId={habitPlanInfo.user_id}
          belongsToPartner={belongsToPartner}
          dayNum={getDayOfWeek(habitLogsInfo[0].scheduled_at)}
          listType={listType}
          setMessage={setMessage}
        />
      )}
      {listType === "all" && (
        <div className="habit-logs-container">{allLogs}</div>
      )}
      <InviteModal
        habitPlanInfo={habitPlanInfo}
        userId={userId}
        showInviteModal={showInviteModal}
        setShowInviteModal={setShowInviteModal}
        setMessage={setMessage}
      />
      {!belongsToPartner && !showInviteModal && (
        <div className="invite-button-container">
          <button
            className="invite-button"
            onClick={() => {
              setShowInviteModal(true);
            }}>
            Invite
          </button>
        </div>
      )}
    </div>
  );
};

export default HabitPlan;
