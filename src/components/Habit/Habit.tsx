import "./Habit.css";
import { HabitProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { generateHabitLogList, getDayOfWeek } from "../../utils/miscUtils";
import HabitPlan from "../HabitPlan/HabitPlan";

const Habit: React.FC<HabitProps> = ({
  habitInfo,
  habitPlans,
  handleDelete,
  listType,
  setMessage,
}) => {
  let allLogs;

  // if (listType === "all") {
  //   allLogs = generateHabitLogList({
  //     habitPlanInfo,
  //     habitLogsInfo,
  //     listType,
  //     setMessage,
  //   });
  // }
  const formattedHabitPlans = habitPlans.map(habitPlan => (
    <HabitPlan
      habitPlanInfo={habitPlan}
      habitLogsInfo={habitPlan.habit_logs}
      handleDelete={handleDelete}
      listType={listType}
      setMessage={setMessage}
    />
  ));

  return (
    <article className={`habit-container-${listType}`}>
      <div className="habit-info-container">
        <h3 className="habit-name">{habitInfo.name}</h3>
        <p className="habit-description">{habitInfo.description}</p>
        {/* {listType !== "all" && (
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
            handleDelete(habitInfo.habit_id);
          }}>
          Delete
        </button> */}
      </div>
      {/* {listType === "all" && (
        <div className="habit-logs-container">{allLogs}</div>
      )}
      <button
        className="habit-delete-button-mobile"
        onClick={() => {
          handleDelete(habitInfo.habit_id);
        }}>
        Delete
      </button> */}
      {formattedHabitPlans}
    </article>
  );
};

export default Habit;
