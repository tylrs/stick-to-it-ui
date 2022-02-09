import React, { useEffect, useState } from "react";
import "./Habit.css";
import { HabitLogType, HabitType } from "../../utils/types";
import HabitLog from "../HabitLog/HabitLog";

const Habit: React.FC<{habitInfo: HabitType, habitLogsInfo: HabitLogType[], handleDelete: any, type: string}> = ({ habitInfo, habitLogsInfo, handleDelete, type }) => {    
    let allLogs, log;

    if (type === "all") {
        const componentsOfWeek = [...Array(7)]
                             .map((item, index) => 
                                 <HabitLog 
                                 habitLogInfo={null} 
                                 userId={0} 
                                 dayNum={index} 
                                 key={index}
                             />)
        allLogs = habitLogsInfo.reduce((acc, currentLog) => {
            const dayNum = new Date(currentLog.scheduled_at.replaceAll("-", "/").slice(0, 10)).getDay()
            acc[dayNum] = <HabitLog habitLogInfo={currentLog} userId={habitInfo.userId} dayNum={dayNum} key={dayNum}/>
            return acc
        }, componentsOfWeek)
    } else {
        const dayNum = new Date(habitLogsInfo[0].scheduled_at.replaceAll("-", "/").slice(0, 10)).getDay()
        log = <HabitLog habitLogInfo={habitLogsInfo[0]} userId={habitInfo.userId} dayNum={dayNum} key={dayNum}/>
    }

    return (
        <article className={`habit-container-${type}`}>
            <div className="habit-info-container">
                <h3 className="habit-name">{habitInfo.name}</h3>
                <p className="habit-description">{habitInfo.description}</p>
                {type !== "all" && log}
                <button className="habit-delete-button"onClick={() => {handleDelete(habitInfo.id)}}>Delete</button>
            </div>
            {type === "all" && <div className="habit-logs-container">{allLogs}</div>}         
        </article>
    )
}

export default Habit