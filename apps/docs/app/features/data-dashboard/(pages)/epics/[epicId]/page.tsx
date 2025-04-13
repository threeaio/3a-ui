import { EpicDetailsContent } from './epic-details-content'

export default async function Page({ params }: { params: Promise<{ epicId: string }> }) {
  const { epicId } = await params

  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full gap-5 px-10 pb-10">
        <EpicDetailsContent epicId={epicId} />
      </div>
    </main>
  )
}
