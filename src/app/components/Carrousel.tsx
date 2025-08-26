'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LuCircleChevronLeft, LuCircleChevronRight } from "react-icons/lu";

type CarrouselProps<T> = {
  autoScroll?: boolean;
  Element: React.ForwardRefExoticComponent<T & React.RefAttributes<HTMLDivElement>>;
  items: T[];
  classNameCompensation?: string
};

export default function Carrousel<T>({autoScroll = false, Element, items, classNameCompensation}: CarrouselProps<T>) {

  // FUNÇÃO DOS BOTÕES PARA ROLAR AS IMAGENS
  const [currentItem, setCurrentItem] = useState(0);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const elementsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const element = elementsRefs.current[currentItem];
  if (scrollContainer.current && element) {
    scrollContainer.current.scrollTo({
      left:
        element.offsetLeft -
        scrollContainer.current.clientWidth / 2 +
        element.clientWidth / 2,
      behavior: "smooth",
    });
  }

  function scrollClick(btn: 'right' | 'left') {
      
    const totImgs = items.length
    setCurrentItem((prevItem) => {
      let newIndex = (btn === 'left' ? prevItem - 1 : prevItem + 1);
      if (newIndex >= totImgs) {newIndex = 0;}
      if (newIndex < 0) {newIndex = totImgs - 1;}
      return newIndex;
    });

    setIsAutoScroll(false)
  };

  // FUNÇÃO DE ROLAGEM QUE MANTÉM A IMAGEM ATUAL NO CENTRO DA TELA
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      if (scrollContainer.current) {
        setScrollPosition(scrollContainer.current.scrollLeft);
      }
    }, 200);
  }, []);

  useEffect(() => {
    let width = 0;
    let gap = 0;
    
    if(elementsRefs.current[0] && scrollContainer.current){
      width = elementsRefs.current[0].clientWidth;
      gap = parseInt(window.getComputedStyle(scrollContainer.current).gap);
    }
    
    width += gap;
    
    let inteiro = Math.floor(scrollPosition / width);
    const parte = scrollPosition / width - inteiro;

    if (parte >= 0.5) {
      inteiro++;
    }

    setCurrentItem(inteiro);
    
  }, [scrollPosition]);

  const [isAutoScroll, setIsAutoScroll] = useState(autoScroll);
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const touchedTimeout = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout
    const tot = items.length
    
      if (isAutoScroll) {

        intervalId = setInterval(() => {
          setCurrentItem((prevItem) => {
            let newIndex = prevItem + 1;
            if (newIndex >= tot) {newIndex = 0;}
            if (newIndex < 0) {newIndex = tot - 1;}
            return newIndex;
          });
        }, 2000);

      }else{

        intervalId = setInterval(() => {
          if(!isMouseEnter && !isTouched && autoScroll){
            setIsAutoScroll(true);
          }
        }, 2000);

      }

    return () => {
      clearInterval(intervalId);
    };
  
  }, [isAutoScroll, isMouseEnter, isTouched, autoScroll]);

  function handleMouseEnter() {
    setIsAutoScroll(false);
    setIsMouseEnter(true);
  }

  function handleMouseLeave () {
    setIsMouseEnter(false);
  }

  const handleTouch = useCallback(() => {
    setIsAutoScroll(false);
    setIsTouched(true);

    if (touchedTimeout.current) {
      clearTimeout(touchedTimeout.current);
    }
  
    touchedTimeout.current = setTimeout(() => {
      setIsTouched(false);
    }, 2000);
  }, []);
  
  return (
    <div
      className='relative w-full @container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouch}
    >
      <button
        className="group absolute z-1 top-0 bottom-0 -left-4 sm:left-0 hover:cursor-pointer outline-none"
        aria-label="Previous image"
        onClick={() => scrollClick('left')}
      >
        <LuCircleChevronLeft
          className='w-12 sm:w-16 h-12 sm:h-16 text-white group-hover:text-secondary-1 transition'
        />
      </button>
      <button
        className="group absolute z-1 top-0 bottom-0 -right-4 sm:right-0 hover:cursor-pointer outline-none"
        aria-label="Next Image"
        onClick={() => scrollClick('right')}
      >
        <LuCircleChevronRight
          className='w-12 sm:w-16 h-12 sm:h-16 text-white group-hover:text-secondary-1 transition'
        />
      </button>

      <div
        className='flex items-center gap-6 sm:gap-10 w-full overflow-x-auto py-4 px-6 sm:px-10 scrollbar-none'
        ref={scrollContainer}
        onScroll={handleScroll}
      >
        <div className={classNameCompensation}/>
        {items.map((item, index) => (
          <Element
            key={index}
            ref={(el) => {
              elementsRefs.current[index] = el;
            }}
            {...item}
          />
        ))}
        <div className={classNameCompensation}/>
      </div>
    </div>
  )
}


