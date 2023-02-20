// Componete que tiene los comentarios
import imgreply from '../assets/iconos/icon-reply.svg'
import imgdelete from '../assets/iconos/icon-delete.svg'
import imgedit from '../assets/iconos/icon-edit.svg'
import { UpdateComentario } from './UpdateComentario'
import { NewRespuestaComentario } from './NewRespuestaComentario'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Swal from 'sweetalert2'
import { textDiasDate } from '../data/operacionesData'
import { ViewScore } from './ViewScore'


export const RespuestaComentario = ({
    content,
    createdAt,
    score,
    user,
    replyngTo,
    idReplie,
    idComent
}) => {
    const { dispatch } = useContext (AppContext)
    const [viewRespuestaComentario, setViewRespuestaComentario] = useState(false)
    const [viewUpdateComentario, setViewUpdateComentario] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [stateReplyComent, setStateReplyComent] = useState({
        content,
        createdAt,
        id: idReplie,
        replyngTo,
        score,
        user,
        idComent
    })

    let textDateComment = textDiasDate(stateReplyComent.createdAt, Date.now() )
    const hadleClickReply = () => { setViewRespuestaComentario (!viewRespuestaComentario) }
    const handleClickUpdate = () => { setViewUpdateComentario (!viewUpdateComentario) }

    const handleClickScoreAdd = () => { 
        let scoreTemp = stateReplyComent.score  + 1
        setStateReplyComent ({
            ...stateReplyComent,
            score: scoreTemp
        })
        setIsEditing(!isEditing)
    }

    const handleClickScoreDel = () => { 
        let scoreTemp = stateReplyComent.score  - 1
        setStateReplyComent ({
            ...stateReplyComent,
            score: scoreTemp
        })
        setIsEditing(!isEditing)
    }

    const handleUpdateReplyComment = (textUpdateReply) => {
        setStateReplyComent ({
            ...stateReplyComent,
            content: textUpdateReply,
            createdAt: new Date().getTime()
        })
        textDateComment = stateReplyComent.createdAt;
        setIsEditing(!isEditing)
        setViewUpdateComentario(!viewUpdateComentario)
    }

    const handleClickDeleteReplyComment = () => {
        // Con la librería de sweetalert2 podemos preguntar si borrar o no ese elento.
        Swal.fire({
            title: 'Delete comment',
            text: `Are you sure you want to delete this comment? This will remove the comment and can't be undone `,
            showCancelButton: true,
            cancelButtonText: 'No, Cancel',
            showConfirmButton: true,
            confirmButtonText: 'Yes, Delete',
            confirmButtonColor: 'red'
        })
        .then ( (result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "deleteReply",
                    stateReplyComent
                })
            }
        })
    }

    useEffect(() => {
        if (isEditing) {
            dispatch ({
                type: 'updateReply',
                stateReplyComent
            })
            setIsEditing(!isEditing)
        }
    }, [stateReplyComent])

    return (
        <div className="container-respuesta-comentario">
            <div className="respuesta-comentario">
                <ViewScore
                    valueScore={stateReplyComent.score}
                    handleClickScoreAdd={handleClickScoreAdd}
                    handleClickScoreDel={handleClickScoreDel}
                />
                <article className="data-comentario">
                    <div>
                        <article>
                            <img src={user.image.png} alt="" />
                            <p className="name-user">{user.username}</p>
                            {/*<p className="">{new Date(stateReplyComent.createdAt).toDateString() }</p>*/}
                            <p className="">{ textDateComment }</p>
                        </article>
                    </div>
                    <div className='update-comentario'>
                        {
                            (!viewUpdateComentario)
                                ? <p className='comentario'>
                                   {stateReplyComent.content}
                                </p>
                                : 
                                    <UpdateComentario 
                                        textComment={ stateReplyComent.content }
                                        handleUpdateReplyComment = { handleUpdateReplyComment }
                                    />
                        }
                    </div>
                </article>
                <div className="options">
                    <a href="#" 
                        className='option-delete'
                        onClick={handleClickDeleteReplyComment}
                    >
                        <img src={ imgdelete } alt="" />
                        Delete
                    </a>
                    <a 
                        className='option-edit'
                        onClick={handleClickUpdate} 
                    >
                        <img src={ imgedit } alt="" />
                        Edit
                    </a>
                    {/*<a 
                    className='option-reply'
                    onClick={ hadleClickReply }
                    >
                    <img src={ imgreply } alt="" />
                    Reply1</a>*/}
                </div>
                {
                    (viewRespuestaComentario)
                        ? <NewRespuestaComentario />
                        : ""
                }
            </div>
        </div>
    )
}
