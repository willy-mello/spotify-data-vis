import React from 'react'
import { Portrait } from './Portait'
import { leastPopularArtist, mostPopularArtist } from '../utils'

export const Artists = props => {
  const cool = mostPopularArtist(props.artists)
  const uncool = leastPopularArtist(props.artists)
  return (
    <div className='popularity'>
      <Portrait cool={cool} />
      <Portrait uncool={uncool} />

    </div>
  )
}