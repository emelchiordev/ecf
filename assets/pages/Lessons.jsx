import React, { useEffect, useState } from 'react'
import { Params, useParams, useOutletContext, useNavigate } from 'react-router-dom'
import SectionsApi from '../services/SectionsApi';
import Button from '../components/Button';
import LessonApi from '../services/LessonApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faPen,
  faThumbsUp,
  faThumbsDown
} from "@fortawesome/free-solid-svg-icons";

const Lessons = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [editSection, setEditSection] = useState([])
  const [activePage, setActivePage] = useOutletContext();
  const [updatePage, setUpdatePage] = useState(false)
  const [sections, setSections] = useState([])
  const [lesson, setLesson] = useState([])
  const [sending, setSending] = useState(false)


  const handleChange = (e) => {
    setLesson({ ...lesson, title: e.target.value })
  }

  useEffect(() => {
    setActivePage(2)
  }, [])

  useEffect(() => {

    SectionsApi.getSectionsFilter(params.id).then(response => {
      if (response.status === 200) {
        setSections(response.data)
      }
    }).catch(e => console.log(e))

    return () => {
      setSections([])


    }
  }, [updatePage])

  const [errorValidation, setErrorValidation] = useState({
    title: ""
  })

  const handleChangeEdit = (e) => {
    setEditSection({ ...editSection, [e.target.name]: e.target.value })
  }


  const handleSubmit = (id) => {
    setErrorValidation({ title: "" })
    setSending(true)
    LessonApi.createLesson({ ...lesson, section: '/api/sections/' + id, video: "", description: "", title: editSection[id] }).then(response => {
      if (response.status === 201) {
        setUpdatePage(!updatePage)
      }
    }).catch(error => {
      if (error.response.data['violations']) {
        setSending(false)
        const apiError = {}
        error.response.data['violations'].map(error => {
          apiError[error.propertyPath] = error.message
        })
        setErrorValidation(apiError)
      }

    })
  }

  const handleRemove = (id) => {

    LessonApi.removeLesson(id).then(response => {
      if (response.status === 204) {
        setUpdatePage(!updatePage)
      }
    }).catch(e => {
    })
  }

  const handleModify = (id) => {
    navigate('/editer-lecons/' + id)
  }

  return (



    <div className='container-fluid h-75'>

      <div className="table-responsive mt-4">
        {sections.map(section => {
          return (
            <div key={section.id} className="accordion-item">
              <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#selecteur" + section.id} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  {section.title}
                </button>
              </h2>
              <div id={"selecteur" + section.id} className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">

                <div className="accordion-body">
                  <ul className="list-group list-group-flush">
                    {section.lessons.map(lesson => {
                      return (

                        <li key={Math.random()} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <span>{lesson.title}</span>
                            <div>
                              <span className='me-5' style={{ "pointer": "cursor" }}><FontAwesomeIcon icon={faPen} size='xs' className="fa-lg" onClick={() => handleModify(lesson.id)} /></span>

                              <span style={{ "pointer": "cursor" }}><FontAwesomeIcon icon={faTrashAlt} size='xs' className="fa-lg" onClick={() => handleRemove(lesson.id)} /></span>
                            </div>
                          </div>
                        </li>

                      )
                    })}
                  </ul>
                  {section.lessons.length == 0 && <strong>Il n'y a pas de leçon pour cette section</strong>}

                </div>
                <div className="d-flex justify-content-center input-group mb-3" >
                  <div className="col-lg-6">
                    <div className="input-group mb-3" >
                      <input type="text" defaultValue={editSection[section.id]} className="form-control" name={section.id} onChange={handleChangeEdit} placeholder="Titre de la leçon" aria-label="lesson" aria-describedby="lesson" />

                      <Button simple={true} text="AJOUTER" onclick={() => handleSubmit(section.id)}></Button>
                      {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}

                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        })}


      </div>

    </div >
  )
}

export default Lessons