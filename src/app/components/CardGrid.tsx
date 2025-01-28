"use client";
import Image from "next/image";
import { useGameContext } from "@/app/context";

interface CardGridProps {
  cards: { url: string; title: string }[];
  handleCardClick: (index: number) => void;
}

const CardGrid = ({ cards, handleCardClick }: CardGridProps) => {
  const { flipped, solved } = useGameContext();
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {cards.map((image, index) => (
        <div
          key={index}
          className={`card__item flex justify-center items-center text-4xl font-bold 
         bg-[var(--primary)] hover:bg-[var(--primary-hover)]
         w-20 h-20 relative cursor-pointer rounded-xl 
         transition-all duration-300 [transform-style:preserve-3d]
         shadow-lg hover:shadow-xl
          ${
            flipped.includes(index) || solved.includes(index)
              ? "[transform:rotateY(180deg)]"
              : ""
          }`}
          onClick={() => handleCardClick(index)}
        >
           <div className="absolute w-full h-full backface-hidden">
            <span className="text-5xl text-white font-bold 
              [text-shadow:-2px_-2px_0px_rgba(0,0,0,0.2),2px_2px_0px_rgba(255,255,255,0.1)]
              transition-transform hover:scale-110">
              ?
            </span>
          </div>
          <div className="absolute w-full h-full [transform:rotateY(180deg)] backface-hidden">
            <Image
              className="object-cover rounded-xl"
              src={image.url}
              alt={image.title}
              fill
              priority
              sizes="100%"
            />
          </div>
        </div>
         
         
      ))}
    </div>
  );
};

export default CardGrid;
