import React from 'react'
import { Fab, Action } from 'react-tiny-fab';

import { useNavigate } from 'react-router-dom';
import 'react-tiny-fab/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faBullseye, faPlus, faAddressBook, faTruckMoving, faUserCog, faTasks } from '@fortawesome/free-solid-svg-icons';

const FabButton = ({ handleClick }) => {
    const navigate = useNavigate()
    return (
        <div>
            <Fab

                icon={<FontAwesomeIcon icon={faPlus} />}
                text="Créer un formateur"
                event={false}
                onClick={() => navigate("../ajouter-formateur")}
            >

            </Fab>
        </div>
    )
}

export default FabButton
