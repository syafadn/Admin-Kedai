import {useState} from "react"
import styles from "./TambahEvent.module.css"
import fotofile from "../../assets/drive_folder_upload.svg"
import Button from "../../elements/Button/Button"
import Input from "../../elements/Input/Input"
import save from "../../assets/save.svg"
import { storage } from "../../config/Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { gql, useMutation } from "@apollo/client"
import { GetMenu } from "../../component/Table/Table"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"

export const ADD_MENU = gql`
    mutation menu($object: menu_insert_input!) {
        insert_menu_one(object: $object){
            id
            nama
            kategori
            harga
            gambar
        }
    }
`

const TambahMenu = () => {
    const[insertmenu] = useMutation(ADD_MENU, {
        refetchQueries: [GetMenu]
    })

    const navigate = useNavigate()
    const regexNotEmpty = /\S+/
    const [errMsg, setErrMsg] = useState("")
    const [percent, setPercent] = useState(0);
    const [values, setValues] = useState({
        gambar:"",
        nama:"",
        harga:"",
        kategori:""
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
              alert ("Data Tersimpan!")
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

              insertmenu({
                variables: {
                    object: {
                        id: uuidv4(),
                        nama: values.nama,
                        kategori: values.kategori,
                        harga: values.harga,
                        gambar: url
                    }
                }
              })
            })
          }
        )
    }
    return(
        <>
            <div className={styles.tambahEventContainer}>
                <h3>Tambah Menu Baru</h3>
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
                                    // value={inputData.image}
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
                        <div className="d-grid col-3">
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

export default TambahMenu