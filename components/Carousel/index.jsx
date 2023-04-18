import { useMemo } from "react"

export default ({totalCount = 10, onClick}) => {
    const cards = useMemo(() => {
        return [...Array(totalCount).keys()].map(item => {
            return <li id={`carousel__slide${item + 1}`}
                tabindex="0"
                className="carousel__slide">
                <div className="carousel__snapper">
                    <a href={`#carousel__slide${item  || totalCount}`}
                        onClick={() => { onClick(item  || totalCount) }}
                        className="carousel__prev">Go to last slide</a>
                    <a href={`#carousel__slide${item + 2 > totalCount ? 1 : item + 2}`}
                        className="carousel__next"
                        onClick={() => { onClick(item + 2 > totalCount ? 1 : item + 2) }}
                    >Go to next slide</a>
                </div>
            </li>
        })
    }, [totalCount])
    return <>
        <section className="carousel" aria-label="Gallery">
            <ol className="carousel__viewport">
                {cards}
            </ol>
        </section>
        <style global jsx>{`
              body {
                max-width: 37.5rem;
                margin: 0 auto;
                padding: 0 1.25rem;
                font-family: 'Lato', sans-serif;
              }
              
              * {
                box-sizing: border-box;
                scrollbar-color: transparent transparent; /* thumb and track color */
                scrollbar-width: 0px;
              }
              
              *::-webkit-scrollbar {
                width: 0;
              }
              
              *::-webkit-scrollbar-track {
                background: transparent;
              }
              
              *::-webkit-scrollbar-thumb {
                background: transparent;
                border: none;
              }
              
              * {
                -ms-overflow-style: none;
              }
              
              ol, li {
                list-style: none;
                margin: 0;
                padding: 0;
              }
              
              .carousel {
                position: relative;
                padding-top: 75%;
                filter: drop-shadow(0 0 10px #0003);
                perspective: 100px;
                margin-bottom: 20px;
                margin-top: 20px;
              }
              
              .carousel__viewport {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                // overflow-x: scroll;
                overflow: hidden;
                counter-reset: item;
                // scroll-behavior: smooth;
                // scroll-snap-type: x mandatory;
                // pointer-events: none;
                
              }
              
              .carousel__slide {
                position: relative;
                flex: 0 0 100%;
                width: 100%;
                background-color: #f99;
                counter-increment: item;
              }
              
              .carousel__slide:nth-child(even) {
                background-color: #99f;
              }
              
              .carousel__slide:before {
                content: counter(item);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%,-40%,70px);
                color: #fff;
                font-size: 2em;
              }
              
              .carousel__snapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                scroll-snap-align: center;
              }
              
              
              .carousel::before,
              .carousel::after,
              .carousel__prev,
              .carousel__next {
                position: absolute;
                top: 0;
                margin-top: 37.5%;
                width: 4rem;
                height: 4rem;
                transform: translateY(-50%);
                border-radius: 50%;
                font-size: 0;
                outline: 0;
              }
              
              .carousel::before,
              .carousel__prev {
                left: -1rem;
              }
              
              .carousel::after,
              .carousel__next {
                right: -1rem;
              }
              
              .carousel::before,
              .carousel::after {
                content: '';
                z-index: 1;
                background-color: #333;
                background-size: 1.5rem 1.5rem;
                background-repeat: no-repeat;
                background-position: center center;
                color: #fff;
                font-size: 2.5rem;
                line-height: 4rem;
                text-align: center;
                pointer-events: none;
              }
              
              .carousel::before {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,50 80,100 80,0' fill='%23fff'/%3E%3C/svg%3E");
              }
              
              .carousel::after {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='100,50 20,100 20,0' fill='%23fff'/%3E%3C/svg%3E");
              }
        `}</style>
    </>
}