import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  <head>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
  </head>
  return <Component {...pageProps} />
}

export default MyApp
