import article from "../../assets/article.svg"
import beverage from "../../assets/beverage.png"
import styles from "./Dashboard.module.css"
import { gql, useQuery } from "@apollo/client";

const CountMenu = gql`
query CountMenu {
    menu_aggregate {
      aggregate {
        count(columns: id)
      }
    }
  }
`

const Dashboard = () => {
    const { data: menuData, loading: menuLoading } = useQuery(CountMenu);

    if (menuLoading) {
        return <p>Loading...</p>;
    }

    const menuCount = menuData?.menu_aggregate?.aggregate?.count || 0;

    return(
        <>
            <div className="d-flex">
                <div className={`${styles.shadow} card m-3`}>
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={article} className="img-fluid rounded-start" width="70" style={{paddingTop:20, paddingLeft:20}}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Total Menu</h5>
                                <p className="card-text"> {menuCount} </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.shadow} card m-3`}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={beverage} className="img-fluid rounded-start" width="80" style={{paddingTop:10, paddingLeft:20}}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Makanan</h5>
                                <p className="card-text">
                                    15
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.shadow} card m-3`}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={beverage} className="img-fluid rounded-start" width="80" style={{paddingTop:10, paddingLeft:20}}/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Minuman</h5>
                                <p className="card-text">
                                    9
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard