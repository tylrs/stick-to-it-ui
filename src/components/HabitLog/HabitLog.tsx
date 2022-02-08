import React, { useEffect, useState } from "react";
import "./HabitLog.css";
import { HabitLogType } from "../../utils/types";

const HabitLog: React.FC<{habitLogInfo: HabitLogType}> = ({ habitLogInfo }) => {
    return (
        <div className="habit-log-container">
            <h4>{habitLogInfo.scheduled_at}</h4>
        </div>
    )
}

export default HabitLog