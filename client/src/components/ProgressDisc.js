import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { genreFinder } from '../utils'

ReactChartkick.addAdapter(Chart)

export const ProgressDisc = props => {
  const quality = props.quality
  const fillAmount = []
  console.log(quality, 'quality')
  if (quality[0][0] === "loudness") {
    let newVal = Math.round((1 / ((Math.abs(quality[1])) / 1000)) * 10)
    quality.pop()
    quality.push(newVal)

  }

  const whitespaceVal = 100 - quality[1]
  fillAmount.push(['empty gauge', whitespaceVal])
  fillAmount.push(quality)
  console.log(fillAmount, 'fillamount')


  return (

    <PieChart
      colors={["#ECF0F1", "#2ECC71"]}
      donut={true}
      legend={false}
      responsive={true}
      data={fillAmount}

    />

  )
}