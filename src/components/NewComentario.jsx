import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"

export const NewComentario = () => {
    const { dispatch, commentsState } = useContext (AppContext)
    const {currentUser} = commentsState
    const [textComment, setTextComment] = useState('')

    const handleAddComment = () => {
        // Llamamos el reductor para agregar un comentario
        const textCommentTemp = textComment;
        setTextComment ('')
        dispatch({
          type: 'addComment',
          content: textCommentTemp
        })
    }

    return (
      <div className="nuevo-comentario">
          <img src={currentUser.image.png} alt="" />
          <textarea 
              className="texto-comentario"
              name="new-comentario" 
              id="new-comentario" 
              rows="5"
              placeholder="Add a comment..."
              value={textComment}
              onChange={ (e) => setTextComment (e.target.value) }
          >
          </textarea>
          <button
            onClick={handleAddComment}
            disabled={!(textComment.trim().length > 0)}
          >
            Send
          </button>
      </div>
    )
}
