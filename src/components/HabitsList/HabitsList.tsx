import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteHabit,
  getAllHabits,
  getTodayHabits,
} from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitsType } from "../../utils/types";
import Habit from "../Habit/Habit";
import { getLastSunday, getToday } from "../../utils/miscUtils";

interface HabitsListProps {
  userId: number;
  name: string;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const HabitsList: React.FC<HabitsListProps> = ({
  userId,
  name,
  listType,
  setMessage,
}) => {
  const [allHabits, setAllHabits] = useState<HabitsType[]>([]);
  const [currentListType, setListType] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (habitId: number) => {
    try {
      await deleteHabit(userId, habitId);
      let updatedHabits = allHabits.filter(habit => habit.id !== habitId);
      setAllHabits(updatedHabits);
    } catch (error) {
      setMessage("Habit Could Not Be Deleted");
    }
  };

  const formattedHabits = allHabits.map(habit => (
    <Habit
      habitInfo={habit}
      key={habit.id}
      habitLogsInfo={habit.habit_logs}
      handleDelete={handleDelete}
      listType={listType}
      setMessage={setMessage}
    />
  ));

  const fetchHabits = async () => {
    try {
      const data =
        listType === "all"
          ? await getAllHabits(userId)
          : await getTodayHabits(userId);
      if (data.length) {
        setAllHabits(data);
      }
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors);
      } else {
        setError(err);
      }
    }
  };

  useEffect(() => {
    if (!allHabits.length && userId) {
      fetchHabits();
    } else if (listType !== currentListType) {
      setListType(listType);
      fetchHabits();
    }
  });

  return (
    <section className="habits-list-page-container">
      {error && <p className="habits-list-error">{error}</p>}
      {listType === "all" ? (
        <div className="habits-list-title">
          <div className="greeting-wrapper">
            <h2 className="greeting-message">Welcome: {name}</h2>
          </div>
          <h3>Week Starting On:</h3>
          <p className="list-date">{getLastSunday()}</p>
        </div>
      ) : (
        <div className="habits-list-title">
          <div className="greeting-wrapper">
            <h2 className="greeting-message">Welcome: {name}</h2>
          </div>
          <h3>Habits Today:</h3>
          <p className="list-date">{getToday()}</p>
        </div>
      )}
      {formattedHabits.length ? formattedHabits : <p>No Habits Created Yet</p>}
      <Link className="create-new-habit-button" to="/create-habit">
        Create New Habit
      </Link>
    </section>
  );
};

export default HabitsList;
