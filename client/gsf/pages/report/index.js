import Head from "next/head";
import styles from "../../styles/Report.module.css";
import {postCreateNewReport} from "../../services/apiCalls";

export async function createNewReport(tipus, description, status, latitud, longitud) {
    const latituds = latitud.split(",");
    const longituds = longitud.split(",");
    const coords = []

    for (let i = 0; i < latituds.length; ++i) {
        coords.push({
            lat: latituds[i],
            long: longituds[i]
        })
    }

    await postCreateNewReport(
        tipus,
        description,
        status,
        coords
    );
}

export default function Report() {
    
    return (
        <div className={"container"}>
            <Head>
                <title>Geo Sensor Field - Sensors list</title>
                <meta name="description" content="HackEPS2022 Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"main"}>
                <h1 className={"title"}>
                    Nou report
                </h1>
                <form className={styles.formContainer}>
                    <div className={styles.formBlock}>
                        <label htmlFor="type">Tipus:</label>
                        <select name="type" id="type" className={styles.inputStyled} required >
                            <option value="forats">Forat</option>
                            <option value="canals">Canal</option>
                        </select>
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" className={styles.inputStyled} required />
                    </div>


                    <div className={styles.formBlock}>
                        <label htmlFor="type">Estat:</label>
                        <select name="estatus" id="estatus" className={styles.inputStyled} required >
                            <option value="OK">Està be (OK)</option>
                            <option value="BROKEN">Trencat (Broken)</option>
                            <option value="MISSING">No està (Missing)</option>
                        </select>
                    </div>


                    <div className={styles.formBlock}>
                        <label htmlFor="lat">Latitud:</label>
                        <input type="text" id="lat" name="lat" className={styles.inputStyled} required />
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="lng">Longitud:</label>
                        <input type="text" id="lng" name="lng" className={styles.inputStyled} required />
                    </div>

                   <span className={styles.tip}>
                       *Per introduir un canal, introdueix tantes latituds i longituds com vulguis per marcar el canal, ha de ser més de una
                   </span>

                    <button type="submit" className={styles.button} onClick={createNewReport}>Create</button>
                </form>
            </main>
        </div>
    )
}
