import {useState} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import styles from "./EditMenu.module.css"
import fotofile from "../../assets/drive_folder_upload.svg"
import Button from "../../elements/Button/Button"
import Input from "../../elements/Input/Input"
import save from "../../assets/save.svg"
import { storage } from "../../config/Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { gql, useMutation } from "@apollo/client"
import { GetMenu } from "../../component/Table/Table"

export const UPDATE_MENU = gql`
  mutation update_menu($id: String!, $nama: String!, $gambar: String!, $harga: String!, $kategori: String!) {
    update_menu_by_pk(
        pk_columns: {id: $id},
        _set: {nama: $nama, gambar: $gambar, harga: $harga, kategori: $kategori}
    ) {
        id
        nama
        gambar
        harga
        kategori
    }
  }
`

const EditMenu = () => {
    const[update_menu] = useMutation(UPDATE_MENU, {
        refetchQueries: [GetMenu]
    })

    const navigate = useNavigate()
    const edit = useLocation()
    console.log(edit)

    const regexNotEmpty = /\S+/
    const [errMsg, setErrMsg] = useState("")
    const [percent, setPercent] = useState(0);
    const [values, setValues] = useState({
        gambar: "",
        nama: edit.state.item.nama,
        harga: edit.state.item.harga,
        kategori: edit.state.item.kategori
    })

    const handleOnChange = (e) => {
        if (e.target.name === "gambar"){
            setValues({
                ...values,[e.target.name]:e.target.files[0]
            })
        } else {
            setValues({
                ...values,[e.target.name]:e.target.value
            })
        }
    }

    const onSubmit = (e) => {
        if (
            !regexNotEmpty.test(values.nama) || 
            !regexNotEmpty.test(values.kategori) || 
            !regexNotEmpty.test(values.harga) || 
            !regexNotEmpty.test(values.gambar)) {
            setErrMsg("Please enter data")
        } else {
            handleUpload()
            setErrMsg("")
        }
        navigate("/menu")
        console.log(values)
        e.preventDefault()
    }

    const handleUpload = () => {
        // handle file ref 
        const storageRef = ref(storage, `/files/${values.gambar.name}`)
    
        const uploadTask = uploadBytesResumable(storageRef, values.gambar)
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
    
            setPercent(percent)
              console.log('Progress >>> ${percent}%');
          },
    
          (err) => {
            console.log('error upload file ', err);
          },
    
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
                console.log('url download file', url);

                update_menu({
                    variables: {
                        id: edit.state.item.id,
                        nama: values.nama,
                        harga: values.harga,
                        kategori: values.kategori,
                        gambar: url
                    }
                })
            })
            alert ("Data Berhasil di Ubah!")
          }
        )
    }

    return(
        <>
            <div className={styles.tambahEventContainer}>
                <h3>Edit Menu</h3>
                <div className="row pb-4">
                    <div className="col-4">
                        <div className="d-flex justify-content-center">
                            {/* upload foto */}
                            <div className={styles.container}>
                                <Input 
                                    label="Image"
                                    type="file"
                                    id="gambar"
                                    name="gambar"
                                    onChange={handleOnChange}
                                />
                                <span style={{color:"red"}}>{errMsg}</span>
                            </div>
                        </div>
                    </div>
                    {/* title + desc */}
                    <div className="col">
                            <div className="mt-3">
                                <div className={styles.inputBox}>
                                    <Input
                                        type={"text"}
                                        placeholder={"Masukkan nama menu"}
                                        className={styles.input}
                                        id="nama"
                                        name="nama"
                                        value={values.nama}
                                        onChange={handleOnChange}
                                        label={"Nama Menu"}
                                    />
                                    <span style={{color:"red"}}>{errMsg}</span>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className={styles.inputBox}>
                                    <Input
                                        type={"text"}
                                        placeholder={"Masukkan harga menu"}
                                        className={styles.input}
                                        id="harga"
                                        name="harga"
                                        value={values.harga}
                                        onChange={handleOnChange}
                                        label={"Harga Menu"}
                                    />
                                    <span style={{color:"red"}}>{errMsg}</span>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className={styles.inputBox}>
                                    <Input
                                        type={"text"}
                                        placeholder={"Masukkan kategori menu"}
                                        className={styles.input}
                                        id="kategori"
                                        name="kategori"
                                        value={values.kategori}
                                        onChange={handleOnChange}
                                        label={"Kategori Menu"}
                                    />
                                    <span style={{color:"red"}}>{errMsg}</span>
                                </div>
                            </div>
                    </div>

                    {/* button */}
                    <div className="d-flex justify-content-end align-items-center gap-3 pt-5">
                            {/* <div className="d-grid col-3 ">
                                <Button
                                    id="reset"
                                    label="Reset"
                                    color="white"
                                    icon={reset}
                                    onClick={onReset}
                                />
                            </div> */}
                            <div className="d-grid col-3 ">
                                <Button
                                    id="submitButton"
                                    label="Simpan"
                                    color="brown"
                                    icon={save}
                                    onClick={onSubmit}
                                />
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditMenu