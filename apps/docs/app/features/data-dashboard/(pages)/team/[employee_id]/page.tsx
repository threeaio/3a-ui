import { EmployeeDetailsContent } from './employee-details-content'

export default async function Page({ params }: { params: Promise<{ employee_id: string }> }) {
  const { employee_id } = await params

  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full gap-5 px-10 pb-10">
        <EmployeeDetailsContent employeeId={employee_id} />
      </div>
    </main>
  )
}
