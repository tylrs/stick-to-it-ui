export interface UserType {
    id: number,
    name: string,
    username: string,
    email: string, 
}

export interface AccountType {
    name: string, 
    username: string, 
    email: string, 
    password: string, 
    passwordConfirmation: string
}

export interface HabitType {
    id?: number,
    name: string, 
    description: string, 
    startDate: Date | null,
    endDate: Date | null,
    userId?: number
}

export interface HabitsType extends Array<HabitType>{}