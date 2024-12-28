"use client";

import { useState, useEffect } from "react";
import { PokemonDetail } from "@/components/pokemon-detail";
import { Pokemon } from "@/lib/types";
import { getPokemonList, getPokemonDetails, getPokemonTypes } from "@/lib/pokemon";
import { PokemonList } from "@/components/pokemon-list";
import { SearchFilters } from "@/components/search-filters";
import { Pagination } from "@/components/pagination";
import Loading from "@/components/loading";

const ITEMS_PER_PAGE = 24;

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [types, setTypes] = useState<{ name: string }[]>([]);
  const [page, setPage] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  

  const loadPokemon = async () => {
    try {
      setLoading(true);
      const data = await getPokemonList(page * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
      const pokemonDetails = await Promise.all(
        data.results.map((p: { name: string }) => getPokemonDetails(p.name))
      );
      setPokemon(pokemonDetails);
      setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
    } catch (err) {
      setError("Failed to load Pokemon");
    } finally {
      setLoading(false);
    }
  };
  
  const loadTypes = async () => {
    try {
      const data = await getPokemonTypes();
      data.unshift({ name: "favorite", url: "" });
      setTypes(data);
    } catch (err) {
      console.error("Failed to load types");
    }
  };

  useEffect(() => {
    loadPokemon();
    loadTypes();
  }, [page]);
  

  let favoritePokemon = [];
  if (typeof window !== "undefined") {
    favoritePokemon = JSON.parse(localStorage.getItem("favorites") || "[]");
  }
  const favPokemon = pokemon.filter((p) => favoritePokemon.includes(p.id));
 
  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "all" ||
      p.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

// console.log(selectedType);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Pokedex</h1>
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          types={types}
        />
        
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : loading ? (
          <Loading />
        ) : (
          <>
            <PokemonList 
              pokemon={(selectedType=="favorite")? favPokemon :filteredPokemon}
              onSelectPokemon={setSelectedPokemon}
            />

            {!searchTerm && selectedType === "all" && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  isLoading={loading}
                />
              </div>
            )}
          </>
        )}

        <PokemonDetail
          pokemon={selectedPokemon}
          isOpen={!!selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      </div>
    </div>
  );
}