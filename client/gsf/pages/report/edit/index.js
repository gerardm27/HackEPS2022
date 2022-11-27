import Head from "next/head";
import styles from "../../../styles/Report.module.css";
import {getElementInformation, postCreateNewReport} from "../../../services/apiCalls";

export async function getServerSideProps(context) {
    const elementId = context.params ? context.params.id : 'not-valid';

    console.log(elementId);

    const response = await getElementInformation(id);

    return {
        props: { element: response.data },
    }
}

export default function EditReport({element}) {
    return (
        <div className={"container"}>
            <Head>
                <title>Geo Sensor Field - Edit Report</title>
                <meta name="description" content="HackEPS2022 Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"main"}>
                <h1 className={"title"}>
                    Editar el report {element.id}
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
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" className={styles.inputStyled} required />
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="longitud">Longitud:</label>
                        <input type="text" id="longitud" name="longitud" className={styles.inputStyled} required />
                    </div>
                    <button>
                        image
                    </button>
                    <span className={styles.tip}>
                       *Per introduir un canal, introdueix tantes latituds i longituds com vulguis per marcar el canal, ha de ser més de una (separades per comes)
                   </span>
                    <button type="submit" className={styles.button} onClick={createNewReport}>Create</button>
                </form>
            </main>
        </div>
    )
}
