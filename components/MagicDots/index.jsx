import React, { useRef, useMemo, useState, useEffect, useCallback } from "react"
import styles from './index.module.css'

const Dot = ({active, value, className, onClick }) => {
    let classes = active ? styles['active'] : ''

    return <li className={`${classes} ${className}`}>
        <button onClick={onClick}>{value}</button>
    </li>
}

export default ({ activeIndex, numDotsToShow, totalCount, dotWidth }) => {
    const handleOnClick = useCallback((e) => {
        // setActiveIndex(Number(e.target.innerText))
    },[])

    const dots = useMemo(() => {
        return [...Array(totalCount).keys()].map(item => {
            return <Dot key={item+1} value={item}  active={item === activeIndex} onClick={handleOnClick}/>
        })
    }, [activeIndex, handleOnClick, totalCount])

    const dotConfig = useRef({
        minIndex: 0,
        maxIndex: 0,
        breakPointActiveIndex: 0,
        isInInitalView: true
    })
    const previousActiveRef = useRef(0)

    useEffect(() => {
        return () => {
            console.log('---><heheh')
            dotConfig.current = {
                minIndex: 0,
                maxIndex: 0,
                breakPointActiveIndex: 0,
                isInInitalView: true
            }
            previousActiveRef.current = 0
        }
    }, [totalCount])

    useEffect(() => {
        previousActiveRef.current = activeIndex
    }, [activeIndex])

    const isMovingForward = activeIndex >= previousActiveRef.current

    let adjustedDots = [...dots]
    if ( // 当active可能为视窗中的倒数第二或倒数第一个时
        (activeIndex > numDotsToShow - 2 && totalCount > numDotsToShow)
        || !dotConfig.current.isInInitalView
    ) {
        // 滑动到达需要变换dot index的情况时
        if (isMovingForward) { // 向前滑只需要考虑到达显示的最后那个dot时的情况
            // 当当前的active是视窗中的最后一个，但不是总数的最后一个
            if (activeIndex ===  dotConfig.current.maxIndex && activeIndex !== totalCount - 1) {
                // 最左边的index 要向前走一位
                dotConfig.current.minIndex = activeIndex - (numDotsToShow - 2)
                // 最右边的加一
                dotConfig.current.maxIndex = activeIndex + 1
            } else {
                // 当前的active是视窗中的最后一个，也是总数的最后一个
                if (activeIndex === totalCount - 1) {
                    dotConfig.current.maxIndex = totalCount - 1
                    dotConfig.current.minIndex = totalCount - numDotsToShow
                }
            }
            // 其他情况不用考虑，应该在中间滑动时不用改边界值

            
        } else {//往后滑只需要考虑到达显示的第一个那个dot时的情况
            if (activeIndex ===  dotConfig.current.minIndex && activeIndex !== 0) {
                 dotConfig.current.minIndex = activeIndex - 1;
                 dotConfig.current.maxIndex = dotConfig.current.minIndex + (numDotsToShow - 1);
              } else {
                if (activeIndex === 0) {
                   dotConfig.current.maxIndex = numDotsToShow - 1;
                   dotConfig.current.minIndex = 0;
                }
              }
        }

        dotConfig.current.isInInitalView = false
        const firstViewableDotIndex = dotConfig.current.minIndex
        const firstViewableDot = dots[firstViewableDotIndex]
        const lastViewableDotIndex = dotConfig.current.maxIndex
        const lastViewableDot = dots[lastViewableDotIndex]

        if (dotConfig.current.maxIndex < totalCount - 1 && isMovingForward) {
            // setSmallIndex([dotConfig.current.minIndex, dotConfig.current.maxIndex])
            // smallIndexs = [dotConfig.current.minIndex, dotConfig.current.maxIndex]
            adjustedDots = [
                ...adjustedDots.slice(0, firstViewableDotIndex),
                React.cloneElement(firstViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
                React.cloneElement(lastViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(lastViewableDotIndex + 1)
              ];
        } else if (dotConfig.current.maxIndex === totalCount - 1) {
            // setSmallIndex([dotConfig.current.minIndex])
            // smallIndexs = [dotConfig.current.minIndex]
            adjustedDots = [
                ...adjustedDots.slice(0, firstViewableDotIndex),
                React.cloneElement(firstViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
                lastViewableDot
              ];
        } else if (activeIndex > 1 && !isMovingForward) {
            // setSmallIndex([dotConfig.current.minIndex, dotConfig.current.maxIndex])
            // smallIndexs = [dotConfig.current.minIndex, dotConfig.current.maxIndex]
            adjustedDots = [
                ...adjustedDots.slice(0, firstViewableDotIndex),
                React.cloneElement(firstViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(firstViewableDotIndex + 1, lastViewableDotIndex),
                React.cloneElement(lastViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(lastViewableDotIndex + 1)
              ];
        } else {
            dotConfig.current.isInInitalView = true
            // setSmallIndex([dotConfig.current.maxIndex])
            // smallIndexs = [dotConfig.current.maxIndex]
            adjustedDots = [
                ...adjustedDots.slice(0, lastViewableDotIndex),
                React.cloneElement(lastViewableDot, {
                  className: styles['small']
                }),
                ...adjustedDots.slice(lastViewableDotIndex + 1)
              ];
        }


    } else {
        dotConfig.current.minIndex = 0
        dotConfig.current.maxIndex = Math.min(numDotsToShow, totalCount) - 1
        const lastViewableDotIndex = dotConfig.current.maxIndex
        console.log(lastViewableDotIndex, totalCount, dots, "lastViewableDotIndex....", totalCount)
        if (lastViewableDotIndex  < totalCount - 1) {
            // setSmallIndex([dotConfig.current.maxIndex])
            // smallIndexs= [dotConfig.current.maxIndex]
            const lastViewableDot = dots[lastViewableDotIndex];

            adjustedDots = [
                ...adjustedDots.slice(0, lastViewableDotIndex),
                React.cloneElement(lastViewableDot, {
                    className: styles['small']
                }),
                ...adjustedDots.slice(lastViewableDotIndex + 1)
            ];
        }   
    }

    const containerWidth =
        totalCount < numDotsToShow ? totalCount * dotWidth : numDotsToShow * dotWidth;
    const midIndex = (dotConfig.current.minIndex + dotConfig.current.maxIndex) / 2;
    const leftOffset =
        totalCount < numDotsToShow
        ? 0
        : (dotWidth * numDotsToShow - dotWidth) / 2 - midIndex * dotWidth;

    return <div className={styles["magic-dots"]} style={{
        position: 'relative',
        overflow: 'hidden',
        margin: 'auto',
        width: containerWidth + 'px'
    }}> 
        <ul style={{ transform: `translateX(${leftOffset}px)` }}> {adjustedDots} </ul>
    </div>
}