import { useTasksData } from "@/features/data-dashboard/data-context/tasks-data-provider";
import { Epic } from "@/features/data-dashboard/types/domain";
import { getTagBadgeColor } from "@/features/data-dashboard/utils/domain-to-ui";
import { Badge } from "@3a.solutions/ui/badge"

import { Card, CardContent, CardHeader, CardTitle } from "@3a.solutions/ui/card";
import { useMemo } from "react";


export function EpicTags({ epic }: { epic: Epic }) {

const { getTaskTagsByEpic } = useTasksData()
      // Get task tags
  const taskTags = useMemo(() => getTaskTagsByEpic(epic.id), [epic.id, getTaskTagsByEpic])
  
  return (
    <Card className="">
    <CardHeader>
      <CardTitle className="">Task Tags</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {taskTags.map(({ tag, count }) => (
          <Badge key={tag} variant="outline" className={getTagBadgeColor(tag)}>
            {tag} ({count})
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
  )
}
