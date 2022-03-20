import { useEffect, useState } from "react";
import "./HabitLog.css";
import { HabitLogType } from "../../utils/types";
import { daysOfWeek, daysOfWeekLong } from "../../utils/miscConstants";
import { updateHabitLog } from "../../utils/apiCalls";

interface HabitLogProps {
  habitLogInfo: HabitLogType | null;
  userId: number | undefined;
  dayNum: number;
  belongsToPartner: boolean;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const HabitLog: React.FC<HabitLogProps> = ({
  habitLogInfo,
  userId,
  dayNum,
  belongsToPartner,
  listType,
  setMessage,
}) => {
  const [completed, setCompleted] = useState(false);

  const dayOfWeek =
    listType === "today" ? daysOfWeekLong[dayNum] : daysOfWeek[dayNum];

  let isToday;

  if (dayNum === new Date().getDay() && listType === "all")
    isToday = "today-marker";

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    try {
      const habitLog = await updateHabitLog(
        userId,
        habitLogInfo?.habit_plan_id,
        habitLogInfo?.id
      );
      if (!habitLog.completed_at) {
        setMessage("Habit Marked Incomplete");
        setCompleted(false);
      } else {
        setMessage("Habit Marked Complete");
        setCompleted(true);
      }
    } catch (err: any) {
      setMessage(`Habit Could Not Be Updated: ${err.errors}`);
    }
  };

  useEffect(() => {
    if (habitLogInfo?.completed_at) {
      setCompleted(true);
    }
  }, [habitLogInfo?.completed_at]);

  const partnerClass = belongsToPartner ? "partner" : "";
  const noInfoClass = !habitLogInfo ? "not-scheduled" : "";
  const classes = `log-checkbox ${partnerClass} ${noInfoClass}`;

  return (
    <div className={`habit-log-container ${isToday}`}>
      <h4 className="day-of-week-label">{dayOfWeek}</h4>
      <label className={classes}>
        <input
          className="actual-checkbox"
          type="checkbox"
          disabled={belongsToPartner || !habitLogInfo}
          checked={completed}
          onChange={e => handleChange(e)}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default HabitLog;
