import React, { useState, useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LessonApi from '../../services/LessonApi';
import Button from '../../components/Button';



const AddLessonPage = () => {

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [editorState, setEditorState] = useState()
    const [lesson, setLesson] = useState([])
    const [link, setLink] = useState("")
    const [sending, setSending] = useState({ video: false, title: false, description: false })
    const [success, setSuccess] = useState({ title: false, description: false, video: false })



    const editorRef = useRef(null);

    const log = () => {
        setSending({ ...sending, description: true })
        LessonApi.modifyLesson(params.id, { ...lesson, description: editorRef.current.getContent() }).then(res => {
            if (res.status === 200) {
                setSuccess({ ...success, description: true })
                setSending({ ...sending, description: false })
            }



        }).catch(e => console.log(e))


    }

    useEffect(() => {
        LessonApi.getLesson(params.id).then(
            response => {
                if (response.status === 200) {
                    setLesson(response.data)

                }
            }
        )
        return () => setLesson(null)
    }, [])

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setContent(lesson.description)
        }

    }, [lesson])

    const handleChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value })
    }

    const [errorValidation, setErrorValidation] = useState({
        title: ""
    })

    const handleSubmit = (typeSave) => {

        switch (typeSave) {
            case "title": {
                setSending({ ...sending, title: true })
                LessonApi.modifyLesson(params.id, lesson).then(res => {
                    if (res.status === 200) {
                        setSuccess({ ...success, title: true })
                        setSending({ ...sending, title: false })

                    }

                }).catch(e => console.log(e))
                break;
            }
            case "video": {
                setSending({ ...sending, video: true })
                LessonApi.modifyLesson(params.id, lesson).then(res => {
                    setSuccess({ ...success, video: true })
                    setSending({ ...sending, video: false })

                }).catch(e => console.log(e))
                break;
            }
            default: {
                break;
            }

        }
    }


    return (<>

        <div className="container d-flex flex-column ">
            <NavLink to='../mes-cours' className='mt-4 align-self-end pe-auto'><FontAwesomeIcon icon={faCircleArrowLeft} size="1x" /> RETOUR</NavLink>
            {console.log(lesson)}
            <div className="card" style={{ "marginTop": "1rem" }}>
                <div className="card-header">

                    <h1 className='mt-4'>MODIFIER LA LEÇON</h1>
                    <h5 className='mt-4'>TITRE DE LA LEÇON</h5>
                    <div className="input-group mb-3 w-50 d-flex mt-4">
                        <input type="text" defaultValue={lesson.title} className="form-control" name='title' onChange={handleChange} aria-label="title" aria-describedby="title" />
                        {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}
                        <Button simple={true} sending={sending.title} text="SAUVEGARDER" onclick={() => handleSubmit("title")}></Button>
                    </div>
                    {success.title &&
                        <div className="alert alert-success" role="alert">
                            Votre titre a bien été modifié !
                        </div>
                    }
                    <hr className='mt-10 mb-10' />

                    <h5 className='mt-8'>LIEN DE LA VIDEO</h5>
                    <p className='mt-1'><i>Exemple : https://www.youtube.com/embed/B_vCy1uTg68</i></p>
                    <div className="input-group mb-3 w-50 d-flex mt-4">
                        <input type="text" defaultValue={lesson.video} onChange={handleChange} className="form-control" name='video' aria-label="video" aria-describedby="video" />
                        {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}
                        <Button simple={true} sending={sending.video} text="SAUVEGARDER" onclick={() => handleSubmit("video")}></Button>
                    </div>
                    {success.video &&
                        <div className="alert alert-success" role="alert">
                            Votre video a bien été modifié !
                        </div>
                    }
                    <h5 className='mt-8'>APERÇU DE LA VIDEO</h5>

                    <iframe
                        className='mt-4'
                        width="560"
                        height="315"
                        src={lesson.video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>

                    </iframe>

                    <hr className='mt-10 mb-10' />
                    <h5 className='mt-8'>CORPS DE LA LEÇON</h5>
                    <Editor
                        apiKey="h650meo43g18fgk63g9sd6zz0n5njbjpyu4u32n2fepbmjl1"
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>Ecrivez votre leçon à cet endroit</p>"
                        init={{
                            height: 500,
                            menubar: false,
                            selector: '#tinymce',
                            branding: false,

                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                    {success.description &&
                        <div className="alert alert-success" role="alert">
                            Votre leçon a bien été modifié !
                        </div>
                    }

                    <div className="row justify-content-center mb-4 mt-4">
                        <div className="col-2">

                            <Button simple={true} sending={sending.description} text="SAUVEGARDER" onclick={log}></Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>
    )
}

export default AddLessonPage