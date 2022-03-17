import "./HabitPlan.css";
import { HabitPlanProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { generateHabitLogList, getDayOfWeek } from "../../utils/miscUtils";

const HabitPlan: React.FC<HabitPlanProps> = ({
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
    <article className={`habit-plan-container-${listType}`}>
      <div className="habit-plan-info-container">
        <p>{`${habitPlanInfo.start_datetime}-${habitPlanInfo.end_datetime}`}</p>
        {/* <h3 className="habit-name">{habitInfo.habit.name}</h3>
        <p className="habit-description">{habitInfo.habit.description}</p> */}
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
      </div>
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
    </article>
  );
};

export default HabitPlan;
