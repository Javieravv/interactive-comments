import React from 'react'

export const ViewScore = ( {valueScore, handleClickScoreAdd, handleClickScoreDel}) => {
  return (
    <article className="puntaje">
        <button
            onClick={ handleClickScoreAdd }
        >+</button>
        <p>{valueScore}</p>
        <button
            onClick={handleClickScoreDel }
        >-</button>
    </article>
  )
}
