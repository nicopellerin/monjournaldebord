import React from 'react'
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory'

const data = [
  { quarter: 1, posts: 12 },
  { quarter: 2, posts: 21 },
  { quarter: 3, posts: 12 },
  { quarter: 4, posts: 32 },
]

const baseLabelStyles = {
  fontFamily: 'sansSerif',
  fontSize: 14,
  letterSpacing: 'normal',
  padding: 10,
  fill: 'red',
  stroke: 'transparent',
}

export const StatsChartJournals = () => {
  return (
    <VictoryChart
      domainPadding={20}
      theme={{
        area: {
          style: {
            data: {
              fill: 'red',
            },
            labels: baseLabelStyles,
          },
        },
        bar: { style: { data: { fill: 'var(--primaryColor)' } } },
      }}
    >
      <VictoryAxis
        tickValues={[1, 2, 3, 4]}
        tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x => x}
      />
      <VictoryBar data={data} x="quarter" y="posts" />
    </VictoryChart>
  )
}
