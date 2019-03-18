import React from 'react'
import Portrait from './Portait'

export const Summary = props => {
  console.log('recommended', props.recommended)
  if (props.recommended.length > 0) {
    return (
      props.recommended.map((elem) => {
        return (
          <div>
            <p>most popular artist</p>
            <img className='portrait' alt={''} src={elem.images[2].url} />
            <p>{elem.name}</p>
            <p>Popularity {elem.popularity}</p>

          </div>
        )
      })
    )
  }

  return (
    <div className="Summary">
      <h3>Recommendations?</h3>

      <button onClick={() => props.getReccs()}>get recommended tracks</button>

    </div>
  )
}