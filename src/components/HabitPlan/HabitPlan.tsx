import "./HabitPlan.css";
import { HabitPlanProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { generateHabitLogList, getDayOfWeek } from "../../utils/miscUtils";

const HabitPlan: React.FC<HabitPlanProps> = ({
  userId,
  habitPlanInfo,
  habitLogsInfo,
  handleDelete,
  listType,
  setMessage,
}) => {
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

  return (
    <div className="habit-plan">
      <p>
        {belongsToPartner
          ? `${habitPlanInfo.user.name} Progress This Week:`
          : "Your Progress This Week:"}
      </p>
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
      {!belongsToPartner && (
        <button
          className="habit-plan-delete-button"
          onClick={() => {
            handleDelete(habitPlanInfo.id, habitPlanInfo.habit_id);
          }}>
          Delete
        </button>
      )}
      {listType === "all" && (
        <div className="habit-logs-container">{allLogs}</div>
      )}
      {!belongsToPartner && (
        <button
          className="habit-plan-delete-button-mobile"
          onClick={() => {
            handleDelete(habitPlanInfo.habit_id, habitPlanInfo.habit_id);
          }}>
          Delete
        </button>
      )}
      {!belongsToPartner && <div className="habit-plan-divider"></div>}
    </div>
  );
};

export default HabitPlan;
