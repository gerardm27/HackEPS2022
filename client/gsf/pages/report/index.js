import Head from "next/head";
import styles from "../../styles/Report.module.css";
import {postCreateNewReport} from "../../services/apiCalls";
import {useState, useEffect} from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import Link from 'next/link';



export async function createNewReport(tipus, description, status, latitud, longitud, image) {
    event.preventDefault();
    const latituds = latitud.split(",");
    const longituds = longitud.split(",");
    let coords = []
    image = image.split('data:image/jpeg;base64,')[1];
    description = JSON.stringify(description);
    for (let i = 0; i < latituds.length; ++i) {
        coords.push({
            lat: latituds[i],
            long: longituds[i]
        })
    }

    await postCreateNewReport(
        tipus,
        coords,
        description,
        status,
        image
    );
}



const takePhoto = () => {
    event.preventDefault();
    const imageSrc = getScreenshot();
    console.log(imageSrc);
};

export default function Report() {
    const [type, setType] = useState('forats');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('OK');
    const [longitud, setLongitud] = useState('');
    const [latitud, setLatitud] = useState('');
    const [image, setImage] = useState(null);
    
    let insideCamera = true;
    let videoConstraints;
    useEffect(() => {
        if(insideCamera) {
            videoConstraints = {
                facingMode: "user"
            };
        }
        else {
            videoConstraints = {
                facingMode: {exact: "environment"}
            };

        };
    }, [insideCamera]);

    return (
        <div className={"container"}>
            <Head>
                <title>Geo Sensor Field - Sensors list</title>
                <meta name="description" content="HackEPS2022 Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"main"}>
                <h1 className={"title"}>
                    Nou avís
                </h1>
                <form className={styles.formContainer}>
                    <div className={styles.formBlock}>
                        <label htmlFor="type">Tipus:</label>
                        <select name="type" id="type" defaultValue={"forats"} className={styles.inputStyled} required onChange={e => setType(e.target.value)} >
                            <option value="forats">Forat</option>
                            <option value="canals">Canal</option>
                        </select>
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" className={styles.inputStyled} required onChange={e => setDescription(e.target.value)}/>
                    </div>

                    
                    <div className={styles.formBlock}>
                        <label htmlFor="type">Estat:</label>
                        <select name="estatus" id="estatus" defaultValue={"OK"} className={styles.inputStyled} required onChange={e => setStatus(e.target.value)}>
                            <option value="OK">Està be (OK)</option>
                            <option value="BROKEN">Trencat (Broken)</option>
                            <option value="MISSING">No està (Missing)</option>
                        </select>
                    </div>


                    <div className={styles.formBlock}>
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" className={styles.inputStyled} required onChange={e => setLatitud(e.target.value)}/>
                    </div>

                    <div className={styles.formBlock}>
                        <label htmlFor="longitud">Longitud:</label>
                        <input type="text" id="longitud" name="longitud" className={styles.inputStyled} required onChange={e => setLongitud(e.target.value)}/>
                    </div>

                    {image ?
                        <>
                            <Image src={image} className={styles.cameraFrame} width={300} height={200} alt={"image"}></Image>
                            <button
                                type = "button"
                                onClick={() => {
                                    setImage(null)
                                }}
                                className={styles.buttonOutline}
                            >
                                Torna a fer la foto
                            </button>
                        </>
                        :
                        <>
                            <Webcam
                                audio={false}
                                //height={720}
                                screenshotFormat="image/jpeg"
                                //width={1280}
                                videoConstraints={videoConstraints}
                                className={styles.cameraFrame}
                            >
                                {({getScreenshot}) => (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const imageSrc = getScreenshot()
                                            setImage(imageSrc)
                                        }}
                                        className={styles.button}
                                    >
                                        Fer fotografía
                                    </button>
                                )}
                            </Webcam>
                            <button
                                type = "button"
                                onClick={() => {
                                    insideCamera = !insideCamera;
                                }}
                                className={styles.buttonOutline}
                            >
                                Canviar càmera
                            </button>
                        </>
                    }

                    <span className={styles.tip}>
                        *Per introduir un canal, introdueix tantes latituds i longituds com vulguis per marcar el canal, ha de ser més de una (separades per comes)
                    </span>
                    <Link href='/list'>
                        <button type="submit" className={styles.button} onClick={() => createNewReport(type, description, status, latitud, longitud, image)}>Crear</button>
                    </Link>
                </form>
            </main>
        </div>
    )
}
