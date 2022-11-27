import Head from "next/head";
import styles from "../../styles/List.module.css";
import CardHoleContent from "../../components/cardHoleContent";
import CardCanalContent from "../../components/cardCanalContent";
import {getListOfAllElements} from "../../services/apiCalls";

export async function getServerSideProps(context) {
    const elements = await getListOfAllElements();

    const holes = elements.list.forats.slice(0, 200);
    const canals = elements.list.canals.slice(0, 200);

    return {
        props: { forats: holes, canals: canals },
    }
}

function getHoleCard(photo, description, lat, lng, status, id) {
    let cardStyle = styles.card;
    if (status === "BROKEN") {
        cardStyle = styles.cardBroken;
    } else if (status === "MISSING") {
        cardStyle = styles.cardMissing;
    }
    return (
        <div className={cardStyle} key={id}>
            <CardHoleContent
                description={description}
                lat={lat}
                long={lng}
                photo={"/placeholder.jpeg"}
            />
        </div>
    );
}

function getCanalCard(photo, description, coords, status, id) {
    let cardStyle = styles.card;
    if (status === "BROKEN") {
        cardStyle = styles.cardBroken;
    } else if (status === "MISSING") {
        cardStyle = styles.cardMissing;
    }
    return (
        <div className={cardStyle} key={id}>
            <CardCanalContent
                description={description}
                latInicial={coords[0].lat}
                longInicial={coords[0].lng}
                latFinal={coords[coords.length-1].lat}
                longFinal={coords[coords.length-1].lng}
                photo={"/placeholder.jpeg"}
            />
        </div>
    );
}



export default function List({ forats, canals }) {
    return (
        <div className={"container"}>
            <Head>
                <title>Geo Sensor Field - Sensors list</title>
                <meta name="description" content="HackEPS2022 Project" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={"main"}>
                <h1 className={"title"}>
                    Sensors List
                </h1>

                <div className={styles.wrapper}>
                    <div className={styles.tabs}>
                        <div className={styles.tab}>
                            <input type="radio" name="css-tabs" id="tab-1" checked className={styles.tabSwitch} />
                            <label htmlFor="tab-1" className={styles.tabLabel}>Llistat de forats</label>
                            <div className={styles.tabContent}>
                                {forats.map((item) => (
                                    getHoleCard(item.photo, item.description, item.lat, item.lng, item.status, item.id)
                                ))}
                            </div>
                        </div>
                        <div className={styles.tab}>
                            <input type="radio" name="css-tabs" id="tab-2" className={styles.tabSwitch} />
                            <label htmlFor="tab-2" className={styles.tabLabel}>Llistat de canals</label>
                            <div className={styles.tabContent}>
                                {canals.map((item) => (
                                    getCanalCard(item.photo, item.description, item.coords, item.status, item.id)
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    )
}
