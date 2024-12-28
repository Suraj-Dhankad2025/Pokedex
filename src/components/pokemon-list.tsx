
import { PokemonCard } from "@/components/pokemon-card";
import { Pokemon } from "@/lib/types";

interface PokemonListProps {
  pokemon: Pokemon[];
  onSelectPokemon: (pokemon: Pokemon) => void;
}

export function PokemonList({ pokemon, onSelectPokemon }: PokemonListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
      {pokemon.map((p) => (
        <PokemonCard
          key={`pokemon-${p.id}`}
          pokemon={p}
          onSelect={onSelectPokemon}
        />
      ))}
    </div>
  );
}