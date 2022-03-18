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
    console.log(habitPlanInfo);
    allLogs = generateHabitLogList({
      habitPlanInfo,
      habitLogsInfo,
      listType,
      setMessage,
    });
  }

  return (
    <div className="habit-plan">
      <p>{habitPlanInfo.user.name}</p>
      <p>{`${formatDateTime(habitPlanInfo.start_datetime)}-${formatDateTime(
        habitPlanInfo.end_datetime
      )}`}</p>
      {listType !== "all" && (
        <HabitLog
          habitLogInfo={habitLogsInfo[0]}
          userId={habitPlanInfo.userId}
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
