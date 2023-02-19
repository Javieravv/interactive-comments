// Creamos un provider para la aplicación.
import { AppContext } from "./AppContext"
import data from '../data/data.json'
import { useState } from "react"
import { useReducer } from "react"
import { v4 as uuidv4} from 'uuid'

const initState = () => {
    let userLocalStorage = localStorage.getItem ('currentUser')
    let commentsLocalStorage = JSON.parse(localStorage.getItem('comments'))
    
    // Provisionalmente estará esta línea.
    let comments   = data.comments
    let currentUser   = data.currentUser
    
    if (userLocalStorage) {
        currentUser = userLocalStorage
    }
    
    if (commentsLocalStorage)  {
        comments = commentsLocalStorage
    }
    return { comments, currentUser}
}


export const AppProvider = ({ children }) => {
    const [commentsState, dispatch] = useReducer(commentsReducer, {}, initState)
    console.log ('comentarios del reducer...', commentsState )
    return (
        <AppContext.Provider
            value = { {commentsState, dispatch } }
        >
            { children }
        </AppContext.Provider>
    )
}

const commentsReducer = ( commentsState, action) => {
    let commentStateTmp = commentsState
    const commentsTmp = commentsState.comments;
    switch (action.type) {
        case 'updateScore':
            return {
                ...commentsState,
                comments: commentsState.comments.map( (comment) => {
                    if ( comment.id === action.stateComment.idComment) {
                        comment.score = action.stateComment.score
                        return comment
                    }
                    return comment
                })
            }

        case 'updateComment':
                return {
                    ...commentsState,
                    comments: commentsState.comments.map( (comment) => {
                        if ( comment.id === action.stateComment.idComment) {
                            comment.content = action.stateComment.content
                            return comment
                        }
                        return comment
                    })
                }
        case 'addComment':
            return {...commentsState,
                    comments: [...commentsState.comments,
                        {
                            content: action.content,
                            createdAt: new Date().getTime(),
                            id: uuidv4(),
                            replies: [],
                            score: 0,
                            user: commentStateTmp.currentUser
                        }]
                    }
        
        case 'updateReply':
            return {
                ...commentsState,
                comments: commentsState.comments.map( (comment) => {
                    if ( comment.id === action.stateReplyComent.idComent ) {
                        let repliesTmp = comment.replies
                        repliesTmp.map( (reply) => {
                            if (reply.id === action.stateReplyComent.id) {
                                reply.content = action.stateReplyComent.content
                                reply.createdAt = new Date().getTime()
                                reply.score = action.stateReplyComent.score
                            }
                            return reply
                        })
                        return comment
                    }
                    return comment
                })
            }
        case 'addReply':
            return commentsState;

        case 'deleteReply':
            commentsTmp.map( (comment) => {
                if ( comment.id === action.stateReplyComent.idComent ) {
                    let repliesTmp = comment.replies
                    repliesTmp = comment.replies.filter( (reply) => reply.id != action.stateReplyComent.id )
                    comment.replies = repliesTmp
                    return comment
                }
            })
            commentStateTmp.comments = commentsTmp
            localStorage.setItem('comments', JSON.stringify( commentsTmp ))
            return {...commentsState,
                comments: commentsTmp
            }

        default:
            return commentsState;
    }
}