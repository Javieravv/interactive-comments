import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "../context/AppContext"

export const NewRespuestaComentario = ({ handleUpdateReply }) => {
    const {commentsState} = useContext(AppContext)
    const {currentUser} = commentsState
    const [textReply, setTextReply] = useState('')
    const refComentario = useRef(null)
    const refDivNuevaRespuesta = useRef(null)
    
    let textReplyTmp = '';
    useEffect(() => {
      refDivNuevaRespuesta.current.focus();
      refComentario.current.focus();
      refComentario.current.scrollIntoView();
    }, [])
    


    return (
      <div className="nueva-respuesta-comentario"
        ref = {refDivNuevaRespuesta}
      >
          <img src={currentUser.image.png} alt=""/>
          <textarea 
              ref={refComentario}
              className="texto-comentario"
              name="new-comentario" 
              id="new-comentario" 
              rows="5"
              placeholder="Add a answer..."
              defaultValue={textReply}
              onChange = { e => setTextReply(e.target.value)}
            >
            
            </textarea>
            <button
              onClick={ () => {
                  textReplyTmp = textReply
                  setTextReply ('-')
                  handleUpdateReply(textReplyTmp) 
              }}
              disabled={!(textReply.trim().length > 0)}
            >
            REPLY</button>
      </div>
    )
  }
  