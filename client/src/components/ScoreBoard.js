import React from 'react'

export const ScoreBoard = props => {
  const score = props.popularity
  return (
    <div className="scoreboard">
      <span>Average Popularity of your Top 50 Artists</span>
      <p className="score">{score}</p>
      <span>placeholder</span>
    </div>
  )
}