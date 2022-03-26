import React from 'react'
import FabButton from '../components/FabButton'

const TeachersList = () => {
    return (<>
        <div className='container'>Liste des formateurs</div>
        <FabButton handleClick={() => useNavigate("ajouter")} />
    </>
    )
}

export default TeachersList