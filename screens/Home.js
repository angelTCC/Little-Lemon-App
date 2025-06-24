import { View, 
    Text, 
    Pressable, 
    Image, 
    SafeAreaView, 
    FlatList,
    TextInput } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('little_lemon.db');

export default function Home () {
    const categories = ['starters', 'mains', 'desserts', 'drinks'];
    const [ filters, setFilters ] = useState([false, false, false, false]);
    const [ menuList, setMenuList ] = useState([]);
    const isInitialRender = useRef(true); 

    //start the database 
    useEffect(() => {
        const initDatabase = async () => {
            try {
                await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS menu (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    price REAL,
                    description TEXT,
                    image TEXT,
                    category TEXT
                    );
                `);
                console.log('✅ Database initiated');

                const result = await db.getFirstAsync(`SELECT COUNT(*) as count FROM menu`);
                const count = result.count;

                if (count > 0) {
                    console.log(`✅ Rows found: ${count}`);
                    const result = await db.getAllAsync('SELECT * FROM menu');
                    setMenuList(result);
                    console.log('data from database',count)
                } else {
                    console.log('🆕 No data in table. Fetching from API...');
                    await fetchAndStoreData();
                    console.log('Data Fetched and store')
                }
            } catch (error) {
                console.error('initDatabase or checkData error:', error);
            }
        };
        initDatabase();
    }, []);

    // nothing in the database then fetch
    const fetchAndStoreData = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const json = await response.json();
            setMenuList(json.menu);
            for (const row of json.menu ) {
                await db.runAsync(
                    `INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)`,
                    [row.name, row.price, row.description, row.image, row.category]
                );
            };
            const allRows = await db.getFirstAsync(`SELECT COUNT(*) as count FROM menu`) ;
            console.log('num of rows after fetch', allRows.count)            
        } catch (error) {
            console.error('error in fetching', error)
        };
    }


    // Filter logic - skip first render
    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;  // Skip the first render
        }

        const selectedCategories = categories.filter((_, i) => filters[i]);
        const filterData = async () => {
            try {
                let result;
                if (selectedCategories.length === 0) {
                    result = await db.getAllAsync(`SELECT * FROM menu`);
                } else {
                    const placeholders = selectedCategories.map(() => '?').join(', ');
                    const query = `SELECT * FROM menu WHERE category IN (${placeholders})`;
                    result = await db.getAllAsync(query, selectedCategories);
                }
                setMenuList(result);
            } catch(error) {
                console.error('Filter error:', error);
            }
        };
        
        filterData();
    }, [filters]);

    const toggleFilterAtIndex = (index) => {
        const updated = [...filters];
        updated[index] = !filters[index];
        setFilters(updated);
    };

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

    const Item = ({name, description, price, image})=> (
        <View style={{ padding:15, height:100}}>
            <Text style={{fontSize:20}}>{name}</Text>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:3, paddingBottom:8, paddingRight:5}}>
                    <Text numberOfLines={2}>{description}</Text>
                    <Text style={{fontSize:20, opacity:0.3, fontWeight:'bold'}}>${price}</Text>
                </View>
                <View style={{flex:1}}>
                    <Image source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}} style={{height:'100%', width:'100%', borderRadius:5}}/>
                </View>
            </View>
        </View>
    )
    const renderItem = ({item})=> <Item name={item.name} 
                                        description={item.description}
                                        price={item.price}
                                        image={item.image}
                                    />

    return (
        <SafeAreaView style={{flex:1}}>

            {/** GREEN SECTION ------------------------------------------------- */}

            <View  style={{flex:1.2, backgroundColor:'#507355', padding:15}}>
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
                <View style={{flex:0.3, justifyContent:'center', flexDirection:'row', alignItems:'center', marginTo5:10}}>
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

            {/**FILTER --------------------------------------------------------- */}

            <View style={{flex:0.2, flexDirection:'row'}}>
                <Pressable 
                    style={[styleButtom, {flex:1}, filters[0] && styleButtomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(0);
                    }}>
                    <Text style={styleButtomText}>Starters</Text>
                </Pressable>
                <Pressable 
                    style={[styleButtom, {flex:1}, filters[1] && styleButtomPress]}
                    onPress={() => {
                        toggleFilterAtIndex(1);
                    }}
                >
                    <Text style={styleButtomText}>Mains</Text>
                </Pressable>

                <Pressable 
                    style={[styleButtom, {flex:1}, filters[2] && styleButtomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(2);
                    }
                    }>
                    <Text style={styleButtomText}>Desserts</Text>
                </Pressable>
                <Pressable 
                    style={[styleButtom, {flex:1}, filters[3] && styleButtomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(3);
                    }}>
                    <Text style={styleButtomText}>Drinks</Text>
                </Pressable>
            </View>
            
            {/** MENU LIST  ------------------------------------------------- */}

            <View style={{flex:2}}>
                <FlatList 
                    data={menuList} 
                    renderItem={renderItem} 
                    ItemSeparatorComponent={() => 
                        <View style={{ height: 1, backgroundColor: '#507355', marginHorizontal: 10 }} />}
                />
            </View>
            
        </SafeAreaView>
    );
}