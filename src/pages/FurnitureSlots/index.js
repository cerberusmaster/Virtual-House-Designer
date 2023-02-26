import React, { useContext, useState } from "react"
import { ConfigContext } from "../../contexts/ConfigContext"
import { RoomContext } from "../../contexts/RoomContext"
import IntroFooterButton from "../../components/IntroFooterButton"
import { useNavigate } from "react-router-dom"
import LocaleSelector from "../../components/LocaleSelector"
import FurnitureDialog from "./FurnitureDialog"
import { ROUTER_PATH } from "../../routes"

const FurnitureSlots = () => {
  const { config, data, translation } = useContext(ConfigContext)
  const { envIndex, colourIndex, fSlots, setFSlots } = useContext(RoomContext)
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)
  const [sIndex, setSIndex] = useState(0)

  const t = translation.intro || {}
  const title = t.furnitureTitle || "Keep the {{envColor}} product combination or swap products in each category"

  return (
    <main>
      <div className="intro-page intro-furniture">
        <div style={{ marginLeft: "auto", width: "fit-content" }}>
          <LocaleSelector />
        </div>
        <div className="furniture-page-title">
          {title.split("{{envColor}}")[0]}
          <span>{data?.environments[envIndex].colour[colourIndex].name}</span>
          {title.split("{{envColor}}")[1]}
        </div>
        <div className="furniture-subtitle">
          {t.furnitureSubtitle || "To exchange, click on a category"}
        </div>
        <div className="slots-container">
          {fSlots.map(({ furniture, ...s }, index) => {
            const fColour = data.furnitureItems
              ?.find((f) => f.furnitureId === furniture?.furnitureId)?.colour
              .find((c) => c.furnitureColourId === furniture?.furnitureColourId)

            return (
              <div
                key={index}
                className="option"
                style={{ backgroundImage: fColour && `url('${config.PATH_WEBGL_ASSET}/01-Models/${fColour?.path}/preview.jpg')` }}
                onClick={() => {
                  setOpen(true)
                  setSIndex(index)
                }}
              >
                <div className="border"></div>
                <div className="dot" onClick={(e) => {
                  e.stopPropagation()
                  setFSlots(fSlots.slice(0, index).concat(s, fSlots.slice(index + 1)))
                }}>—</div>
                <div className="label">{s.name}</div>
              </div>
            )
          })}
        </div>
        <FurnitureDialog
          open={open}
          slotIndex={sIndex}
          handleClose={() => setOpen(false)}
          handleConfirm={(f) => {
            setFSlots(fSlots.slice(0, sIndex).concat({ ...fSlots[sIndex], furniture: f }, fSlots.slice(sIndex + 1)))
            setOpen(false)
          }}
        />
        <IntroFooterButton
          onPrev={() => {
            navigate(ROUTER_PATH.CHOOSE_COLOUR)
          }}
          onNext={() => {
            navigate(ROUTER_PATH.CHOOSE_MODE)
          }}
        />
      </div>
    </main>
  )
}

export default FurnitureSlots
