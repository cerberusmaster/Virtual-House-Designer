import React, { useContext, useEffect, useRef, useState } from "react"
import { ConfigContext } from "../contexts/ConfigContext"
import Flag from 'react-world-flags'

const langToCode = {
  en: "GB",
  de: "DE"
}
const LocaleSelector = () => {
  const { lang, setLang, languages } = useContext(ConfigContext)
  const [open, setOpen] = useState(false)
  const selectorRef = useRef(null)

  useEffect(() => {
    const handleClickAway = (e) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    window.addEventListener("click", handleClickAway)

    return () => window.removeEventListener("click", handleClickAway)
  }, [])
  return (
    <div className="lang-selector" ref={selectorRef}>
      <div className={`selector option ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
        <Flag code={langToCode[lang] || lang} width={34} height={16} />
        <span>{lang}</span>
      </div>
      <div className={`menu ${open ? "open" : ""}`}>
        {languages.map((l) => (
          <div
            key={l}
            className="option"
            onClick={() => {
              setLang(l)
              setOpen(false)
            }}
          >
            <Flag code={langToCode[l] || l} width={34} height={16} />
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocaleSelector
