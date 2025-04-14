'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@3a.solutions/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@3a.solutions/ui/forms'
import { useBaseDataContext } from '@/features/data-dashboard/data-context/base-data-provider'

export function TeamHeader() {
  const { expertiseDomains } = useBaseDataContext()

  return (
    <div className="h-80 pt-10 flex flex-col px-10">
      <h1 className="font-semibold mb-5">Team Overview</h1>
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="font-normal">Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-5 py-5">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {expertiseDomains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
