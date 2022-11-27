import styles from "../styles/cardContents.module.css";
import Image from "next/image";
import {deleteLocation, editLocation} from "../pages/list";

export default function CardHoleContent({ description, lat, long, photo, id }) {
    return (
        <>
            <div className={styles.image}>
                <Image src={photo} alt={"photo"} height={50} width={50} />
            </div>
            <div className={styles.content}>
                <div className={styles.description}>{description}</div>
                <div className={styles.coordinates}><b>Latitud:</b> {lat} <b>Longitud:</b> {long}</div>
            </div>
            <div className={styles.actionButtons}>
                <div className={styles.actionButtonCall} onClick={() => deleteLocation(description, id)}>
                    <Image src={"/delete.svg"} alt={"delete"} width={30} height={30}/>
                </div>
                <div className={styles.actionButtonCall} onClick={() => editLocation(description, id)}>
                    <Image src={"/edit.svg"} alt={"edit"} width={30} height={30}/>
                </div>
            </div>
        </>
    )
}
