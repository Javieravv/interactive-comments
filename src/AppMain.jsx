import { useContext, useEffect } from "react"
import { Comentario } from "./components/Comentario"
import { NewComentario } from "./components/NewComentario"
import { AppContext } from "./context/AppContext"

export const AppMain = () => {
  const {commentsState} = useContext(AppContext)
  const { comments } = commentsState

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify( comments ))
  }, [comments])

  console.log ('COMENTARIOS SACADOS DEL REDUCER...', comments)
  return (
      <div className="container-main">
          {
            comments.map ( (comment) => {
              return <Comentario 
                key = {comment.id}
                idComment = {comment.id}
                content = {comment.content}
                score = {comment.score}
                user= {comment.user}
                createdAt = {comment.createdAt}
                replies = {comment.replies}
              />
            })
          }
          <NewComentario />
      </div>
  )
}
