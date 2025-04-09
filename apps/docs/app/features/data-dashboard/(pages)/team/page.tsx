'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@3a-ui/ui/card'

function TeamPageContent() {
  return (
    <main className="flex-1 bg-background">
      <div className="flex flex-col h-full px-5 pt-10 gap-5 pb-5">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="font-normal my-5">Team</CardTitle>
          </CardHeader>
          <CardContent>{/* Team content will go here */}</CardContent>
        </Card>
      </div>
    </main>
  )
}

export default function TeamPage() {
  return <TeamPageContent />
}
