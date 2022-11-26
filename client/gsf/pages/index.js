import Head from 'next/head'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Geo Sensor Field</title>
        <meta name="description" content="HackEPS2022 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to GSF
        </h1>
        <h2 className={styles.description}>
          What do you want to do?
        </h2>

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
    </div>
  )
}
