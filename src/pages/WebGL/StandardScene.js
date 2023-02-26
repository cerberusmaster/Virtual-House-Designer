import { useContext, useEffect, useRef, useState } from "react"
import { ConfigContext } from "../../contexts/ConfigContext";
import StandardGL from "./StandardGL"
import { RoomContext } from "../../contexts/RoomContext";
import WebsocketController from "./WebSocketController";

export default function StandardScene() {
  const { config, translation, data } = useContext(ConfigContext)
  const { envIndex, setEnvIndex, colourIndex, setColourIndex, fSlots, setFSlots } = useContext(RoomContext)
  const [camPosIndex, setCamPosIndex] = useState(0)

  const { _t } = translation
  const ASSET_URL = config.PATH_ASSET + '/asset/images/gui'

  // UI states
  const [modRoomPanelVisible, setModRoomPanelVisible] = useState(false)
  const [productPanelVisible, setProductPanelVisible] = useState(false)
  const [helpPanelVisible, setHelpPanelVisible] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [wallPaintIndex, setWallPaintIndex] = useState(0)
  const [floorColorIndex, setFloorColorIndex] = useState(0)
  const [selectedFSlot, selectFSlot] = useState()
  const [exchangePanelVisible, setExchangePanelVisible] = useState(false)

  // Fullscreen
  const glView = useRef(null)

  return (
    <div className='viewer' ref={glView}>
      {/* style={fullScreen === false ? {} : { position: 'fixed', left: 0, top: 0 }} */}
      <div className='gui'>
        <div className='gui-intro'>
        </div>
        <div className='gui-simple active'>
          <div className="gui-simple-menu-main">
            {/* Bottom Tool Bar */}
            <div className="buttons-menu-holder">
              <div className="button-modify-room" style={{
                backgroundImage
                  : modRoomPanelVisible === false ? `url(${ASSET_URL}/modify-room-white.png)` : `url(${ASSET_URL}/modify-room-red.png)`
              }} onClick={() => setModRoomPanelVisible(!modRoomPanelVisible)} />
              <div className="button-modify-product" style={{
                backgroundImage
                  : productPanelVisible === false ? `url(${ASSET_URL}/modify-product-white.png)` : `url(${ASSET_URL}/modify-product-red.png)`
              }} onClick={() => setProductPanelVisible(!productPanelVisible)}></div>
              <div className="button-fullscreen" style={{
                backgroundImage
                  : fullScreen === false ? `url(${ASSET_URL}/fullscreen_expand.png)` : `url(${ASSET_URL}/fullscreen_expand.png)`
              }} onClick={() => {
                fullScreen === false ? glView.current?.requestFullscreen() :
                  document?.exitFullscreen()
                setFullScreen(!fullScreen)
              }}></div>
              {/* <div className="button-mobile-mail"></div> */}
              <div className="button-help" style={{
                backgroundImage
                  : helpPanelVisible === false ? `url(${ASSET_URL}/restart-help.png)` : `url(${ASSET_URL}/restart-help.png)`
              }} onClick={() => setHelpPanelVisible(!helpPanelVisible)}></div>
            </div>
            {/* Bottom Camera Controller */}
            <div className="large-camera-holder">
              <div className="large-camera" onClick={() => setCamPosIndex(camPosIndex - 1)}>
                <div className="icon-left" style={{ backgroundImage: `url(${config.PATH_ASSET}/asset/images/gui/large-left-arrow.png)` }}></div>
              </div>
              <div className="label">Camera Rotate</div>
              <div className="large-camera" onClick={() => setCamPosIndex(camPosIndex + 1)}>
                <div className="icon-right" style={{ backgroundImage: `url(${config.PATH_ASSET}/asset/images/gui/large-right-arrow.png)` }}></div>
              </div>
            </div>
            {/* Bottom Email Controller */}
            <div className="large-email-holder">
              <div className="email-icon" style={{
                backgroundImage
                  : `url(${ASSET_URL}/email-icon.png)`
              }} />
              <div className="text">Contact Seller</div>
            </div>
            {/* Help Panel */}
            <div className={`gui-user-helper ${helpPanelVisible === false ? '' : 'active'}`}>
              <div className="user-helper-item room active">
                <div className="arrow arrow-left"></div>
                <div className="button-close" onClick={() => setHelpPanelVisible(false)}></div>
                <div className="title">Raum anpassen</div>
              </div>
              <div className="user-helper-item product active">
                <div className="arrow arrow-left"></div>
                <div className="button-close"></div>
                <div className="title">Produktinformationen</div>
              </div>
              <div className="user-helper-item catalogue">
                <div className="arrow arrow-left"></div>
                <div className="button-close"></div>
                <div className="title">Katalog</div>
                <div className="menu">
                  <div className="menu-item active"></div>
                  <div className="menu-item"></div>
                </div>
              </div>
            </div>
            {/* Modify Room Panel */}
            <div className={`panel-modify-simple ${modRoomPanelVisible === false ? '' : 'active'}`}>
              <div className="panel-header">
                <div className="panel-title">Customize Room</div>
                <div className="icon" style={{ backgroundImage: `url(${ASSET_URL}/close-white.png)` }} onClick={() => setModRoomPanelVisible(false)}></div>
              </div>
              <div className="panel-body">
                {/* Architecture */}
                <div className="block-modify active">
                  <div className="block-title">
                    <div className="block-title-text">{_t?.architecture || "Architecture"}</div>
                    <div className="block-open-close"></div>
                  </div>
                  <div className={`block-list-item ${envIndex === 0 ? 'active' : ''}`} onClick={() => setEnvIndex(0)}>{_t?.gardenLivingRoom || "Living room with garden"}</div>
                  <div className={`block-list-item ${envIndex === 1 ? 'active' : ''}`} onClick={() => setEnvIndex(1)}>{_t?.oldStyleLivingRoom || "Living room in the old building style"}</div>
                  <div className={`block-list-item ${envIndex === 2 ? 'active' : ''}`} onClick={() => setEnvIndex(2)}>{_t?.cityLivingRoom || "Living room with city view"}</div>
                </div>
                {/* Room Style */}
                <div className="block-modify">
                  <div className="block-title">
                    <div className="block-title-text">{_t?.roomStyle || "Room style"}</div>
                    <div className="block-open-close" onClick={() => setModRoomPanelVisible(false)}></div>
                  </div>
                  <div className={`block-list-item ${colourIndex === 0 ? 'active' : ''}`} onClick={() => setColourIndex(0)}>{_t?.roomStyleBasic || "Basic"}</div>
                  <div className={`block-list-item ${colourIndex === 1 ? 'active' : ''}`} onClick={() => setColourIndex(1)}>{_t?.roomStyleScandinavian || "Scandinavian"}</div>
                  <div className={`block-list-item ${colourIndex === 2 ? 'active' : ''}`} onClick={() => setColourIndex(2)}>{_t?.roomStyleTrend || "Trend"}</div>
                </div>
                {/* Wall Paint */}
                <div className="block-modify">
                  <div className="block-title">
                    <div className="block-title-text">{_t?.wallPaint || "Wall Paint"}</div>
                    <div className="block-open-close" onClick={() => setModRoomPanelVisible(false)}></div>
                  </div>
                  <div className="pallette-list">
                    {
                      data.environments[envIndex].wallColour?.map((wall, index) => {
                        return (<div key={index} className={`palette-list-item ${wallPaintIndex === index ? 'active' : ''}`} style={{ backgroundColor: wall?.hash }} onClick={() => setWallPaintIndex(index)}></div>)
                      })
                    }
                  </div>
                </div>
                {/* Floor Color */}
                <div className="block-modify">
                  <div className="block-title">
                    <div className="block-title-text">{_t?.floorColor || "Floor Color"}</div>
                    <div className="block-open-close" style={{
                      backgroundImage
                        : `url(${ASSET_URL}/chevron-red.png)`
                    }}></div>
                  </div>
                  <div className="pallette-list">
                    {
                      data.environments[envIndex].floorColour?.map((floor, index) => {
                        return (<div key={index} className={`palette-list-item ${floorColorIndex === index ? 'active' : ''}`} style={{ background: `url(${config.PATH_WEBGL_ASSET}/ui/image/modify/${floor?.path}.jpg)` }} onClick={() => setFloorColorIndex(index)}></div>)
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="panel-bottom">
                <div className="buttons-container">
                  <div className="button-previous">Return</div>
                  <div className="button-next active" onClick={() => setModRoomPanelVisible(false)}>{_t?.toMyShowRoom || "To my showroom"}</div>
                </div>
                <div className="button" onClick={() => setModRoomPanelVisible(false)}>{_t?.toMyShowRoom || "To my showroom"}</div>
              </div>
            </div>
            {/* Modify Product Panel */}
            <div className={`panel-modify-simple ${productPanelVisible === false ? '' : 'active'}`}>
              <div className="panel-header">
                <div className="panel-title">{_t?.myProducts || "My Products"}</div>
                <div className="icon" style={{ backgroundImage: `url(${ASSET_URL}/close-white.png)` }} onClick={() => setProductPanelVisible(false)}></div>
              </div>
              <div className="panel-body product active">
                {
                  fSlots.map((slot, index) => {
                    const furnitureItem = data.furnitureItems?.find(item => item.furnitureId === slot.furniture?.furnitureId)
                    const furnitureItemColour = furnitureItem?.colour?.find(colour => colour.furnitureColourId === slot.furniture?.furnitureColourId)

                    return (
                      <div className="option" key={index}
                        style={{ backgroundImage: `url(${config.PATH_ASSET}/webgl-assets/01-Models/${furnitureItemColour?.path}/preview.jpg)` }}
                        onClick={() => {
                          // ////////////////
                          const colours = data.furnitureItems
                            ?.map((f) => f.colour
                              ?.filter((c) => c.tags === slot.tag)
                              .map((c) => ({ ...c, furnitureId: f.furnitureId }))
                            ).flat()

                          selectFSlot({ ...slot, ...furnitureItem, colour: furnitureItemColour, colours })
                          // ////////////////
                        }} >
                        <div className="dot">-</div>
                        <div className="label">{slot?.name}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div className="panel-bottom">
                <div className="button" onClick={() => setProductPanelVisible(false)}>To my showroom</div>
                <div className="buttons-container">
                  <div className="button-previous"></div>
                  <div className="button-next active" onClick={() => setProductPanelVisible(false)}>To my showroom</div>
                </div>
              </div>
            </div>
            {/* Product Exchange */}
            {
              selectedFSlot && <div className={`panel-modify-simple active`}>
                <div className="panel-header">
                  <div className="panel-title">Exchange Product</div>
                  <div className="icon"></div>
                </div>
                <div className="panel-body overview">
                  <div class="image-holder"
                    style={{ backgroundImage: `url(${config.PATH_WEBGL_ASSET}/01-Models/${selectedFSlot.colour?.path}/preview.jpg)`, position: 'relative' }}>
                  </div>
                  <div class="title-bar">
                    <div class="title">{selectedFSlot.name}</div>
                    <div class="icons"></div></div>
                  <div class="list active">
                    <div class="list-header">
                      <div class="text">Product description</div>
                      <div class="icon"></div>
                    </div>
                    <div class="list-body">
                      <div class="description">{selectedFSlot.description}</div>
                    </div>
                  </div>
                  <div class="list active">
                    <div class="list-header">
                      <div class="text">Details</div>
                      <div class="icon"></div>
                    </div>
                    <div class="list-body">
                      <div class="info-box">
                        <div class="text">Material</div>
                        <div class="value">{selectedFSlot.colour?.materialName}</div>
                      </div>
                      <div class="info-box">
                        <div class="text">Width(cm)</div>
                        <div class="value">{selectedFSlot.width}</div>
                      </div>
                      <div class="info-box">
                        <div class="text">Height(cm)</div>
                        <div class="value">{selectedFSlot.height}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel-bottom overview">
                  <div className="buttons-container overview">
                    <div className="button-previous" onClick={() => setExchangePanelVisible(true)}>&lt; Exchange Product</div>
                    <div className="button-next active" onClick={() => selectFSlot(null)}>Confirm &gt;</div>
                  </div>
                </div>
              </div>
            }
            {/* Product Exchange Sub */}
            {
              exchangePanelVisible && <div className="panel-modify-simple active">
                <div className="panel-header">
                  <div className="panel-title">Exchange Product</div>
                  <div className="icon"></div>
                </div>
                <div className="filter-section">
                  <div className="block-search">
                    <div className="search-icon"></div>
                    <input type="text" class="input" placeholder="Seek"></input>
                    <div className="clear"></div>
                  </div>
                  <div className="block-back-sort">
                    <select>
                      <option value="0">Smallest dimensions</option>
                      <option value="1">Largest dimensions</option>
                    </select>
                  </div>
                </div>
                <div className="panel-body catalogue">
                  {
                    selectedFSlot.colours?.map((colour, index) => {
                      return (<div key={index}
                        class={`option ${colour.furnitureColourId === selectedFSlot.furniture?.furnitureColourId && colour.furnitureId === selectedFSlot.furniture?.furnitureId ? 'active' : ''}`}
                        onClick={() => {
                          const slot = fSlots.find(slot => slot.tag === selectedFSlot.tag)
                          slot.furniture = { furnitureId: colour.furnitureId, furnitureColourId: colour.furnitureColourId }
                          setFSlots([...fSlots])
                          setExchangePanelVisible(false)

                          // ////////////////
                          const furnitureItem = data.furnitureItems?.find(item => item.furnitureId === slot.furniture?.furnitureId)
                          const furnitureItemColour = furnitureItem?.colour?.find(colour => colour.furnitureColourId === slot.furniture?.furnitureColourId)
                          const colours = data.furnitureItems
                            ?.map((f) => f.colour
                              ?.filter((c) => c.tags === slot.tag)
                              .map((c) => ({ ...c, furnitureId: f.furnitureId }))
                            ).flat()
                          selectFSlot({ ...slot, ...furnitureItem, colour: furnitureItemColour, colours })
                          // ////////////////
                        }}
                        style={{ backgroundImage: `url(${config.PATH_WEBGL_ASSET}/01-Models/${colour.path}/preview.jpg)` }}>
                      </div>)
                    })
                  }
                </div>
                <div className="panel-bottom">
                  <div className="button light" onClick={() => setExchangePanelVisible(false)}>Cancel</div>
                  <div className="buttons-container">
                    <div className="button-previous">&lt; Zurück</div>
                  </div>
                </div>
              </div>
            }
          </div>
          {/* <div className="gui-alert-furniture-removed active">
            <div className="title">Architektur wechseln</div>
            <div className="button-cancel">Abbrechen</div>
            <div className="button-continue">Ok</div>
          </div> */}
          {/* <div className="gui-alert-fullscreen">
            <div className="body">Klicken Sie auf OK, um Ihr Design in Vollbild zu genießen.</div>
            <div className="button-cancel">Abbrechen</div>
            <div className="button-continue">Ok</div>
          </div> */}
        </div>
        {/* <div className="gui-viewer active">
          <div className="gui-viewer-menu-main active">
            <div className="buttons-menu-holder">
              <div className="button-left-camera" onClick={() => setCamPosIndex(camPosIndex - 1)}>
                <div className="image" style={{ background: `url(${config.PATH_ASSET}/asset/images/gui/large-left-arrow.png)` }}></div>
              </div>
              <div className="button-right-camera" onClick={() => setCamPosIndex(camPosIndex + 1)}>
                <div className="image" style={{ background: `url(${config.PATH_ASSET}/asset/images/gui/large-right-arrow.png)` }}></div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className='view'>
        <StandardGL cameraPosIndex={camPosIndex} floorColourIndex={floorColorIndex} wallPaintIndex={wallPaintIndex}></StandardGL>
      </div>
      <div className={'ui'}></div>
      <div className={'overlay'}></div>
      <div className={'rendered-frame'}></div>
    </div >
  )
}
