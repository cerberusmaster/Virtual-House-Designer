import React, { useContext, useState } from "react"
import { ConfigContext } from "../../contexts/ConfigContext"
import IntroFooterButton from "../../components/IntroFooterButton"
import { createSearchParams, Link, useNavigate, useRoutes } from "react-router-dom"
import LocaleSelector from "../../components/LocaleSelector"
import { ROUTER_PATH } from "../../routes"

const ChooseMode = () => {
  const { config, translation } = useContext(ConfigContext)
  const navigate = useNavigate()
  const [mode, setMode] = useState(0)

  const t = translation.introExp || {}

  return (
    <main>
      <div className="intro-page intro-mode">
        <div style={{ marginLeft: "auto", width: "fit-content" }}>
          <LocaleSelector />
        </div>
        <div className="page-title">
          <p>{t.title || "Which type of Designer are you?"}</p>
        </div>
        <div className="page-body">
          <div className="box-container">
            <div className={`ui-box ${mode === 0 ? "active" : ""}`} onClick={() => setMode(0)}>
              <div className="title">{t.standard || "Standard Designer"}</div>
              <div className="image-holder" style={{ backgroundImage: `url('${config.PATH_ASSET}/asset/images/gui/simple-ui-thumb.png')` }}></div>
            </div>
            <div className="text">{t.standardDescription || "Optimized UI: Default setting"}</div>
          </div>
          <div className="box-container">
            <div className={`ui-box ${mode === 1 ? "active" : ""}`} onClick={() => setMode(1)}>
              <div className="title">{t.advanced || "Expert Designer"}</div>
              <div className="image-holder" style={{ backgroundImage: `url('${config.PATH_ASSET}/asset/images/gui/advanced-ui-thumb.png')` }}></div>
            </div>
            <div className="text">{t.advancedDescription || "Extended UI for Advanced Users: Free camera work and product placement"}</div>
          </div>
        </div>
        <IntroFooterButton
          onPrev={() => {
            navigate(ROUTER_PATH.CHOOSE_FURNITURE)
          }}
          onNext={() => {
            mode === 0 ?
              navigate(ROUTER_PATH.VD_STANDARD) :
              navigate(ROUTER_PATH.VD_ADVANCED)
          }}
          nextString={t.nextButton || "To my Showroom"}
        />
      </div>
    </main>
  )
}

export default ChooseMode
