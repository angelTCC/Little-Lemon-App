import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Pressable } from 'react-native';

import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

function LogoTitle () {
  return (
    <Image source={require('./assets/Logo.png')} style={{resizeMode:'contain'}}/>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Onboarding' 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#dcdcdc', height:100 },
          headerTitle: (props) => <LogoTitle {...props} />
          }}
      >
          <Stack.Screen name='Home' 
            component={ Home } 
            options={({navigation})=> ({
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Profile')}>
                  <Image
                  source={require('./assets/Profile.png')}
                  style={{ height: 40, width: 40, borderRadius:20}}
                  />
                </Pressable>
              )
            })}/>
          <Stack.Screen name='Profile' component={ Profile } />
          <Stack.Screen name='Onboarding' component={ Onboarding } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}