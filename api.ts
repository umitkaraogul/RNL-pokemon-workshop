import axios from 'axios';

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  types: PokemonType[];
};
export type PokemonListEntry = {
  name: string;
  url: string;
};

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
  timeout: 1000
});

export const getPokemonData = async (pokemonName: string): Promise<Pokemon> => {
  try {
    const response = await axiosInstance.get(`/${pokemonName}`);

    const pokemonDetails: Pokemon = {
      id: response.data.id,
      name: response.data.name,
      types: [
        {
          slot: 1,
          type: {
            name: 'Grass',
            url: 'url'
          }
        },
        {
          slot: 1,
          type: {
            name: 'Poison',
            url: 'url'
          }
        }
      ]
    };

    return pokemonDetails;
  } catch (error) {
    throw error;
  }
};

export type GetAllPokemonUpToLimitProp = { limit: number };

export const getAllPokemonUpToLimit = async ({
  limit
}: GetAllPokemonUpToLimitProp): Promise<PokemonListEntry[]> => {
  try {
    const response = await axiosInstance.get(`?limit=${limit}`);

    const list = response.data.results.map((entry: any) => ({
      name: entry.name,
      url: entry.url
    }));

    return list;
  } catch (error) {
    throw error;
  }
};
