import "./Habit.css";
import { HabitProps } from "../../utils/types";
import { formatDateTime } from "../../utils/miscUtils";
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
      key={habitPlan.id}
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
      </div>
      <div className="habit-plan-container">
        <p className="habit-plan-date-range">
          Current Habit Plan:
          {` ${formatDateTime(habitPlans[0].start_datetime)}-${formatDateTime(
            habitPlans[0].end_datetime
          )}`}
        </p>
        {formattedHabitPlans}
      </div>
    </article>
  );
};

export default Habit;
