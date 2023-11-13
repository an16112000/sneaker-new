import React from "react";
import { useEffect, useState } from 'react'
import Header from "../Header";
import styles from '../Header.module.scss'
import LayOutDataMenu from "../../DataMenu/LayOutDataMenu";
import { useParams } from "react-router-dom";
import Mode from "../../DataMenu/mode/Mode";


const MenuSneakers = () => {
    let { typeOfProduct, pageNumber } = useParams()
    const [filter, setFilter] = useState(false)
    const [type, setType] = useState(typeOfProduct);
    console.log('MenuSneaker')
    useEffect(
        () => {
            setType(typeOfProduct)
        }
        , [typeOfProduct]
    )

    function handleClick() {
        setFilter(!filter)
    }
    console.log(filter)

    return (
        <>
            <Header
                Mode={<Mode changeMode = {handleClick} />}
                
            />
            <div className={styles.modal}>
                <LayOutDataMenu
                    type={type}
                    typeOfProduct={typeOfProduct}
                    pageNumber={pageNumber}
                    filter={filter}
                />
            </div>
        </>
    )
}

export default MenuSneakers