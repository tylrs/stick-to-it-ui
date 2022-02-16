import "./Habit.css";
import { HabitLogType, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";
import { getDayOfWeek } from "../../utils/miscUtils";

interface HabitProps {
  habitInfo: HabitType;
  habitLogsInfo: HabitLogType[];
  handleDelete: any;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Habit: React.FC<HabitProps> = ({
  habitInfo,
  habitLogsInfo,
  handleDelete,
  listType,
  setMessage,
}) => {
  let allLogs;

  if (listType === "all") {
    const componentsOfWeek = [...Array(7)].map((item, index) => (
      <HabitLog
        habitLogInfo={null}
        userId={0}
        dayNum={index}
        key={index}
        listType={listType}
        setMessage={setMessage}
      />
    ));
    allLogs = habitLogsInfo.reduce((acc, currentLog) => {
      const dayNum = getDayOfWeek(currentLog.scheduled_at);
      acc[dayNum] = (
        <HabitLog
          habitLogInfo={currentLog}
          userId={habitInfo.userId}
          dayNum={dayNum}
          key={dayNum}
          listType={listType}
          setMessage={setMessage}
        />
      );
      return acc;
    }, componentsOfWeek);
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
