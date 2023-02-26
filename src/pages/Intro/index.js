import React, { useContext } from "react"
import { ConfigContext } from "../../contexts/ConfigContext"
import { useNavigate } from "react-router-dom"
import LocaleSelector from "../../components/LocaleSelector"
import { ROUTER_PATH } from "../../routes"

const Intro = () => {
  const { config, translation } = useContext(ConfigContext)
  const t = translation.intro || {}
  const navigate = useNavigate()

  const options = [
    { icon: `url(${config.PATH_ASSET}/asset/images/gui/vd-home.png)`, label: t.yourRoom || "Your Room" },
    { icon: `url(${config.PATH_ASSET}/asset/images/gui/vd-paint.png)`, label: t.yourStyle || "Your Style" },
    { icon: `url(${config.PATH_ASSET}/asset/images/gui/vd-sofa.png)`, label: t.yourFurniture || "Your Furniture" },
    { icon: `url(${config.PATH_ASSET}/asset/images/gui/vd-cart.png)`, label: t.yourDesign || "Your Design" },
  ]
  return (
    <main>
      <div className="intro-page intro-intro">
        <div style={{ marginLeft: "auto", width: "fit-content" }}>
          <LocaleSelector />
        </div>
        <div className="page-title">
          <p>
            {t.title || "Welcome to the Virtual Designer!"}
          </p>
        </div>
        <div className="option-holder-intro">
          {options.map((option, index) => (
            <div className="option-item-intro" key={option.label}>
              <div className="option-number-intro">{index + 1}</div>
              <div
                className="option-image-intro home"
                style={{ background: option.icon }}
              />
              <div className="option-label-intro">{option.label}</div>
            </div>
          ))}
        </div>
        <div className="button-intro" onClick={() => navigate(ROUTER_PATH.CHOOSE_ENV)}>{t.button}</div>
      </div>
    </main>
  )
}

export default Intro
