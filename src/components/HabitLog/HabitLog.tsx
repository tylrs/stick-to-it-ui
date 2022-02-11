import React, { useEffect, useState } from "react";
import "./HabitLog.css";
import { HabitLogType } from "../../utils/types";
import { daysOfWeek, daysOfWeekLong } from "../../utils/miscConstants";
import { updateHabitLog } from "../../utils/apiCalls";

interface HabitLogProps {
    habitLogInfo: HabitLogType | null, 
    userId: number | undefined, 
    dayNum: number, 
    type: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

const HabitLog: React.FC<HabitLogProps> = ({ habitLogInfo, userId, dayNum, type, setMessage }) => {
    const [completed, setCompleted] = useState(false)

    const dayOfWeek = type === "today" ? daysOfWeekLong[dayNum] : daysOfWeek[dayNum] 

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            await updateHabitLog(userId, habitLogInfo?.habit_id, habitLogInfo?.id)
            e.target.checked ? setCompleted(false) : setCompleted(true)
            setMessage("Habit Updated")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (habitLogInfo?.completed_at) {
            setCompleted(true)
        }
    }, [])

    return (
        <div className="habit-log-container">
            <h4 className="day-of-week-label">{dayOfWeek}</h4>
            <input className="log-checkbox" type="checkbox" disabled={!habitLogInfo} checked={completed} onChange={(e) => handleChange(e)}/>
        </div>
    )
}

export default HabitLog