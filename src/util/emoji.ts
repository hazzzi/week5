import { Color } from "three";
import { generateUUID } from "three/src/math/MathUtils.js";

const emojis = [
  'cat',
  'cube',
  'donut',
  'eagle',
  'foo',
  'ghost',
  'grapes',
  'key',
  'meat',
  'mouse',
  'shaka',
];

const getRandomPosition = () => Math.random() * 10 - 4;
const getRandomScale = () => Math.random() * 0.6 + 0.2;
const getRandomAnimation = () => {
  const animations = ['scale', 'rotateX', 'rotateY'];
  const randomIndex = Math.floor(Math.random() * animations.length);
  return animations[randomIndex] as "scale" | "rotateX" | "rotateY";
};
const getRandomColor = () => {
  return new Color(Math.random(), Math.random(), Math.random());
};

export const emojiRenders = Array.from({ length: 100 }).map((_, index) => ({
  id: generateUUID(),
  emoji: emojis[index % emojis.length],
  position: [
    getRandomPosition(),
    getRandomPosition(),
    getRandomPosition(),
  ] as const,
  scale: getRandomScale(),
  animationType: getRandomAnimation(),
  color: getRandomColor() 
}));