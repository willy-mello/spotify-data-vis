import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { postiveExplainations } from '../utils'

ReactChartkick.addAdapter(Chart)

export const ProgressDisc = props => {
  const newTitle = postiveExplainations[props.idx]
  const quality = props.quality
  const fillAmount = []
  const whitespaceVal = 100 - quality[1]
  fillAmount.push(['empty gauge', whitespaceVal])
  fillAmount.push(quality)
  if (quality[0][0] === "loudness") {
    let newVal = Math.round(((Math.abs(quality[1])) / 10))
    quality.pop()
    quality.push(100 - newVal)
    fillAmount.pop()
    fillAmount.pop()
    fillAmount.push(['empty gauge', newVal])
    fillAmount.push(quality)
  }

  return (

    <PieChart
      colors={["#ECF0F1", "#2ECC71"]}
      donut={true}
      legend={false}
      responsive={true}
      title={newTitle}
      data={fillAmount}
      fontsize={10}

    />

  )
}