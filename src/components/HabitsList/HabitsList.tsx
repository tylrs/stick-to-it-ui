import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteHabitPlan,
  getWeekHabitAndPartnerPlans,
  getTodayHabitPlans,
} from "../../utils/apiCalls";
import "./HabitsList.css";
import { HabitPlanType, NotificationState } from "../../utils/types";
import Habit from "../Habit/Habit";
import { getLastSunday, getToday } from "../../utils/miscUtils";
import NotificationModal from "../NotificationModal/NotificationModal";

interface HabitsListProps {
  userId: number;
  name: string;
  listType: "all" | "today";
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  invitationsInfo: NotificationState;
}

const HabitsList: React.FC<HabitsListProps> = ({
  userId,
  name,
  listType,
  setMessage,
  showModal,
  setShowModal,
  invitationsInfo,
}) => {
  const [allHabitPlans, setAllHabitPlans] = useState<HabitPlanType[]>([]);
  const [currentListType, setListType] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (habitPlanId: number, habit_id: number) => {
    try {
      await deleteHabitPlan(userId, habitPlanId);
      let updatedHabitPlans = allHabitPlans.filter(
        habitPlan => habitPlan.habit_id !== habit_id
      );
      setAllHabitPlans(updatedHabitPlans);
    } catch (error) {
      setMessage("Habit Plan Could Not Be Deleted");
    }
  };

  const sortedHabitPlans = allHabitPlans.reduce((acc, currentPlan) => {
    if (!acc[currentPlan.habit_id]) {
      acc[currentPlan.habit_id] = [currentPlan];
    } else {
      acc[currentPlan.habit_id].push(currentPlan);
    }
    return acc;
  }, {} as any);

  const formattedHabits = Object.keys(sortedHabitPlans).map(habitId => {
    const groupedHabitPlans = sortedHabitPlans[habitId];
    if (groupedHabitPlans[0].user_id !== userId) {
      groupedHabitPlans.reverse();
    }
    return (
      <Habit
        userId={userId}
        habitInfo={groupedHabitPlans[0].habit}
        habitPlans={groupedHabitPlans}
        key={groupedHabitPlans[0].habit_id}
        handleDelete={handleDelete}
        listType={listType}
        setMessage={setMessage}
      />
    );
  });

  const fetchHabitPlans = async () => {
    try {
      const data =
        listType === "all"
          ? await getWeekHabitAndPartnerPlans(userId)
          : await getTodayHabitPlans(userId);
      if (data.length) {
        setAllHabitPlans(data);
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
    if (!allHabitPlans.length && userId) {
      fetchHabitPlans();
    } else if (listType !== currentListType) {
      setListType(listType);
      fetchHabitPlans();
    }
  });

  return (
    <section className="habits-list-page-container">
      <NotificationModal
        setShowModal={setShowModal}
        userId={userId}
        showModal={showModal}
        setMessage={setMessage}
        invitationsInfo={invitationsInfo}
      />
      {error && <p className="habits-list-error">{error}</p>}
      {listType === "all" ? (
        <div className="habits-list-title">
          <div className="greeting-wrapper">
            <h2 className="greeting-message">Welcome: {name}</h2>
          </div>
          <h3 className="list-type-label">Week Starting On:</h3>
          <p className="list-date">{getLastSunday()}</p>
        </div>
      ) : (
        <div className="habits-list-title">
          <div className="greeting-wrapper">
            <h2 className="greeting-message">Welcome: {name}</h2>
          </div>
          <h3 className="list-type-label">Habits Today:</h3>
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
