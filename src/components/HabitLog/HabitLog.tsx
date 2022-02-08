import React, { useEffect, useState } from "react";
import "./HabitLog.css";
import { HabitLogType } from "../../utils/types";
import { daysOfWeek } from "../../utils/miscConstants";
import { updateHabitLog } from "../../utils/apiCalls";

const HabitLog: React.FC<{habitLogInfo: HabitLogType | null, userId: number | undefined, dayNum: number}> = ({ habitLogInfo, userId, dayNum }) => {
    const [completed, setCompleted] = useState(false)

    const dayOfWeek = daysOfWeek[dayNum]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? setCompleted(true) : setCompleted(false)
        updateHabitLog(userId, habitLogInfo?.habit_id, habitLogInfo?.id)
    }

    useEffect(() => {
        if (habitLogInfo?.completed_at) {
            setCompleted(true)
        }
    }, [])

    return (
        <div className="habit-log-container">
            <h4 className="day-of-week-label">{dayOfWeek}</h4>
            <input type="checkbox" checked={completed} onChange={(e) => handleChange(e)}/>
        </div>
    )
}

export default HabitLog