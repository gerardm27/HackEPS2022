import Image from 'next/image'
import styles from '../styles/Card.module.css'
import Link from "next/link";

export default function Card({ imagePath, title, description, link }) {
    return (
        <Link href={link} className={styles.card}>
            <div className={styles.centerInformation}>
                <Image src={imagePath} width={70} height={70} />
                <h2 className={styles.title}>{title}</h2>
            </div>
            <p className={styles.description}>{description}</p>
        </Link>
    )
}
