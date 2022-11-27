import styles from "../styles/foratCard.module.css";
import Image from "next/image";

export default function CardCanalContent({ description, latInicial, longInicial, latFinal, longFinal, photo }) {
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
                <a className={styles.actionButtonCall}>
                    <Image src={"/delete.svg"} alt={"delete"} width={30} height={30}/>
                </a>
                <a className={styles.actionButtonCall}>
                    <Image src={"/edit.svg"} alt={"edit"} width={30} height={30}/>
                </a>
            </div>
        </>
    )
}
