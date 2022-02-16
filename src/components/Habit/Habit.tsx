import "./Habit.css";
import { HabitLogType, HabitProps, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { generateHabitLogList, getDayOfWeek } from "../../utils/miscUtils";

const Habit: React.FC<HabitProps> = ({
  habitInfo,
  habitLogsInfo,
  handleDelete,
  listType,
  setMessage,
}) => {
  let allLogs;

  if (listType === "all") {
    allLogs = generateHabitLogList({
      habitInfo,
      habitLogsInfo,
      listType,
      setMessage,
    });
  }

  return (
    <article className={`habit-container-${listType}`}>
      <div className="habit-info-container">
        <h3 className="habit-name">{habitInfo.name}</h3>
        <p className="habit-description">{habitInfo.description}</p>
        {listType !== "all" && (
          <HabitLog
            habitLogInfo={habitLogsInfo[0]}
            userId={habitInfo.userId}
            dayNum={getDayOfWeek(habitLogsInfo[0].scheduled_at)}
            listType={listType}
            setMessage={setMessage}
          />
        )}
        <button
          className="habit-delete-button"
          onClick={() => {
            handleDelete(habitInfo.id);
          }}>
          Delete
        </button>
      </div>
      {listType === "all" && (
        <div className="habit-logs-container">{allLogs}</div>
      )}
    </article>
  );
};

export default Habit;
