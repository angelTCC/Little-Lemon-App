import { useState } from 'react';
import {
    ScrollView,
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    Pressable,
    Platform,
    View
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { supabase } from '../lib/supabase';

export default function Profile() {
    const styleButtom = {
        backgroundColor: '#dcdddc',
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 5,
        borderWidth:1,
    };
        const styleButtomPress = {
        backgroundColor:'#628c68',
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [statusCheck, setStatusCheck] = useState(false);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Signed out", "You have been logged out successfully");
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <ScrollView keyboardDismissMode="on-drag">
                <View>
                    <Text style={{ fontSize: 20, margin: 5, padding: 5, fontWeight:'bold' }}>
                        Personal Information
                    </Text>

                    <View style={{ margin: 5, padding: 5 }}>
                        <Text style={{paddingBottom:5, fontWeight:'bold', opacity:0.5, fontSize:15}}>Avatar</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <View style={{ width: 100, height: 100, borderRadius: 60, overflow: 'hidden' }}>
                                <Image
                                    source={require('../assets/Profile.png')}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <Pressable style={[styleButtom, { flex: 1, backgroundColor:'#507355' }]}>
                                <Text style={{color:'white'}}>Changes</Text>
                            </Pressable>
                            <Pressable style={[styleButtom, { flex: 1 }]}>
                                <Text>Remove</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ margin: 5, padding: 5, height: 80 }}>
                        <Text style={{paddingBottom:5, fontWeight:'bold', opacity:0.5, fontSize:15}}>First Name</Text>
                        <TextInput
                            style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, borderWidth:2, borderColor:'#00000033', }}
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                    </View>

                    <View style={{ margin: 5, padding: 5, height: 80 }}>
                        <Text style={{paddingBottom:5, fontWeight:'bold', opacity:0.5, fontSize:15}}>Last Name</Text>
                        <TextInput
                            style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, borderWidth:2, borderColor:'#00000033', color:'black' }}
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <View style={{ margin: 5, padding: 5, height: 80 }}>
                        <Text style={{paddingBottom:5, fontWeight:'bold', opacity:0.5, fontSize:15}}>Email</Text>
                        <TextInput
                            style={{ padding: 10, backgroundColor: 'white', borderRadius: 5, borderWidth:2, borderColor:'#00000033', }}
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={{ margin: 5, padding: 5, height: 80 }}>
                        <Text style={{paddingBottom:5, fontWeight:'bold', opacity:0.5, fontSize:15}}>Personal Number</Text>
                        <TextInput
                            style={{ padding: 10, backgroundColor: 'white', borderRadius: 10, borderWidth:2, borderColor:'#00000033', }}
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>
                </View>

                <View>
                    <Text style={{ fontSize: 20, margin: 5, padding: 5, fontWeight:'bold' }}>
                        Email Notifications
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, padding: 8 }}>
                        <Checkbox value={statusCheck} onValueChange={setStatusCheck} style={{borderColor:'#00000033'}} />
                        <Text style={{ margin: 5 }}>Order Status</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, padding: 8 }}>
                        <Checkbox value={statusCheck} onValueChange={setStatusCheck} style={{borderColor:'#00000033'}}/>
                        <Text style={{ margin: 5 }}>Password changes</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, padding: 8 }}>
                        <Checkbox value={statusCheck} onValueChange={setStatusCheck} style={{borderColor:'#00000033'}}/>
                        <Text style={{ margin: 5 }}>Special offers</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, padding: 8 }}>
                        <Checkbox value={statusCheck} onValueChange={setStatusCheck} style={{borderColor:'#00000033'}}/>
                        <Text style={{ margin: 5 }}>Newsletter</Text>
                    </View>
                </View>

                <View style={{padding:10}}>
                    <Pressable style={({pressed})=>[styleButtom, {width:'80%'}, pressed && styleButtomPress]} 
                        onPress={handleLogout} >
                        <Text>Log out</Text>
                    </Pressable>
                </View>

                <View style={{ flexDirection: 'row', padding:10}}>
                    <Pressable style={({pressed})=>[styleButtom, { flex: 1, marginRight: 5}, pressed && styleButtomPress]}>
                        <Text>Discard Changes</Text>
                    </Pressable>
                    <Pressable style={({pressed})=>[styleButtom, { flex: 1, marginLeft: 5, backgroundColor:'#507355' }, pressed && styleButtomPress]}>
                        <Text style={{color:'white'}}>Save Changes</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
