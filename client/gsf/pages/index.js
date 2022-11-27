import Head from 'next/head'
import Card from '../components/card'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={"container"}>
      <Head>
        <title>Geo Sensor Field</title>
        <meta name="description" content="HackEPS2022 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={"main"}>
        <h1 className={"title"}>
          Benvingut a GSF
        </h1>
        <h2 className={"description"}>
          Què vols fer?
        </h2>

        <div className={styles.grid}>
          <Card
            imagePath = {"/list.png"}
            title = "Veure tots els incidents"
            description = "Veure tots els incidents en forma de llista"
            link = "/list"
          />
          <Card
            imagePath = {"/map.png"}
            title = "Veure totes les localitzacions"
            description = "Veure tots els incidents en forma de mapa"
            link = "/map"
          />
        </div>
      </main>
    </div>
  )
}
