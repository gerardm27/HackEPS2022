import Head from 'next/head'
import Image from 'next/image'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

const path = require('path')

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>- GSF -</title>
        <meta name="description" content="HackEPS2022 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a >- GSF -</a>
        </h1>

        <p className={styles.description}>
          What do you want to do?
        </p>
        
        

        <div className={styles.grid}>
          <Card
              imagePath = {"/report.png"}
              title = "Report an incident"
              description = "Report an incident to show it on the map"
              link = "/report"
          />
          <Card
            imagePath = {"/list.png"}
            title = "See all incidents"
            description = "See all incidents reported as a list"
            link = "/list"
          />
          <Card
            imagePath = {"/map.png"}
            title = "See all locations"
            description = "See all incidents reported on a map"
            link = "/map"
          />
        </div>
      </main>

      
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>   
        </a>
      </footer> */}
    </div>
  )
}
