import React, { useState } from "react";
import keyboard_arrow_right from "../../assets/keyboard_arrow_right.svg";
import btn_arrow_left from "../../assets/btn_arrow_left.svg";
import styles from "./Table.module.css";
import edit from "../../assets/edit.svg";
import del from "../../assets/deleteRed.svg";
import add from "../../assets/add.svg"
import Button from "../../elements/Button/Button"
import { Link, useNavigate } from "react-router-dom";
import TableSearch from "../../elements/TableSearch/TableSearch";
import { useEffect } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"

export const GetMenu = gql`
  query menu {
    menu {
      id
      nama
      kategori
      harga
      gambar
    }
  }
`

const DeleteMenu = gql `
mutation deletemenu($id: String!) {
  delete_menu_by_pk(id: $id) {
    id
    nama
    kategori
    harga
    gambar
  }
}
`

const Table = () => {
  const { data } = useQuery(GetMenu)
  const [deletemenubyId] = useMutation(DeleteMenu)

  useEffect(() => {
    console.log('data gql: ', data);
  })

  const navigate = useNavigate();

  const handleTambahMenu = () => {
    navigate("/menu/tambah");
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button
          onClick={handleTambahMenu}
          label="Tambah Menu"
          icon={add}
          color="brown"
          id="tambah-menu-button"
        />
      </div>
      {
        <div className="row mt-4 text-center">
          <div className="col-12 p-0">
            <div className="table-responsive">
              <table className="table ">
                {/* Render data pada halaman saat ini */}
                <thead className={styles.thead} id="thead">
                  <tr id="tr-table">
                    <th
                      className={`p-3 ${styles.roundedLeftTop} ${styles.tableHeadRow}`}
                    >
                      Foto
                    </th>
                    <th className={`p-3 ${styles.tableHeadRow}`}>Nama Menu</th>
                    <th className={`p-3 ${styles.tableHeadRow}`}>Harga Menu</th>
                    <th className={`p-3 ${styles.tableHeadRow}`}>Kategori</th>
                    <th
                      className={`p-3 ${styles.roundedRightTop} ${styles.tableHeadRow}`}
                    ></th>
                  </tr>
                </thead>
                <tbody className={styles.tbody} id="tbody">
                  {
                    !data?
                    <p style={{textAlign: "center"}}>Loading...</p>:
                    data?.menu.map((item) => {
                      return(
                        <tr className={styles.tableRow} key={item.id}>
                          <td className="p-3"><img src={item.gambar} className={styles.image}/></td>
                          <td className="p-3">{item.nama}</td>
                          <td className="p-3">{item.harga}</td>
                          <td className="p-3">{item.kategori}</td>
                          <td className="p-3">
                            <Link to={`/menu/edit`} state={{item: item}}>
                              <img
                                src={edit}
                                alt=""
                                className={styles.actionButton}
                              />
                            </Link>
                            <a href="#" 
                              onClick={() => {[
                                deletemenubyId({
                                    variables:{id:item.id}
                                }), window.location.reload(), navigate("/menu")]
                              }}
                            >
                              <img src={del} alt="" className={styles.actionButton} />
                            </a>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Table;