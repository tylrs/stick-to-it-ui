export const emptyUser = {
    id: 0,
    name: "",
    username: "",
    email: ""
}

export const blankAccount = {
    name: "", 
    username: "", 
    email: "", 
    password: "", 
    passwordConfirmation: ""
}

export const blankHabit = {
    name: "", 
    description: "", 
    startDate: null,
    endDate: null
}

export const blankLogs = [
    {
        id: 0,
        habit_id: 0,
        scheduled_at: "",
        updated_at: ""
    }
]

export const blankHabits = [
    {
        habitInfo: blankHabit,
        logs: blankLogs
    }
]