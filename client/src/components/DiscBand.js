import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import { genreFinder, reduceTopTracksData } from '../utils'
import { ProgressDisc } from './ProgressDisc'

ReactChartkick.addAdapter(Chart)

export const DiscBand = props => {
  const qualities = props.qualities



  qualities.map(elem => <ProgressDisc quality={elem} />)
}