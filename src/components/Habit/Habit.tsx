import "./Habit.css";
import { HabitProps } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import {
  formatDateTime,
  generateHabitLogList,
  getDayOfWeek,
} from "../../utils/miscUtils";
import HabitPlan from "../HabitPlan/HabitPlan";

const Habit: React.FC<HabitProps> = ({
  userId,
  habitInfo,
  habitPlans,
  handleDelete,
  listType,
  setMessage,
}) => {
  const formattedHabitPlans = habitPlans.map(habitPlan => (
    <HabitPlan
      userId={userId}
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
        <p>
          Date Range of Current Habit Plan:{" "}
          {`${formatDateTime(habitPlans[0].start_datetime)}-${formatDateTime(
            habitPlans[0].end_datetime
          )}`}
        </p>
      </div>
      <div className="habit-plan-container">{formattedHabitPlans}</div>
    </article>
  );
};

export default Habit;
