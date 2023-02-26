import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from '../pages/Intro'
import ChooseEnv from '../pages/ChooseEnv'
import ChooseColour from '../pages/ChooseColour'
import FurnitureSlots from '../pages/FurnitureSlots'
import ChooseMode from '../pages/ChooseMode'
import { StandardScene, AdvancedScene } from '../pages/WebGL'

const ROUTER_PATH = {
  HOME: '/',
  CHOOSE_ENV: '/choose-env',
  CHOOSE_COLOUR: '/choose-colour',
  CHOOSE_FURNITURE: '/furniture-slots',
  CHOOSE_MODE: '/choose-mode',
  VD_STANDARD: '/vd-standard',
  VD_ADVANCED: '/vd-advance',
}

const Main = () => {
  return (
    <Routes>
      <Route exact path={ROUTER_PATH.HOME} element={<Intro />} />
      <Route exact path={ROUTER_PATH.CHOOSE_ENV} element={<ChooseEnv />} />
      <Route exact path={ROUTER_PATH.CHOOSE_COLOUR} element={<ChooseColour />} />
      <Route exact path={ROUTER_PATH.CHOOSE_FURNITURE} element={<FurnitureSlots />} />
      <Route exact path={ROUTER_PATH.CHOOSE_MODE} element={<ChooseMode />} />
      <Route exact path={ROUTER_PATH.VD_STANDARD} element={<StandardScene />} />
      <Route exact path={ROUTER_PATH.VD_ADVANCED} element={<AdvancedScene />} />
    </Routes>
  )
}

export { Main, ROUTER_PATH }
