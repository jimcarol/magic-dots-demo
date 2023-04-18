import { useState, useEffect } from 'react'
import MagicDots from '../components/MagicDots'
import Carousel from '../components/Carousel'

const MyLuckNo = () => {
  const [randomNumber, setRandomNumber] = useState(10)
  const [inputValue, setInput] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const recalculate = () => {
    setRandomNumber(inputValue)
    setActiveIndex(0)
    // window.history.replaceState({}, document.title, '/#carousel__slide1')
    document.location.hash = "#carousel__slide1";
  }

  // useEffect(() => {
  //   recalculate()
  // }, [])

  const handleOnClick = (value) => {
    console.log("====>", value)
    // document.location.hash = `#carousel__slide${value}`
    setActiveIndex(value - 1)
  }

  const message = do {
    if (randomNumber < 30) {
      // eslint-disable-next-line no-unused-expressions
      ;('Do not give up. Try again.')
    } else if (randomNumber < 60) {
      // eslint-disable-next-line no-unused-expressions
      ;('You are a lucky guy')
    } else {
      // eslint-disable-next-line no-unused-expressions
      ;('You are soooo lucky!')
    }
  }

  if (Number(randomNumber) === 0) return <p>Please wait..</p>
  return (
    <div>
      <h3>Your want test number is: "{randomNumber}"</h3>

      <input value={inputValue} pattern="[0-9.]+" onChange={(e) => {setInput(e.target.value)}}/>
      <button onClick={() => recalculate()}>Submit</button>
      
      <Carousel totalCount={Number(randomNumber)} onClick={handleOnClick} />
      <MagicDots activeIndex={activeIndex} numDotsToShow={5} totalCount={Number(randomNumber)} dotWidth={30} />
    </div>
  )
}

export default MyLuckNo
