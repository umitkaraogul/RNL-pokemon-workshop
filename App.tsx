import PokemonScreen from './screens/PokemonScreen';
import MainScreen from './screens/MainScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  PokemonScreen: { pokemonName: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={MainScreen} />
        <Stack.Screen name='PokemonScreen'>
          {(props) => <PokemonScreen {...props} route={props.route.params} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
