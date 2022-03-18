import "./HabitPlan.css";
import { HabitPlanProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import {
  formatDateTime,
  generateHabitLogList,
  getDayOfWeek,
} from "../../utils/miscUtils";

const HabitPlan: React.FC<HabitPlanProps> = ({
  userId,
  habitPlanInfo,
  habitLogsInfo,
  handleDelete,
  listType,
  setMessage,
}) => {
  let allLogs;

  if (listType === "all") {
    allLogs = generateHabitLogList({
      habitPlanInfo,
      habitLogsInfo,
      listType,
      setMessage,
    });
  }

  return (
    <div className="habit-plan">
      <p>
        {userId === habitPlanInfo.user_id
          ? "Your Habit Plan Progress:"
          : `${habitPlanInfo.user.name} Habit Plan Progress:`}
      </p>
      {listType !== "all" && (
        <HabitLog
          habitLogInfo={habitLogsInfo[0]}
          userId={habitPlanInfo.user_id}
          dayNum={getDayOfWeek(habitLogsInfo[0].scheduled_at)}
          listType={listType}
          setMessage={setMessage}
        />
      )}
      {/* <button
          className="habit-delete-button"
          onClick={() => {
            handleDelete(habitInfo.habit_id);
          }}>
          Delete
        </button> */}
      {listType === "all" && (
        <div className="habit-logs-container">{allLogs}</div>
      )}
      {/* <button
        className="habit-delete-button-mobile"
        onClick={() => {
          handleDelete(habitInfo.habit_id);
        }}>
        Delete
      </button> */}
    </div>
  );
};

export default HabitPlan;
