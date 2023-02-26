import React, { useContext } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import { ConfigContext } from "../../contexts/ConfigContext"
import { RoomContext } from "../../contexts/RoomContext"
import IntroFooterButton from "../../components/IntroFooterButton"
import { useNavigate } from "react-router-dom"
import LocaleSelector from "../../components/LocaleSelector"
import { ROUTER_PATH } from "../../routes"

const ChooseColour = () => {
  const { config, data, translation } = useContext(ConfigContext)
  const { envIndex, colourIndex, setColourIndex, setFSlots } = useContext(RoomContext)
  const navigate = useNavigate()

  const [swiperRef, setSwiperRef] = React.useState(null)

  const t = translation.intro || {}

  return (
    <main>
      <div className="intro-page intro-colour">
        <div style={{ marginLeft: "auto", width: "fit-content" }}>
          <LocaleSelector />
        </div>
        <div className="page-title">
          <p>{t.envColorTitle || "Choose a room style"}</p>
        </div>
        <Swiper
          slidesPerView={"auto"}
          centeredSlides
          slidesp="true"
          loop
          spaceBetween={30}
          className="swiper"
          onSwiper={setSwiperRef}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          initialSlide={colourIndex}
        >
          {data.environments?.at(envIndex).colour.map((colour, index) => (
            <SwiperSlide
              key={colour.environmentColourId}
              onClick={(e) => {
                if ((swiperRef.realIndex + 1) % data.environments.length === index) {
                  swiperRef.slideNext()
                } else if ((index + 1) % data.environments.length === swiperRef.realIndex) {
                  swiperRef.slidePrev()
                }
              }}
            >
              <div className="">
                <div className="title">{colour.name}</div>
                <div className="image-holder">
                  <img
                    src={`${config.PATH_WEBGL_ASSET}/ui/intro/environment_${data.environments[envIndex].environmentId}_colour_${colour.environmentColourId + 1}.jpg`}
                    alt=""
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <IntroFooterButton
          onPrev={() => {
            setColourIndex(swiperRef.realIndex)
            navigate(ROUTER_PATH.CHOOSE_ENV)
          }}
          onNext={() => {
            setColourIndex(swiperRef.realIndex)
            const slots = []
            data.environments?.at(envIndex)?.furnitureSlots?.map((s) => slots.push({
              name: s.name,
              tag: s.tag,
              items: s.items,
              furniture: s.colour?.at(colourIndex),
            }))
            setFSlots(slots)
            navigate(ROUTER_PATH.CHOOSE_FURNITURE)
          }}
        />
      </div>
    </main>
  )
}

export default ChooseColour
