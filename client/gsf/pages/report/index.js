import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card'
import styles from '../../styles/Report.module.css'

export default function Report() {
  return (
    <div className={styles.container}>
      <Head>
        <title>- GSF -</title>
        <meta name="description" content="HackEPS2022 Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Report an incident
        </h1>
        <div className={styles.form}>
          <label for="type">Type:</label>
          <select name="type" id="type" placeholder='Select an option'> 
            <option value="manhole">Manhole</option>
            <option value="canalization">Canal</option>
          </select>
        </div>
        <div className={styles.grid}>
          <p>
            <label for="name">Name</label>
            <input type="text" id="name" name="name" />
          </p>
          <p>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
          </p>
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
