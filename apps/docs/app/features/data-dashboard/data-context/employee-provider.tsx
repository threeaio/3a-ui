'use client'

import { createContext, useContext, useMemo, ReactNode } from 'react'
import { Employee, EmployeeSkill, ExpertiseDomain } from '../types/domain'

// Define the shape of our context
interface EmployeeContextType {
  // Employee data
  employees: Employee[]
  skills: EmployeeSkill[]

  // Employee selectors
  getEmployeeById: (id: string) => Employee | undefined
  getEmployeesByIds: (ids: string[]) => Employee[]
  getEmployeesBySkill: (skillId: string) => Employee[]
  getEmployeesByExpertiseDomain: (domain: ExpertiseDomain) => Employee[]
  getExpertiseDomainsByEmployeeId: (employeeId: string) => ExpertiseDomain[]
}

// Create the context with default undefined value
const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined)

// Provider component
export function EmployeeProvider({
  children,
  employees,
  employeeSkills,
}: {
  children: ReactNode
  employees: Employee[]
  employeeSkills: EmployeeSkill[]
}) {
  // Create memoized selectors
  const selectors = useMemo(() => {
    // Employee-based selectors
    const getEmployeeById = (id: string) => employees.find((emp) => emp.id === id)

    const getEmployeesByIds = (ids: string[]) => employees.filter((emp) => ids && ids.includes(emp.id))

    const getEmployeesBySkill = (skillId: string) =>
      employees.filter((emp: Employee) => emp.skills.some((skill: EmployeeSkill) => skill.id === skillId))

    const getEmployeesByExpertiseDomain = (domain: ExpertiseDomain) =>
      employees.filter((emp: Employee) =>
        emp.skills.some((skill: EmployeeSkill) => skill.relatedExpertiseDomains.includes(domain)),
      )

    const getExpertiseDomainsByEmployeeId = (employeeId: string) => {
      const employee = getEmployeeById(employeeId)
      return (
        employee?.skills
          .map((skill: EmployeeSkill) => skill.relatedExpertiseDomains)
          .flat()
          .reduce((acc: ExpertiseDomain[], domain: ExpertiseDomain) => {
            if (!acc.includes(domain)) {
              acc.push(domain)
            }
            return acc
          }, [] as ExpertiseDomain[]) || []
      )
    }

    return {
      getEmployeeById,
      getEmployeesByIds,
      getEmployeesBySkill,
      getEmployeesByExpertiseDomain,
      getExpertiseDomainsByEmployeeId,
    }
  }, [employees])

  // Create the context value
  const contextValue = useMemo(
    () => ({
      // Employee data
      employees,
      skills: employeeSkills,

      // Selectors
      ...selectors,
    }),
    [employees, employeeSkills, selectors],
  )

  return <EmployeeContext.Provider value={contextValue}>{children}</EmployeeContext.Provider>
}

// Custom hook to use the context
export function useEmployeeContext() {
  const context = useContext(EmployeeContext)
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider')
  }
  return context
}
