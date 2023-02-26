import { useContext } from "react"
import { ConfigContext } from "../contexts/ConfigContext"

const IntroFooterButton = ({ onPrev, onNext, nextString = "" }) => {
  const { translation } = useContext(ConfigContext)

  return (
    <div className="buttons-container">
      <div className="button-previous" onClick={() => onPrev()}>
        &lt; {translation.global?.back || "Back"}
      </div>
      <div className={`button-next active`} onClick={() => onNext()}>
        {nextString || <>{translation.global?.next || "Next"} &gt;</>}
      </div>
    </div>
  )
}

export default IntroFooterButton
