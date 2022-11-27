import styles from "../styles/cardContents.module.css";
import Image from "next/image";
import {deleteLocation} from "../pages/list";


export default function CardCanalContent({ description, latInicial, longInicial, latFinal, longFinal, photo, id }) {
    return (
        <>
            <div className={styles.image}>
                <Image src={photo} alt={"photo"} height={50} width={50} />
            </div>
            <div className={styles.content}>
                <div className={styles.description}>{description}</div>
                <div className={styles.coordinates}> <b>PUNT INICIAL</b> </div>
                <div className={styles.coordinates}><b>Latitud:</b> {latInicial} <b>Longitud:</b> {longInicial}</div>
                <div className={styles.coordinates}> <b>PUNT FINAL</b> </div>
                <div className={styles.coordinates}><b>Latitud:</b> {latFinal} <b>Longitud:</b> {longFinal}</div>
            </div>
            <div className={styles.actionButtons}>
                <div className={styles.actionButtonCall} onClick={() => deleteLocation(description, id)}>
                    <Image src={"/delete.svg"} alt={"delete"} width={30} height={30}/>
                </div>
                <a className={styles.actionButtonCall} href={`/report/${id}`}>
                    <Image src={"/edit.svg"} alt={"edit"} width={30} height={30}/>
                </a>
            </div>
        </>
    )
}
