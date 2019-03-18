import React from 'react'

export const ScoreBoard = props => {
  const score = props.popularity
  return (
    <div className="scoreboard">
      <p>Average Popularity of your Top 50 Artists</p>
      <p className="score">{score}</p>

    </div>
  )
}