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
      </div>
      <div className="habit-plan-container">{formattedHabitPlans}</div>
    </article>
  );
};

export default Habit;
