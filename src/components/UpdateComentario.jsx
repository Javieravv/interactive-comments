import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"


export const UpdateComentario = ({ 
  textComment, 
  handleUpdateReplyComment }
) => {
    const [textCommentUpdate, setTextCommentUpdate] = useState(textComment)
    return (
      <>
          <textarea 
              className="texto-comentario"
              name="new-comentario" 
              id="new-comentario" 
              rows="5"
              defaultValue={textCommentUpdate}
              onChange = { e => setTextCommentUpdate (e.target.value)}
          >
          </textarea>
          <button
              onClick = {() => handleUpdateReplyComment(textCommentUpdate)}
          >
            UPDATE
          </button>
      </>
    )
  }
  