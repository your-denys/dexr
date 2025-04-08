import { useState, useEffect } from "react";
import "./Watchlist.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { FlagFill } from "react-bootstrap-icons";
import Dnd from "./Dnd";

const initialCoins = [
  {
    id: "1",
    name: "Ethereum",
    price: "$0.041449",
    change1H: "-0.85%",
    change24H: "-18.69%",
  },
  {
    id: "2",
    name: "Bitcoin",
    price: "$0.041449",
    change1H: "-0.85%",
    change24H: "-18.69%",
  }
];

function Watchlist() {
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem("coinsData");
    if (savedCoins) {
      const parsedCoins = JSON.parse(savedCoins);
      return parsedCoins.filter((coin) =>
        initialCoins.some((c) => c.id === coin.id)
      ); // Убираем устаревшие
    }
    return initialCoins;
  });

  useEffect(() => {
    setCoins((prevCoins) => {
      const newCoins = [...prevCoins];
  
      // Добавляем только те, которых нет в списке
      initialCoins.forEach(coin => {
        if (!prevCoins.some(c => c.id === coin.id)) {
          newCoins.push(coin);
        }
      });
  
      localStorage.setItem("coinsData", JSON.stringify(newCoins));
      return newCoins;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCoins]); 

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setCoins((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newCoins = arrayMove(items, oldIndex, newIndex);

        localStorage.setItem("coinsData", JSON.stringify(newCoins));

        return newCoins;
      });
    }
  };

  return (
    <div className="watchlist-container mt-2">
      <h5>
        <FlagFill /> WATCHLIST
      </h5>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={coins} strategy={verticalListSortingStrategy}>
          {coins.map((coin) => (
            <Dnd key={coin.id} coin={coin} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Watchlist;
