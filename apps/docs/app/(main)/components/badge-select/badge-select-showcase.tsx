'use client'

import React from 'react'
import { BadgeSelect } from '@3a-ui/ui/badge-select'
import { StyleguideSection } from '@/ui/styleguide-section'
import { StyleguideRender } from '@/ui/styleguide-render'
import StyleguideExplanation from '@/ui/styleguide-explanation'
import { Button } from '@3a-ui/ui/button'

export const BadgeSelectShowcase: React.FC = () => {
  const [status, setStatus] = React.useState('active')
  const [priority, setPriority] = React.useState('medium')

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'archived', label: 'Archived and Stored' },
    { value: 'draft', label: 'Draft' },
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ]

  const typeOptions = [
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'improvement', label: 'Improvement' },
    { value: 'documentation', label: 'Documentation' },
  ]

  const environmentOptions = [
    { value: 'dev', label: 'Development' },
    { value: 'staging', label: 'Staging' },
    { value: 'prod', label: 'Production' },
  ]

  return (
    <StyleguideSection title="Badge Select Component" subline="A compact select component styled as a badge">
      <StyleguideExplanation>
        <p className="text-muted-foreground max-w-2xl leading-tight mb-5">
          The BadgeSelect component combines the visual appearance of a badge with the functionality of a select
          dropdown. It features:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground max-w-2xl leading-tight mb-5 space-y-2">
          <li>
            <span className="text-foreground font-medium">Compact Design:</span> Takes minimal space while maintaining
            functionality
          </li>
          <li>
            <span className="text-foreground font-medium">Smooth Animations:</span> Elegant transitions when changing
            values
          </li>
          <li>
            <span className="text-foreground font-medium">Badge Variants:</span> Supports all badge color variants
          </li>
          <li>
            <span className="text-foreground font-medium">Controlled & Uncontrolled:</span> Can be used in both modes
          </li>
          <li>
            <span className="text-foreground font-medium">Accessibility:</span> Fully keyboard navigable and screen
            reader friendly
          </li>
        </ul>
      </StyleguideExplanation>

      <StyleguideRender label="Basic Usage" classNameContent="flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap">
          <BadgeSelect label="Status" options={statusOptions} value={status} onValueChange={setStatus} />
          <BadgeSelect label="Priority" options={priorityOptions} value={priority} onValueChange={setPriority} />
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setStatus('active')}>
            Set Active
          </Button>
          <Button size="sm" onClick={() => setStatus('inactive')}>
            Set Inactive
          </Button>
          <Button size="sm" onClick={() => setPriority('low')}>
            Set Low Priority
          </Button>
          <Button size="sm" onClick={() => setPriority('high')}>
            Set High Priority
          </Button>
        </div>
      </StyleguideRender>

      <StyleguideRender label="Variants" classNameContent="flex gap-2 flex-wrap">
        <BadgeSelect label="Type" options={typeOptions} defaultValue="bug" variant="default" />
        <BadgeSelect label="Type" options={typeOptions} defaultValue="feature" variant="primary" />
        <BadgeSelect label="Type" options={typeOptions} defaultValue="improvement" variant="secondary" />
        <BadgeSelect label="Type" options={typeOptions} defaultValue="documentation" variant="destructive" />
        <BadgeSelect label="Type" options={typeOptions} defaultValue="bug" variant="outline" />
      </StyleguideRender>

      <StyleguideRender label="With Placeholder" classNameContent="flex gap-2 flex-wrap">
        <BadgeSelect label="Environment" options={environmentOptions} placeholder="Select..." />
        <BadgeSelect label="Environment" options={environmentOptions} placeholder="Choose one" variant="primary" />
      </StyleguideRender>

      <StyleguideRender label="States" classNameContent="flex gap-2 flex-wrap">
        <BadgeSelect label="Status" options={statusOptions} defaultValue="active" disabled />
        <BadgeSelect label="Priority" options={priorityOptions} defaultValue="high" variant="primary" disabled />
      </StyleguideRender>

      <StyleguideRender label="Long Labels" classNameContent="flex gap-2 flex-wrap">
        <BadgeSelect
          label="Environment"
          options={[
            { value: 'dev', label: 'Development Environment' },
            { value: 'staging', label: 'Staging Environment' },
            { value: 'prod', label: 'Production Environment' },
          ]}
          defaultValue="dev"
        />
        <BadgeSelect
          label="Configuration"
          options={[
            { value: 'basic', label: 'Basic Configuration Settings' },
            { value: 'advanced', label: 'Advanced Configuration Settings' },
            { value: 'expert', label: 'Expert Configuration Settings' },
          ]}
          defaultValue="basic"
          variant="primary"
        />
      </StyleguideRender>
    </StyleguideSection>
  )
}

export default BadgeSelectShowcase
