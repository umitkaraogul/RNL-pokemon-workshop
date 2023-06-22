import { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Pokemon, getPokemonData } from '../api';

type PokemonScreenProps = {
  route: { pokemonName: string };
};

const PokemonScreen: React.FC<PokemonScreenProps> = ({ route }) => {
  const { pokemonName } = route;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const fetchPokemon = useCallback(async () => {
    const data = await getPokemonData(pokemonName);
    setPokemon(data);
  }, []);

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (!pokemon) {
    return (
      <View>
        <Text>{'Loading'}</Text>
      </View>
    );
  }

  const imageId = pokemon.id.toString().padStart(3, '0');
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imageId}.png`
        }}
        style={styles.image}
      />

      <View>
        <Text>{pokemon.name}</Text>
        <Text>{`${pokemon.types[0].type.name}, ${pokemon.types[1].type.name}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  },
  image: {
    width: 300,
    height: 300
  }
});

export default PokemonScreen;
