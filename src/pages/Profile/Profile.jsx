import styles from "./Profile.module.css"
import Logo from "../../assets/mate.png"

const Profile = () => {
    return (
        <div className={styles.wrapper}>
          {/* Judul */}
          <div className={styles.judul}>
            <div className={styles.sideLeft}>
              <img src={Logo} className={styles.logo} alt="Logo" id="logo" />
            </div>
            <div className={styles.sideRight}>
              <h2 className="title-medium-bold" id="profilNama">
                Kedai Mate
              </h2>
              <p className="title-small-regular" id="profilDeskripsi">
                Kedai Mate telah berdiri sejak tahun 2017 hingga saat ini, kami bergerak di bidang makanan serta minuman yang tentu di sukai oleh semua kalangan usia. Kami berlokasi di Jalan Pekapuran, Kota Depok dengan jam operasional buka pukul 14.00 WIB hingga 23.00 WIB.
              </p>
            </div>
          </div>

          {/* Informasi */}
          <div className={styles.informasi}>
            <h2 className="title-medium-bold" id="informasiPerusahaanTitle">
              Informasi Tambahan
            </h2>
            <div className={styles.parentInformasi}>
              <div className={styles.sideLeftInformasi}>
                <div className="email" id="emailInformasi">
                  <p className={`body-large-regular ${styles.label}`}>
                    Email Adress
                  </p>
                  <p className="body-large-regular">kedaimate@gmail.com</p>
                </div>
              </div>
              <div className={styles.sideRightInformasi}>
                <div className={styles.whatsapp} id="whatsappInformasi">
                  <p className={`body-large-regular ${styles.label}`}>
                    Whatsapp
                  </p>
                  <p className="body-large-regular">083191763311</p>
                </div>
                <div className={styles.instagram} id="instagramInformasi">
                  <p className={`body-large-regular ${styles.label}`}>
                    Instagram
                  </p>
                  <p className="body-large-regular">@kedaimate</p>
                </div>
                <div className={styles.facebook} id="facebookInformasi">
                  <p className={`body-large-regular ${styles.label}`}>
                    Tiktok
                  </p>
                  <p className="body-large-regular">@kedaimate</p>
                </div>
              </div>
            </div>
          </div>
          </div>
    )
}

export default Profile