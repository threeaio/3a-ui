import { EpicStatus } from "./status"
export type Epic = {
    id: string
    projectId: string
    name: string
    description: string
    status: EpicStatus
    budget: number
    assignedEmployeeIds: string[]
}