import { createContext, useEffect, useState } from "react"
import localData from './../asset/data.json'

export const ConfigContext = createContext({})

export const ConfigContextProvider = ({ children }) => {
  const [config, setConfig] = useState({})
  const [data, setData] = useState(localData)
  const [translation, setTranslation] = useState(null)
  const [colour, setColour] = useState("#7f187f")
  const [lang, setLang] = useState("en")
  const [languages, setLanguages] = useState(["en"])

  useEffect(() => {
    const t = document.getElementsByTagName("virtual-designer")[0]
    const langs = t.getAttribute("data-languages")?.split(",") || ["en"]
    setConfig({
      PATH_WEBSOCKET: t.getAttribute("data-path-websocket"),
      PATH_DATA: t.getAttribute("data-path-data"),
      PATH_TRANSLATION: t.getAttribute("data-path-translation"),
      PATH_ASSET: t.getAttribute("data-path-asset"),
      PATH_WEBGL_ASSET: t.getAttribute("data-path-webgl-asset"),
      PATH_LOAD_ROOM: "https://".concat(t.getAttribute("data-path-websocket").replace("ws-web", ""), "load-room"),
      DO_ANALYTICS: (t.getAttribute("data-do-analytics") === "true"),
    })
    setColour(t.getAttribute("data-primary-colour"))
    setLanguages(langs)
    setLang(langs[0])
  }, [])

  useEffect(() => {
    if (config.PATH_DATA) {
      try {
        fetch(config.PATH_DATA.replace(/\.json$/i, `.${lang}.json`))
          .then((resp) => resp.json())
          .then((data) => setData(data))
          .catch(_ => {
            fetch(config.PATH_DATA)
              .then((resp) => resp.json())
              .then((data) => setData(data))
              .catch(err => {
                console.error(err)
                setData(null)
              })
          })
      } catch (e) {
      }
    }
  }, [config.PATH_DATA, lang])

  useEffect(() => {
    if (config.PATH_TRANSLATION) {
      fetch(config.PATH_TRANSLATION + lang + ".json")
        .then((resp) => resp.json())
        .then((data) => setTranslation(data))
        .catch(err => console.error(err))
    }
  }, [config.PATH_TRANSLATION, lang])

  return (
    <ConfigContext.Provider
      value={{
        config,
        data,
        translation,
        lang,
        setLang,
        languages,
      }}
    >
      <style>
        {`virtual-designer {
          --colour-highlight: ${colour};
        }`}
      </style>
      {(config.PATH_ASSET && data && translation) ? children : (
        <></>
      )}
    </ConfigContext.Provider>
  )
}