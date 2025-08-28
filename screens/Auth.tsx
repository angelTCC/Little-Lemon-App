import React, { useState } from 'react'
import { Alert, StyleSheet, View, Pressable, TextInput, Text } from 'react-native'
import { supabase } from '../lib/supabase'
//import { Button, Input } from '@rneui/themed'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {

    setLoading(true)
    Alert.alert("Sign in")
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session);
  }

  async function signUpWithEmail() {
    setLoading(true)
    Alert.alert("sign up")
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
    console.log(session);

  }


  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          //label="Email"
          //leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          //autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          //label="Password"
          //leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          //autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Pressable 
            //title="Sign in" 
            //disabled={loading} 
            onPress={() => signInWithEmail()} 
        >
            <Text>Sign in</Text>
        </Pressable>
      </View>
      <View style={styles.verticallySpaced}>
        <Pressable 
            //title="Sign up" disabled={loading} 
            onPress={() => signUpWithEmail()} 
        >
            <Text>Sign up</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})