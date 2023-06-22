import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, View, StyleSheet } from 'react-native';
import { PokemonListEntry, getAllPokemonUpToLimit } from '../api';
import { useCallback, useEffect, useState } from 'react';

const MainScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [pokemonList, setPokemonList] = useState<PokemonListEntry[]>([]);

  const fetchPokemonList = useCallback(async () => {
    const data = await getAllPokemonUpToLimit({ limit: 5 });
    setPokemonList(data);
  }, []);

  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate('PokemonScreen', { pokemonName: item.name })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center'
    justifyContent: 'center'
  }
});

export default MainScreen;
