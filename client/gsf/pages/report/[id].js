import Head from "next/head";
import styles from "../../styles/Report.module.css";
import {getElementInformation, postCreateNewReport, putEditStatusReport} from "../../services/apiCalls";
import {useState} from "react";

export async function getServerSideProps(context) {
    const elementId = context.params ? context.params.id : 'not-valid';
    const response = await getElementInformation(elementId);
    const list = response.list

    return {
        props: { element: list },
    }
}

export async function editStatusReport(id, status) {
    await putEditStatusReport(
        id, status
    );
}

export default function EditReport({element}) {
    const [status, setStatus] = useState(element.type);

    return (
        <div className={"container"}>
            <Head>
                <title>Geo Sensor Field - Edit Report</title>
                <meta name="description" content="HackEPS2022 Project" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>

            <main className={"main"}>
                <h1 className={"title"}>
                    Editar el report {element.id}
                </h1>
                <form className={styles.formContainer}>
                    <div className={styles.formBlock}>
                        <label htmlFor="type">Tipus:</label>
                        <select name="type" id="type" className={styles.inputStyled} required disabled value={element.type}>
                            <option value="forats">Forat</option>
                            <option value="canals">Canal</option>
                        </select>
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" className={styles.inputStyled} required value={element.description} disabled/>
                    </div>


                    <div className={styles.formBlock}>
                        <label htmlFor="type">Estat:</label>
                        <select name="estatus" id="estatus" className={styles.inputStyled} required value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="OK">Està be (OK)</option>
                            <option value="BROKEN">Trencat (Broken)</option>
                            <option value="MISSING">No està (Missing)</option>
                        </select>
                    </div>
                    <button type="button" className={styles.button} onClick={() => editStatusReport(element.id, element.status)}>Create</button>
                </form>
            </main>
        </div>
    )
}
