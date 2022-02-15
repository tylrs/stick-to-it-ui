import "./HabitCreation.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createHabit } from "../../utils/apiCalls";
import { blankHabit } from "../../utils/miscConstants";
import { HabitType } from "../../utils/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface HabitCreationProps {
  userId: number;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const HabitCreation: React.FC<HabitCreationProps> = ({
  userId,
  setMessage,
}) => {
  const [habitInfo, setHabitInfo] = useState<HabitType>(blankHabit);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const clearInputs = () => {
    setHabitInfo(blankHabit);
  };

  const handleUserInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError("");
    setHabitInfo((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    setError("");
    setHabitInfo((prevState) => {
      return {
        ...prevState,
        startDate: date,
      };
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    setError("");
    setHabitInfo((prevState) => {
      return {
        ...prevState,
        endDate: date,
      };
    });
  };

  const setMinEndDate = () => {
    let date = new Date();
    if (!habitInfo.startDate) {
      date.setDate(date.getDate() + 1);
      return date;
    }
    date.setDate(habitInfo.startDate.getDate() + 1);
    return date;
  };

  const submitHabitInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const habitData = habitInfo;
    habitData.userId = userId;
    try {
      await createHabit(habitData);
      navigate("/all-habits");
      setMessage("New Habit Created");
    } catch (err: any) {
      console.log("should be catching");
      console.log(err);
      setError(err);
    }
  };

  return (
    <section className="habit-creation-page-container">
      {error && <p className="habit-creation-error">{error}</p>}
      <form className="habit-creation-box" onSubmit={(e) => submitHabitInfo(e)}>
        <h2 className="habit-creation-form-title">Create A Habit</h2>
        <label htmlFor="habit-name-input">Habit Name:</label>
        <input
          required
          id="habit-name-input"
          className="habit-creation-input"
          type="text"
          name="name"
          placeholder="name"
          maxLength={40}
          value={habitInfo.name}
          onChange={(e) => handleUserInput(e)}
        />
        <label htmlFor="description-input"> Description:</label>
        <textarea
          required
          id="description-input"
          className="habit-creation-input"
          name="description"
          placeholder="description"
          maxLength={250}
          value={habitInfo.description}
          onChange={(e) => handleUserInput(e)}
        />
        <label htmlFor="start-date-input"> Start Date:</label>
        <DatePicker
          required
          id="start-date-input"
          className="date-picker"
          placeholderText="start date"
          selected={habitInfo.startDate}
          minDate={new Date()}
          onChange={(date) => handleStartDateChange(date)}
        />
        <label htmlFor="end-date-input"> End Date (inclusive):</label>
        <DatePicker
          required
          id="end-date-input"
          className="date-picker"
          placeholderText="end date inclusive"
          selected={habitInfo.endDate}
          minDate={setMinEndDate()}
          onChange={(date) => handleEndDateChange(date)}
        />
        <button className="submit-habit-creation">Create Habit</button>
      </form>
    </section>
  );
};

export default HabitCreation;
