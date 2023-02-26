import { useContext, useState, useRef } from "react"
import { ConfigContext } from "../../contexts/ConfigContext";
import { RoomContext } from "../../contexts/RoomContext";
import AdvancedGL from "./AdvancedGL"

export default function AdvancedScene() {
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

  const [productMenu, setProductMenu] = useState(false)
  const [proMenuTabIndex, setProMenuTabIndex] = useState(0)
  const [roomSubPanelIndex, setRoomSubPanelIndex] = useState(0)

  // Fullscreen
  const glView = useRef(null)

  return (
    <div className='viewer' ref={glView}>
      <div className='gui'>
        <div className='gui-intro'>
        </div>
        <div className="gui-advanced active">
          <div className='gui-menu-modify'>
            {/* Custom Room Button */}
            <div className='button-modify-room' style={{ backgroundImage: modRoomPanelVisible === false ? `url(${ASSET_URL}/modify-room-white.png)` : `url(${ASSET_URL}/modify-room-red.png)` }}
              onClick={() => {
                setProductPanelVisible(false);
                setModRoomPanelVisible(!modRoomPanelVisible)
              }}></div>
            {/* Custom Furniture Button */}
            <div className='button-modify-product' style={{ backgroundImage: productPanelVisible === false ? `url(${ASSET_URL}/modify-product-white.png)` : `url(${ASSET_URL}/modify-product-red.png)` }}
              onClick={() => {
                setModRoomPanelVisible(false)
                setProductPanelVisible(!productPanelVisible
                )
              }}></div>
            {/* Custom Room Panel */}
            <div className={`panel-modify ${modRoomPanelVisible === false ? '' : 'active'}`}>
              <div className="panel-title">Custom Room<div className="panel-close" onClick={() => { setModRoomPanelVisible(false) }} style={{ backgroundImage: `url(${ASSET_URL}/close-red.png)` }}></div>
              </div>
              {/* Architecture, Room Type */}
              <div className={`block-modify active ${roomSubPanelIndex === 0 ? 'open' : ''}`}>
                <div className="block-title" onClick={() => { setRoomSubPanelIndex(0) }}>
                  <div className="block-title-text">architecture</div>
                  <div className={`block-open-close ${roomSubPanelIndex === 0 ? 'active' : ''}`} style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className={`block-list-item ${envIndex === 0 ? 'highlighted' : ''}`} onClick={() => setEnvIndex(0)}>{_t?.gardenLivingRoom || "Living room with garden"}</div>
                <div className={`block-list-item ${envIndex === 1 ? 'highlighted' : ''}`} onClick={() => setEnvIndex(1)}>{_t?.oldStyleLivingRoom || "Living room in the old building style"}</div>
                <div className={`block-list-item ${envIndex === 2 ? 'highlighted' : ''}`} onClick={() => setEnvIndex(2)}>{_t?.cityLivingRoom || "Living room with city view"}</div>
              </div>
              {/* Room Style */}
              <div className={`block-modify active ${roomSubPanelIndex === 1 ? 'open' : ''}`}>
                <div className="block-title" onClick={() => { setRoomSubPanelIndex(1) }}>
                  <div className="block-title-text">room style</div>
                  <div className={`block-open-close ${roomSubPanelIndex === 1 ? 'active' : ''}`} style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className={`block-list-item ${colourIndex === 0 ? 'highlighted' : ''}`} onClick={() => setColourIndex(0)}>{_t?.roomStyleBasic || "Basic"}</div>
                <div className={`block-list-item ${colourIndex === 1 ? 'highlighted' : ''}`} onClick={() => setColourIndex(1)}>{_t?.roomStyleScandinavian || "Scandinavian"}</div>
                <div className={`block-list-item ${colourIndex === 2 ? 'highlighted' : ''}`} onClick={() => setColourIndex(2)}>{_t?.roomStyleTrend || "Trend"}</div>
              </div>
              {/* Wall Colour */}
              <div className={`block-modify active ${roomSubPanelIndex === 2 ? 'open' : ''}`}>
                <div className="block-title" onClick={() => { setRoomSubPanelIndex(2) }}>
                  <div className="block-title-text">wall paint</div>
                  <div className={`block-open-close ${roomSubPanelIndex === 1 ? 'active' : ''}`} style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="pallette-list">
                  {
                    data.environments[envIndex].wallColour?.map((wall, index) => {
                      return (<div key={index} className={`palette-list-item ${wallPaintIndex === index ? 'highlighted' : ''}`} style={{ backgroundColor: wall?.hash }} onClick={() => setWallPaintIndex(index)}></div>)
                    })
                  }
                </div>
              </div>
              {/* Floor Colour */}
              <div className={`block-modify active ${roomSubPanelIndex === 3 ? 'open' : ''}`}>
                <div className="block-title" onClick={() => { setRoomSubPanelIndex(3) }}>
                  <div className="block-title-text">floor colour</div>
                  <div className={`block-open-close ${roomSubPanelIndex === 1 ? 'active' : ''}`} style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="pallette-list">
                  {
                    data.environments[envIndex].floorColour?.map((floor, index) => {
                      return (<div key={index} className={`palette-list-item ${floorColorIndex === index ? 'highlighted' : ''}`} style={{ background: `url(${config.PATH_WEBGL_ASSET}/ui/image/modify/${floor?.path}.jpg)` }} onClick={() => setFloorColorIndex(index)}></div>)
                    })
                  }
                </div>
              </div>
            </div>
            {/* Custom Furniture Panel */}
            <div className={`panel-modify ${productPanelVisible === false ? '' : 'active'}`}>
              <div className="panel-title">
                Product Information
                <div className="panel-close" onClick={() => setProductPanelVisible(false)} style={{ backgroundImage: `url(${ASSET_URL}/close-red.png)` }}></div>
              </div>
              <div className="block-product-name active">Chair Bert Plantagie Maple dark blue
              </div>
              <div className="block-modify active">
                <div className="block-title">
                  <div className="block-title-text">Product description
                  </div>
                  <div className="block-open-close" style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="product-description">
                  The organic-looking, straight-shaped Maple chair looks almost
                  modeled and is a real eye-catcher thanks to its simplicity, designed by Frans Schrofer. In the latter case,
                  the armrest of this piece of furniture looks
                  like it has been cut off.
                </div>
              </div>
              <div className="block-modify">
                <div className="block-title">
                  <div className="block-title-text">
                    Multiple colors
                  </div>
                  <div className="block-open-close" style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="product-options active"></div>
                <div className="dialog-replace-multiple-items">
                  <div className="option">
                    Exchange all
                  </div>
                  <div className="option">
                    Replace single product
                  </div>
                </div>
              </div>
              <div className="block-modify active">
                <div className="block-title">
                  <div className="block-title-text">
                    details
                  </div>
                  <div className="block-open-close" style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="product-detail-item">
                  <div className="product-detail-item-title">
                    Material:
                  </div>
                  <div className="product-detail-item-content selectable">
                    Leather Bold Blue LB1011
                  </div>
                </div>
                <div className="product-detail-item">
                  <div className="product-detail-item-title">
                    Broad:
                  </div>
                  <div className="product-detail-item-content selectable">
                    87.5cm
                  </div>
                </div>
                <div className="product-detail-item">
                  <div className="product-detail-item-title">
                    Depth:
                  </div>
                  <div className="product-detail-item-content selectable">
                    46cm
                  </div>
                </div>
                <div className="product-detail-item">
                  <div className="product-detail-item-title">
                    Height:
                  </div>
                  <div className="product-detail-item-content selectable">
                    87.5cm
                  </div>
                </div>
                <div className="product-detail-item">
                  <div className="product-detail-item-title">
                    Article no.:
                  </div>
                  <div className="product-detail-item-content selectable"></div>
                </div>
              </div>
              <div className="block-modify open active">
                <div className="block-title">
                  <div className="block-title-text">
                    exchange product
                  </div>
                  <div className="block-open-close active" style={{ backgroundImage: `url(${ASSET_URL}/chevron-red.png)` }}></div>
                </div>
                <div className="product-options scroller active" style={{ height: 333 }}>
                  <div className="product-option-item">
                    <img className="image-holder" style={{ backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Chairs/BertPlantagie_Nevio_V_1441_Grey-Yellow/preview.jpg" }} />
                  </div>
                  <div className="product-option-item">
                    <img className="image-holder" style={{ backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Chairs/Mondo_Floro_Darkbrown/preview.jpg" }} />
                  </div>
                </div>
                <div className="dialog-replace-multiple-items">
                  <div className="option">Exchange all
                  </div>
                  <div className="option">Replace single product
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gui-menu-fullscreen" style={{
            backgroundImage
              : fullScreen === false ? `url(${ASSET_URL}/fullscreen_expand.png)` : `url(${ASSET_URL}/fullscreen_expand.png)`
          }} onClick={() => {
            fullScreen === false ? glView.current?.requestFullscreen() :
              document?.exitFullscreen()
            setFullScreen(!fullScreen)
          }}></div>
          {/* Help */}
          <div className="gui-user-helper">
            <div className="button-restart" style={{ backgroundImage: `url(${ASSET_URL}/restart-help.png)` }}></div>
            <div className="user-helper-item room">
              <div className="arrow arrow-left"></div>
              <div className="button-close"></div>
              <div className="title">Raum anpassen</div>
            </div>
            <div className="user-helper-item product">
              <div className="arrow arrow-left"></div>
              <div className="button-close"></div>
              <div className="title">Produktinformationen</div>
            </div>
            <div className="user-helper-item catalogue">
              <div className="arrow arrow-right"></div>
              <div className="button-close"></div>
              <div className="title">Katalog</div>
              <div className="menu">
                <div className="menu-item active"></div>
                <div className="menu-item"></div>
              </div>
            </div>
            <div className="user-helper-item history">
              <div className="arrow arrow-right"></div>
              <div className="button-close"></div>
              <div className="title">Verlauf</div>
            </div>
          </div>

          {/* Product Menu */}
          <div className="gui-menu-catalog-open-close active" onClick={() => setProductMenu(!productMenu)}>
            product menu
            <div className="arrow active" style={{ backgroundImage: `url(${ASSET_URL}/chevron-white.png)` }}></div>
          </div>
          <div class={`gui-menu-catalog ${productMenu === true ? 'active' : ''}`}>
            {/* Tab Header */}
            <div class={`button-catalogue ${proMenuTabIndex === 0 ? 'active' : ''}`} onClick={() => setProMenuTabIndex(0)}>
              Catalog
            </div>
            <div class={`button-history ${proMenuTabIndex === 1 ? 'active' : ''}`} onClick={() => setProMenuTabIndex(1)}>
              Course
            </div>
            {/* Tab Catalog */}
            <div class={`panel-catalogue ${proMenuTabIndex === 0 ? 'active' : ''}`}>
              <div className="block-search">
                <div className="search-icon"></div>
                <input type="text" className="input" placeholder="Seek" />
                <div className="clear"></div>
              </div>
              <div className="block-tag-list-holder active">
                <div className="block-tag-list">
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/sofa.jpg"
                    }} />
                    <div className="title">
                      SOFAS
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/armchair.jpg"
                    }} />
                    <div className="title">
                      ARMCHAIR
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/chair.jpg"
                    }} />
                    <div className="title">
                      CHAIRS
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/tvunit.jpg"
                    }} />
                    <div className="title">
                      BOX FURNITURE
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/floorlamp.jpg"
                    }} />
                    <div className="title">
                      FLOOR LIGHTS
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/rug.jpg"
                    }} />
                    <div className="title">
                      CARPETS
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/sidetable.jpg"
                    }} />
                    <div className="title">
                      COFFEE TABLES
                    </div>
                  </div>
                  <div className="block-list-item"><img className="thumbnail"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/ui/image/tag/diningtable.jpg"
                    }} />
                    <div className="title">
                      DINING TABLES
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-furniture-list-holder">
                <div className="block-back-sort">
                  <div className="button-back">
                    &lt; Back
                  </div><select>
                    <option value="0">
                      smallest dimensions
                    </option>
                    <option value="1">
                      largest dimensions
                    </option>
                  </select>
                </div>
                <div className="block-furniture-list active"></div>
              </div>
            </div>
            {/* Tab History */}
            <div class={`panel-history ${proMenuTabIndex === 1 ? 'active' : ''}`}>
              <div className="block-furniture-list-holder history active">
                <div className="block-furniture-list active">
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Dining_Tables/Mondo_Tavolo_Oak/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Chairs/BertPlantagie_Maple_Darkblue/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Floorlamps/EINR-0001_Floorlamp_StehleuchteBlake_Trendhopper/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Rugs/EINR-0021_Carpet_TeppichLago_Trendhopper/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Sidetables/EINR-0087_Bundles_BeistelltischClaroAylaGusta_Trendhopper/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/TV_Units/Mondo_Artist_011_Cabinet_Olive/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/TV_Units/Musterring_Kara_Frame_Lowboard_Wood/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/TV_Units/Mondo_Artist_011_Highboard_Salmon/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/TV_Units/Mondo_Artist_011_Highboard_Olive/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                  <div className="block-list-item"><img className="image-holder"
                    style={{
                      backgroundImage: "https://virtual-designer.davea.de/webgl-assets/01-Models/Sofas/EINR-0015_Sofa_SofaVik_Trendhopper/preview.jpg"
                    }} />
                    <div className="button-remove active"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gui-menu-social">
            <div className="button-social sales">Contact Seller</div>
          </div>
        </div>
      </div>
      <div className='view'>
        <AdvancedGL cameraPosIndex={camPosIndex} floorColourIndex={floorColorIndex} wallPaintIndex={wallPaintIndex}></AdvancedGL>
      </div>
      <div className={'ui'}></div>
      <div className={'overlay'}></div>
      <div className={'rendered-frame'}></div>
    </div>
  )
}
