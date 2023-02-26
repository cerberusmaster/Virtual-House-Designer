import { createContext, useContext, useEffect, useState } from "react"
import { ConfigContext } from "./ConfigContext"

export const RoomContext = createContext({})

export const RoomContextProvider = ({ children }) => {
  const [envIndex, setEnvIndex] = useState(0)
  const [colourIndex, setColourIndex] = useState(0)
  const [fSlots, setFSlots] = useState([])
  const [furnitures, setFurnitures] = useState([])
  const { data } = useContext(ConfigContext)

  useEffect(() => {
    initFurnitures()
  }, [envIndex, colourIndex, fSlots])

  useEffect(() => {
    const slots = []
    data.environments?.at(envIndex)?.furnitureSlots?.map((s) => slots.push({
      name: s.name,
      tag: s.tag,
      items: s.items,
      furniture: s.colour?.at(colourIndex),
    }))
    setFSlots(slots)
  }, [envIndex, colourIndex])

  const initFurnitures = () => {
    const furnitures = []
    // slot furnitures
    fSlots.forEach((slot) => {
      slot.items?.forEach((item) => {
        const furnitrueItem = data.furnitureItems?.find((item) => item.furnitureId === slot.furniture?.furnitureId)
        const furnitureItemColour = furnitrueItem.colour?.find((colour) => colour.furnitureColourId === slot.furniture?.furnitureColourId)
        furnitures.push({ ...slot.furniture, ...item, colour: furnitureItemColour })
      })
    })
    // preload furnitures
    const furniturePrePlaced = data?.environments[envIndex]?.furniturePrePlaced?.find(prePlaced => prePlaced.environmentColourId === colourIndex)
    furniturePrePlaced?.items?.map((preplacedItem) => {
      const furnitrueItem = data.furnitureItems?.find((item) => item.furnitureId === preplacedItem.furnitureId)
      const furnitureItemColour = furnitrueItem.colour?.find((colour) => colour.furnitureColourId === preplacedItem.furnitureColourId)
      furnitures.push({ ...preplacedItem, colour: furnitureItemColour })
    })
    setFurnitures(furnitures)
    console.log("furnitures updated:", fSlots, furnitures)
  }

  return (
    <RoomContext.Provider
      value={{
        envIndex,
        setEnvIndex,
        colourIndex,
        setColourIndex,
        fSlots,
        setFSlots,
        furnitures,
        setFurnitures,
        initFurnitures,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}