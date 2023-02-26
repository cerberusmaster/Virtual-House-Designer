import React, { useContext, useEffect, useMemo, useState } from "react"
import { ConfigContext } from "../../contexts/ConfigContext"
import { RoomContext } from "../../contexts/RoomContext"

const FurnitureDialog = ({ open, slotIndex, handleClose, handleConfirm }) => {
  const { config, data, translation } = useContext(ConfigContext)
  const { fSlots } = useContext(RoomContext)

  const [selected, setSelected] = useState({})

  const t = translation.productMenu || {}

  const furnitures = useMemo(() =>
    data.furnitureItems
      ?.map((f) => f.colour
        ?.filter((c) => c.tags === fSlots[slotIndex].tag)
        .map((c) => ({ ...c, furnitureId: f.furnitureId }))
      ).flat(), [data, fSlots, slotIndex])

  useEffect(() => {
    setSelected(fSlots[slotIndex].furniture)
  }, [fSlots, slotIndex])

  return (
    <div className={`furniture-dialog ${open ? "open" : ""}`}>
      <div className="dialog-title">
        {fSlots[slotIndex]?.name}
        <div
          className="close-button"
          onClick={() => handleClose()}
        />
      </div>
      <div className="furniture-container">
        {furnitures.map((f) => (
          <div
            className={`option ${f.furnitureId === selected.furnitureId && f.furnitureColourId === selected.furnitureColourId ? "selected" : ""}`}
            style={{ backgroundImage: `url('${config.PATH_WEBGL_ASSET}/01-Models/${f.path}/preview.jpg')` }}
            key={f.furnitureId + "-" + f.furnitureColourId}
            onClick={() => setSelected({
              furnitureId: f.furnitureId,
              furnitureColourId: f.furnitureColourId,
            })}
          />
        ))}
      </div>
      <div className="confirm-button" onClick={() => handleConfirm(selected)}>
        {t.confirm || "Confirm"} &gt;
      </div>
    </div>
  )
}

export default FurnitureDialog
