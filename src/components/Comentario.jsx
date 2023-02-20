// Componete que tiene los comentarios
import { useContext, useEffect, useState } from 'react'
import imgreply from '../assets/iconos/icon-reply.svg'
import { AppContext } from '../context/AppContext'
import { NewRespuestaComentario } from './NewRespuestaComentario'
import { RespuestaComentario } from './RespuestaComentario'
import { v4 as uuidv4} from 'uuid'
import { difDiasDate, textDiasDate } from '../data/operacionesData'
import { ViewScore } from './ViewScore'

export const Comentario = ({
    idComment,
    content,
    score,
    user, // array
    createdAt,
    replies // array
}) => {
    const {commentsState, dispatch } = useContext (AppContext)
    const { currentUser } = commentsState
    const [viewRespuesta, setViewRespuesta] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [stateComment, setStateComment] = useState({idComment,
            content,
            score,
            user,
            createdAt,
            replies
        })
    const handleClickViewRespuesta = () => { setViewRespuesta (!viewRespuesta) }
    const textDateComment = textDiasDate(createdAt, Date.now() )

    const handleClickScoreAdd = () => { 
        let scoreTemp = stateComment.score  + 1
        setStateComment ({
            ...stateComment,
            score: scoreTemp
        })
        setIsEditing(!isEditing)
    }

    const handleClickScoreDel = () => { 
        let scoreTemp = stateComment.score  - 1
        setStateComment ({
            ...stateComment,
            score: scoreTemp
        })
        setIsEditing(!isEditing)
    }
    
    useEffect(() => {
        if (isEditing) {
            dispatch ({
                type: 'updateScore',
                stateComment
            })
            setIsEditing(!isEditing)
        }
    }, [stateComment])

    const handleAddReply = (textComment ='JAVO') => {
        let repliesTmp = replies
        repliesTmp.push( {
            content: textComment,
            createdAt: new Date().getTime(),
            id: uuidv4(),
            replyngTo: user.username,
            score: 0,
            user: currentUser
        })
        setStateComment ({
            ...stateComment,
            replies: repliesTmp
        })
        setIsEditing(!isEditing)
        setViewRespuesta(!viewRespuesta)
    }
    

    return (
        <div className="container-comentario">
            <div className="comentario">
                <ViewScore
                    valueScore={stateComment.score}
                    handleClickScoreAdd={handleClickScoreAdd}
                    handleClickScoreDel={handleClickScoreDel}
                />
                <article className="data-comentario">
                    <div>
                        <article>
                            <img src={user.image.png} alt="" />
                            <p className="name-user">{user.username}</p>
                            {/*<p className="">{new Date(createdAt).toDateString() }</p>*/}
                            <p className="">{ textDateComment }</p>
                        </article>
                    </div>
                    <div>
                        <p className='comentario'>
                            {content}
                        </p>
                    </div>
                </article>
                <div className="options">
                    <img src={ imgreply } alt="" />
                    <a 
                        href="#" 
                        className='option-reply'
                        onClick={ handleClickViewRespuesta }>Reply</a>
                </div>
            </div>
            <div className="container-resp-comentarios">
                {
                    (replies.length > 0)
                    ? (
                        replies.map((replie) => {
                            return <RespuestaComentario 
                                key = {replie.id}
                                content = {replie.content}
                                createdAt={replie.createdAt}
                                score={replie.score}
                                user= {replie.user}
                                idReplie = {replie.id}
                                idComent = {idComment}
                            />
                        })
                    )
                    : ('')
                }
            </div>
            {
                (viewRespuesta)
                    ? <NewRespuestaComentario
                        handleUpdateReply={handleAddReply}
                        />
                    : ""
            }
        </div>
    )
}
