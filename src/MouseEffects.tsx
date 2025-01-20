
import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';


export interface Position {
  x: number;
  y: number;
}

const start = new Date().getTime();

export const originPosition: Position = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition,
};

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 500,
  minimumDistanceBetweenStars: 125,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  orangeColors: ['255, 164, 112', '255, 129, 112'],
  blueColors: ['106, 128, 217', '42, 98, 107'],
  greenColors: ['94, 143, 97', '110, 145, 83'],

  sizes: ['1.4rem', '1rem', '0.6rem'],
  animations: ['fall-1', 'fall-2', 'fall-3'],
};

let count = 0;

const isGreen = (position: Position) => position.y + window.scrollY >= 900 && position.y + window.scrollY <= 5100
const isBlue = (position: Position) => position.y + window.scrollY >= 5100 && position.y + window.scrollY <= 8000



const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const selectRandom = (items: string[]) => items[rand(0, items.length - 1)];

const withUnit = (value: number | string, unit: string) => `${value}${unit}`;
const px = (value: number | string) => withUnit(value, 'px');
const ms = (value: number) => withUnit(value, 'ms');

const calcDistance = (a: Position, b: Position) => {
  const diffX = b.x - a.x;
  const diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start: number, end: number) => end - start;

const appendElement = (element: HTMLElement) => document.body.appendChild(element);
const removeElement = (element: HTMLElement, delay: number) => setTimeout(() => document.body.removeChild(element), delay);

export const createStar = (position: Position) => {
    // Create a container for the star
    const starContainer = document.createElement('div');
    starContainer.style.position = 'absolute';
    starContainer.style.left = px(position.x);
    starContainer.style.top = px(position.y + window.scrollY); // Add scroll offset to Y position

    console.log(position.y + window.scrollY) //1045 4955
  
    // Randomize size, color, and animation
    const color = selectRandom(isBlue(position) ? config.blueColors : isGreen(position)? config.greenColors : config.orangeColors);
    
    const fontSize = selectRandom(config.sizes);
    const animation = config.animations[count++ % 3];
  
    // Render the FontAwesome JSX element into the container using ReactDOM.render
    ReactDOM.render(
      <FontAwesomeIcon
        icon={faStar}
        style={{
          fontSize,
          color: `rgb(${color})`,
          textShadow: `0px 0px 1.5rem rgb(${color} / 0.5)`,
          animationName: animation,
          animationDuration: ms(config.starAnimationDuration),
        }}
        className="star"
      />,
      starContainer
    );
  
    // Append the star container to the body
    appendElement(starContainer);
  
    // Remove the star container after the animation duration
    removeElement(starContainer, config.starAnimationDuration);
};

  

export const createGlowPoint = (position: Position) => {
    const glow = document.createElement('div');

    const currLoc = position.y + window.scrollY
  
    glow.className = 'glow-point';

    let color = ''

    if (isBlue(position)){
      color = '0rem 0rem 1.2rem 0.4rem rgb(180, 192, 240)'
    } else if (isGreen(position)) {
      color = '0rem 0rem 1.2rem 0.4rem rgb(171, 217, 137)'
    } else {
      color = '0rem 0rem 1.2rem 0.4rem rgb(255, 193, 112)'
    }
    
    glow.style.boxShadow = color
    // glow.style.boxShadow = isBlue(position) ? '0rem 0rem 1.2rem 0.4rem rgb(180, 192, 240)'  : isGreen(position) ? '0rem 0rem 1.2rem 0.4rem rgb(171, 217, 137)' : '0rem 0rem 1.2rem 0.4rem rgb(255, 193, 112)'
    glow.style.left = px(position.x);
    glow.style.top = px(currLoc); // Add scroll offset to Y position
  
    appendElement(glow);
  
    removeElement(glow, config.glowDuration);
  };

export const createGlow = (last: Position, current: Position) => {
  const distance = calcDistance(last, current);
  const quantity = Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

  const dx = (current.x - last.x) / quantity;
  const dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index;
    const y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
};

export const updateLastStar = (position: Position) => {
  last.starTimestamp = new Date().getTime();
  last.starPosition = position;
};

export const updateLastMousePosition = (position: Position) => {
  last.mousePosition = position;
};

export const adjustLastMousePosition = (position: Position) => {
  if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

export const handleOnMove = (e: MouseEvent | TouchEvent) => {
  requestAnimationFrame(() => {
    const mousePosition = {
      x: 'touches' in e ? e.touches[0].clientX : e.clientX,
      y: 'touches' in e ? e.touches[0].clientY : e.clientY,
    };

    adjustLastMousePosition(mousePosition);

    const now = new Date().getTime();
    const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
    const hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

    if (hasMovedFarEnough || hasBeenLongEnough) {
      createStar(mousePosition);
      updateLastStar(mousePosition);
    }

    createGlow(last.mousePosition, mousePosition);
    updateLastMousePosition(mousePosition);
  });
};
