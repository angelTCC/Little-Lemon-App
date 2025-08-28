import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Pressable, ActivityIndicator, View } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { supabase } from './lib/supabase';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Auth from './screens/Auth';

const Stack = createNativeStackNavigator();

function LogoTitle () {
  return (
    <Image source={require('./assets/Logo.png')} style={{resizeMode:'contain'}}/>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Load current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for auth state changes (sign in / sign out)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={session ? 'Home' : 'Auth'}
        screenOptions={{ 
          headerBackVisible: false,
          headerStyle: { backgroundColor: '#dcdcdc', height:100 },
          headerTitle: (props) => <LogoTitle {...props} />
          }}
      >
        {session ? (
          // Authenticated routes
          <>  
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
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                headerTintColor: 'green',
                headerLeft: () => (
                  <Pressable onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                    <Icon name="caret-back" size={24} color="green" />
                  </Pressable>
                )
              })}/>
  
          
        </> ) : (
          <Stack.Screen name='Auth' component={ Auth }/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}