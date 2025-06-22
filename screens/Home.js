import { View, 
    Text, 
    Pressable, 
    Image, 
    SafeAreaView, 
    FlatList,
    TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('myDatabase.db');

export default function Home ( {navigation}) {
    const [ filterStarters, setFilterStarters] = useState(false);
    const [ menuList, setMenuList ] = useState(null);

    useEffect( ()=> {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json')
        .then(response => response.json())
        .then(data => {
            setMenuList(data.menu);
        })
    },[])

    const images = {
        'Greek Salad': require('../assets/Greek salad.png'),
        'Bruschetta': require('../assets/Bruschetta.png'),
        'Grilled Fish': require('../assets/Grilled fish.png'),
        'Pasta' : require('../assets/Pasta.png'),
        'Lemon Dessert' : require('../assets/Lemon dessert.png'),
    }
    
    const styleButtom = {
        backgroundColor:'#dcdddc',
        padding:5,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        margin:5
    };
    const styleButtomPress = {
        backgroundColor:'#ece942',
    }
    const styleButtomText = {
        color:'#507355', 
        fontSize:15, 
        fontWeight:'bold'
    }
    const styleTextInput = {
        borderWidth:1,
        marginTop:10,
        padding:10,
        fontSize:18,
        borderRadius:10,
        backgroundColor:'#dcdcdc'
    }

    const Item = ({name, description, price})=> (
        <View style={{ padding:15, height:100}}>
            <Text style={{fontSize:20}}>{name}</Text>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:3, paddingBottom:8, paddingRight:5}}>
                    <Text numberOfLines={2}>{description}</Text>
                    <Text style={{fontSize:20, opacity:0.3, fontWeight:'bold'}}>${price}</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={images[name]} style={{height:'100%', width:'100%', borderRadius:5}}/>
                </View>
            </View>
        </View>
    )
    const renderItem = ({item})=> <Item name={item.name} 
                                        description={item.description}
                                        price={item.price}
                                    />

    return (
        <SafeAreaView style={{flex:1}}>
            <View  style={{flex:1, backgroundColor:'#507355', padding:15}}>
                <View style={{flex:0.3}}>
                    <Text style={{fontSize:50, color:'#ece942'}}>Little Lemon</Text>
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:30, color:'white'}}>Chicago</Text>
                        <Text style={{fontSize:18, paddingTop:10, letterSpacing:0.5, color:'white', lineHeight:20}}>We are a family owned, Mediterranean restaurant, 
                            focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                        <Image source={require('../assets/Hero image.png')} style={{width:'80%', height:'80%', borderRadius:20}}/>
                    </View>
                </View>
                <View style={{flex:0.3, justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
                    <Pressable style={{flex:0.1, paddingTop:10}}>
                        <View style={{alignItems:'center'}}>
                            <AntDesign name="search1" size={25} color="white"/>
                        </View>
                    </Pressable>
                    <TextInput
                        style= {[styleTextInput,{flex:1}]}
                    />
                </View>
            </View>
            <View style={{paddingTop:10, paddingLeft:10}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>ORDER FOR DELIVERY!</Text>
            </View>
            <View style={{flex:0.2, flexDirection:'row'}}>
                <Pressable 
                    style={[styleButtom, {flex:1}, filterStarters && styleButtomPress]}
                    onPress={()=>{
                        setFilterStarters(!filterStarters);
                    }}>
                    <Text style={styleButtomText}>Starters</Text>
                </Pressable>
                <Pressable style={({pressed})=> [styleButtom, {flex:1}, pressed && styleButtomPress]}>
                    <Text style={styleButtomText}>Mains</Text>
                </Pressable>
                <Pressable style={({pressed})=> [styleButtom, {flex:1}, pressed && styleButtomPress]}>
                    <Text style={styleButtomText}>Desserts</Text>
                </Pressable>
                <Pressable style={({pressed})=> [styleButtom, {flex:1}, pressed && styleButtomPress]}>
                    <Text style={styleButtomText}>Drinks</Text>
                </Pressable>
            </View>
            <View style={{flex:2}}>
                <FlatList data={menuList} renderItem={renderItem} ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#507355', marginHorizontal: 10 }} />}/>
            </View>
        </SafeAreaView>
    );
}