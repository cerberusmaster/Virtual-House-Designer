import React, { useContext } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import { ConfigContext } from "../../contexts/ConfigContext"
import { RoomContext } from "../../contexts/RoomContext"
import IntroFooterButton from "../../components/IntroFooterButton"
import { useNavigate } from "react-router-dom"
import LocaleSelector from "../../components/LocaleSelector"
import { ROUTER_PATH } from "../../routes"

const ChooseEnv = () => {
  const { config, data, translation } = useContext(ConfigContext)
  const { envIndex, setEnvIndex } = useContext(RoomContext)
  const navigate = useNavigate()

  const [swiperRef, setSwiperRef] = React.useState(null)

  const t = translation.intro || {}

  return (
    <main>
      <div className="intro-page intro-environment">
        <div style={{ marginLeft: "auto", width: "fit-content" }}>
          <LocaleSelector />
        </div>
        <div className="page-title">
          <p>{t.envTitle || "Choose a floor plan"}</p>
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
          initialSlide={envIndex}
        >
          {data.environments?.map((env, index) => (
            <SwiperSlide
              key={env.environmentId}
              onClick={(e) => {
                if ((swiperRef.realIndex + 1) % data.environments.length === index) {
                  swiperRef.slideNext()
                } else if ((index + 1) % data.environments.length === swiperRef.realIndex) {
                  swiperRef.slidePrev()
                }
              }}
            >
              <div className="">
                <div className="title">{env.name}</div>
                <div className="image-holder">
                  <img
                    className="plan-image"
                    src={`${config.PATH_WEBGL_ASSET}/ui/intro/environment_plan_${env.environmentId}.jpg`}
                    alt=""
                  />
                  <img
                    className="render-image"
                    src={`${config.PATH_WEBGL_ASSET}/ui/intro/environment_render_${env.environmentId}.jpg`}
                    alt=""
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <IntroFooterButton
          onPrev={() => {
            setEnvIndex(swiperRef.realIndex)
            navigate(ROUTER_PATH.HOME)
          }}
          onNext={() => {
            setEnvIndex(swiperRef.realIndex)
            navigate(ROUTER_PATH.CHOOSE_COLOUR)
          }}
        />
      </div>
    </main>
  )
}

export default ChooseEnv
