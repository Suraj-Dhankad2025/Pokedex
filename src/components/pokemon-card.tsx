"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pokemon } from "@/lib/types";
import { useState, useEffect } from "react";

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onSelect }: PokemonCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(pokemon.id));
  }, [pokemon.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: number) => id !== pokemon.id);
    } else {
      newFavorites = [...favorites, pokemon.id];
    }
    
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      className="group relative overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(pokemon)}
    >
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full ${
            isFavorite ? "text-red-500" : "text-gray-400"
          }`}
          onClick={toggleFavorite}
        >
          <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
      </div>
      <div className="p-4">
        <div className="aspect-square relative mb-3">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="object-contain w-full h-full transform group-hover:scale-110 transition-transform"
          />
        </div>
        <h3 className="text-lg font-semibold capitalize mb-2">{pokemon.name}</h3>
        <div className="flex gap-2 flex-wrap">
          {pokemon.types.map(({ type }) => (
            <Badge
              key={type.name}
              className={`text-white capitalize`}
            >
              {type.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}