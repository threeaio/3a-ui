'use client'

import React from 'react'

interface WorkloadLegendProps {
  className?: string
}

export const WorkloadLegend: React.FC<WorkloadLegendProps> = ({ className = '' }) => {
  return <div className={className}>{/* Workload legend content will go here */}</div>
}

export default WorkloadLegend
