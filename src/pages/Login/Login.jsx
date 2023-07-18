import styles from "./Login.module.css";
import React, { useState } from "react"
import Logo from "../../assets/mate.png";
import Gambar from "../../assets/bg-pancong.jpg";
import Input from "../../elements/Input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import userSlice, { setisLoggedIn } from "../../config/store/userSlice"
import { gql, useQuery } from "@apollo/client";

const GetAkun = gql`
    query akun {
        akun {
            id 
            username
            password
        }
    }
`

const Login = () => {
    const {data:GetAkunAdmin} = useQuery(GetAkun)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const validationLogin = GetAkunAdmin?.akun.find((user) => user.username===name && user.password===password)
        
        if (validationLogin) {
            alert("login berhasil!")
            dispatch(
                userSlice.actions.setisLoggedIn (true)
            )
        } else {
            alert("gagal login!")
        }

        navigate("/dashboard")
    };

    return (
        <div className="wrapper" id="login-wrapper">
            <div className={styles.backgroundImage}>
                <img
                    src={Gambar}
                    className={styles.gambar}
                    alt="Background"
                    id="background-image"
                />
            </div>
            <form className={styles.form} id="login-form">
                <div className={styles.logo} id="logo">
                <img
                    src={Logo}
                    className={styles.imageLogo}
                    alt="Logo"
                    id="logo-image"
                />
                <p className="body-large-regular mt-2 text-center">
                    Nikmati pancong terenak di Kota ini,
                    hanya ada di Kedai Mate!
                </p>
                </div>

                <div className="input-patern" id="input-patern">
                    <div className="username">
                        <Input
                            type={"text"}
                            placeholder={"Masukkan Username"}
                            className={styles.input}
                            id="username"
                            name="username"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={"Username"}
                        />
                    </div>
                    <br/>
                    <div className="password">
                        <Input
                            type={"password"}
                            placeholder={"Masukkan Password"}
                            className={styles.input}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label={"Password"}
                        />
                    </div>
                
                    <div className={styles.button}>
                        <button
                            type="button"
                            className={styles.btnLogin}
                            onClick={handleSubmit}
                            id="login-button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
  );
};

export default Login;