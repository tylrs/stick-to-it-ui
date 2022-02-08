import React, { useEffect, useState } from "react";
import "./HabitLog.css";
import { HabitLogType } from "../../utils/types";
import { daysOfWeek } from "../../utils/miscConstants";

const HabitLog: React.FC<{habitLogInfo: HabitLogType | null, dayNum: number}> = ({ habitLogInfo, dayNum }) => {
    const [completed, setCompleted] = useState(false)
    
    const dayOfWeek = daysOfWeek[dayNum]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? setCompleted(true) : setCompleted(false)
    }

    useEffect(() => {
        if (habitLogInfo?.completed_at) {
            setCompleted(true)
        }
    }, [])

    return (
        <div className="habit-log-container">
            <h4>{dayOfWeek}</h4>
            <input type="checkbox"checked={completed} onChange={(e) => handleChange(e)}/>
        </div>
    )
}

export default HabitLog