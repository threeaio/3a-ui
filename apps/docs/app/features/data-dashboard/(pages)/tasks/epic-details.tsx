import { Epic } from '@/features/data-dashboard/types/domain'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@3a.solutions/ui/accordion'
import { Button } from '@3a.solutions/ui/button'

interface EpicDetailsProps {
  epic: Epic
  onExpandChange: (isExpanded: boolean) => void
}

export function EpicDetails({ epic, onExpandChange }: EpicDetailsProps) {
  return (
    <Accordion type="single" collapsible onValueChange={(value) => onExpandChange(!!value)}>
      <AccordionItem value="details">
        <div className="flex py-5">
          <Button variant="link" size="sm" asChild>
            <AccordionTrigger>Epic Details</AccordionTrigger>
          </Button>
        </div>
        <AccordionContent>
          <div className="space-y-4 py-2">
            <div>
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-muted-foreground">{epic.description}</p>
            </div>
            {epic.budget && (
              <div>
                <h4 className="font-medium">Budget</h4>
                <p className="text-sm">${epic.budget.toLocaleString('de-DE')}</p>
              </div>
            )}
            <div>
              <h4 className="font-medium">Status</h4>
              <p className="text-sm">{epic.status}</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
