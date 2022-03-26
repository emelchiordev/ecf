import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button';
import LoginApi from '../services/LoginApi';
import { useNavigate } from "react-router-dom";
import Authenticated from '../services/Authenticated';


const Loginpage = ({ setAuthenticatedFromStore }) => {



    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(false);

    const handleCredential = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        setCredentials({ ...credentials, [name]: value });
    };

    const [sending, setSending] = useState(false);

    const handleSubmit = () => {
        setSending(true);
        LoginApi.setLogin(credentials)
            .then((response) => {
                if (response.status === 204 || response.status === 200) {
                    Authenticated.tokenDateIsValid()
                    navigate("../", { replace: true });
                }
            })
            .catch((error) => {
                console.log(error);
                setError(true);
                setSending(false);
            });

    }

    return (
        <div className='container d-flex justify-content-center align-items-center'>
            <div className='text-center'>
                <h1>Connectez-vous à votre compte Eco IT !</h1>
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column   align-items-center"
                >
                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <input
                            className={"form-control " + (error && "is-invalid")}
                            name="username"
                            type="text"
                            placeholder="Votre adresse email"
                            value={credentials.username}
                            onSelect={() => setError(false)}
                            onChange={handleCredential}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passowrd"></label>
                        <input
                            className={"form-control " + (error && "is-invalid")}
                            name="password"
                            type="password"
                            placeholder="Votre mot de passe"
                            value={credentials.password}
                            onSelect={() => setError(false)}
                            onChange={handleCredential}
                        />
                        {error && (
                            <p className="invalid-feedback">
                                Vos identifiants ne sont pas valides
                            </p>
                        )}
                    </div>
                    <div className="form-group align-self-center">
                        {sending ? (
                            <div
                                className="spinner-border text-secondary"
                                role="status"
                            ></div>
                        ) : (
                            <Button text="CONNEXION" onclick={handleSubmit} offcanvas type="submit" className="btn btn-primary">

                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginpage