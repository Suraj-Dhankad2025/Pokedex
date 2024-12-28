"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pokemon } from "@/lib/types";


interface PokemonDetailProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonDetail({ pokemon, isOpen, onClose }: PokemonDetailProps) {
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold capitalize">
            {pokemon.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center">
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              className="w-full max-w-[300px]"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Types</h3>
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
            <div>
              <h3 className="text-lg font-semibold mb-2">Stats</h3>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm capitalize">{stat.stat.name}</span>
                      <span className="text-sm font-semibold">
                        {stat.base_stat}
                      </span>
                    </div>
                    <Progress value={stat.base_stat} max={255} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Abilities</h3>
              <div className="flex gap-2 flex-wrap">
                {pokemon.abilities.map(({ ability }) => (
                  <Badge key={ability.name} variant="outline" className="capitalize">
                    {ability.name.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}