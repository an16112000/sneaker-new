import React, { useRef, useState } from "react";
import styles from "./ModeFilter.module.scss"

const Mode = ({changeMode}) => {
    const [state, setState] = useState('none')
    const active = useRef()
    const handleClick = () => {
        if(state === "none") {
            setState("active")
            active.current.classList.add(`${styles['active-mode']}`)
            changeMode()
        } else if (state === "active") {
            setState("none")
            active.current.classList.remove(`${styles['active-mode']}`)
            changeMode()
        }
    }
    return (
        <div className={styles.container} >
            <h3>Change</h3>
            <div ref={active} className={styles.mode} onClick={handleClick}>
                <div className={`${styles[`${state}-circle`]} ${styles.circle}`}>
                    <i className={`fa-solid fa-circle`}></i>

                </div>

            </div>
        </div>
    )
}

export default Mode