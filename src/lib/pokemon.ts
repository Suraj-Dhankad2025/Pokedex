export async function getPokemonList(offset = 0, limit = 12) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const data = await response.json();
  return data;
}

export async function getPokemonDetails(nameOrId: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  const data = await response.json();
  return data;
}

export async function getPokemonTypes() {
  const response = await fetch('https://pokeapi.co/api/v2/type');
  const data = await response.json();
  // console.log(data.results);
  return data.results;
}

