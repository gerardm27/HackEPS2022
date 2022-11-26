import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Card({ imagePath, title, description, link }) {
    return (
        <a href={link} className={styles.card}>
            <span>
                <Image 
                    src = {imagePath}
                    width = {100}
                    height = {100}
                />
                <h2>{title}</h2>
            </span>
            <p>{description}</p>
        </a>
    )
}