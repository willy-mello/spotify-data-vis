import React from 'react'

export const Artists = props => {
  const artists = props.artists
  return (
    <div>
      <ul>
        {artists.map(elem => {
          return (
            <li>
              <span>{elem.name}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}