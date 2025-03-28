import React from 'react'
import { ChartData } from '../../types'

interface SimpleBarChartProps {
  data: ChartData[]
  colors?: string[]
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, colors = ['#8884d8'] }) => {
  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <div className="w-full h-50">
      <div className="flex  h-40 gap-4 mt-5">
        {data.map((item, index) => {
          // Ensure height is at least 2% to make all bars visible
          const height = maxValue > 0 ? Math.max(2, (item.value / maxValue) * 100) : 2
          return (
            <div key={index} className="flex-1 flex flex-col justify-end items-center h-full">
              <div
                className="w-2 rounded-t-md transition-all duration-500 ease-in-out"
                style={{
                  height: `${height}%`,
                  backgroundColor: colors[index % colors.length],
                }}
              />
              <div className="text-xs text-muted-foreground mt-2 text-center truncate w-full">{item.name}</div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center mt-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mx-1 my-1">
            <div className="w-3 h-3 rounded-sm mr-1" style={{ backgroundColor: colors[index % colors.length] }} />
            <span className="text-xs text-muted-foreground">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimpleBarChart
