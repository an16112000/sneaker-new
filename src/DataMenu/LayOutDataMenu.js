import React, { useEffect, useState } from "react";
import { getDataMenu } from "./getDataMenu";
import styles from './LayOutDataMenu.module.scss'
import { Link, useParams } from "react-router-dom";

const LayOutDataMenu = ({ type, pageNumber, typeOfProduct, filter }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const params = useParams()
    console.log(params)
    useEffect(
        () => {
            const fetchApi = async () => {
                const response = await getDataMenu(type, pageNumber);
                setData(response)
            }
            fetchApi();
        }, [type, page, pageNumber]
    )
    useEffect(
        ()=> setPage(prev => prev + 1), [pageNumber]
    )
    useEffect(
        () => {
            setPage(2)
        }, [type]
    )
    function handleNextPage() {
        window.scrollTo({
            top: 0,
            behavior: `smooth`
        })
    }
    function handlePreviousPage() {
        window.scrollTo({
            top: 0,
            behavior: `smooth`
        })
    }
    return (
        <div className={styles.menu}>
            {   
                data.map(
                    (item, index) => {
                        if(item.code === undefined) {
                            return <></>;
                        }
                        return <Link to={`/product/${item.code}/size`} key={index} className={styles.item}>
                            <img src={item.img} alt={item.code} />
                            <p>{item.type}</p>
                            <h4>{item.name}</h4>
                            <span>Min Price Sold Out: {item.min_priceSoldOut}</span>
                            <span className={styles.price}>
                                SNKRDUNK {item.min_priceJp}
                                {item.isSnkrDunkOk && <svg fontSize="14px" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
                                    <g clipPath="url(#Icon_Color-Verified_Badge_svg__a)">
                                        <circle cx="24" cy="24" r="24" fill="#20D5EC"></circle>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M37.12 15.88a3 3 0 0 1 0 4.24l-13.5 13.5a3 3 0 0 1-4.24 0l-8.5-8.5a3 3 0 1 1 4.24-4.24l6.38 6.38 11.38-11.38a3 3 0 0 1 4.24 0Z" fill="#fff"></path>
                                    </g>
                                    <defs>
                                        <clipPath id="Icon_Color-Verified_Badge_svg__a">
                                            <path fill="#fff" d="M0 0h48v48H0z"></path>
                                        </clipPath>
                                    </defs>
                                </svg>}
                            </span>
                        </Link>
                    }
                )
            }
            <div className={styles.footer}>
                {/* <button className={styles.changePage} onClick={handlePreviousPage}>
                    <i className={`fa-solid fa-chevron-left ${styles.icon}`}></i>
                    Previous Page
                </button> */}
                <Link to={`/${typeOfProduct}/page/${parseInt(pageNumber)-1}`} className={styles.changePage} onClick={handlePreviousPage} >
                    Next Page
                    <i className={`fa-solid fa-chevron-left ${styles.icon}`}></i>
                </Link>
                {pageNumber}
                <Link to={`/${typeOfProduct}/page/${parseInt(pageNumber)+1}`} className={styles.changePage} onClick={handleNextPage} >
                    Next Page
                    <i className={`fa-solid fa-chevron-right ${styles.icon}`}></i>
                </Link>
            </div>
        </div>
    )
}

export default LayOutDataMenu