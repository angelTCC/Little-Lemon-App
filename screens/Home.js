import { View, 
    Text, 
    Pressable, 
    Image, 
    SafeAreaView, 
    FlatList,
    TextInput, 
    StyleSheet,
    ActivityIndicator,
    Alert} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as SQLite from 'expo-sqlite';
import { supabase } from '../lib/supabase';
import { Ionicons } from "@expo/vector-icons";

const db = SQLite.openDatabaseSync('little_lemon.db');

export default function Home () {

    const categories = ['starters', 'mains', 'desserts', 'drinks'];
    const [ filters, setFilters ] = useState([false, false, false, false]);
    const [ menuList, setMenuList ] = useState([]);
    const [ dbReady, setDbReady] = useState(false);
    const [ searchText, setSearchText ] = useState('');

    {/* Init the database, if data is empty (no rows), get data from supabase */}
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
                //await db.execAsync(`DELETE FROM menu`);
                const result = await db.getFirstAsync(`SELECT COUNT(*) as count FROM menu`);
                const count = result.count;

                if (count > 0) {
                    console.log(`✅ Rows found: ${count}`);
                    const result = await db.getAllAsync('SELECT * FROM menu');
                    setMenuList(result);
                } else {
                    console.log('🆕 No data in table. Fetching from API...');
                    await fetchAndStoreData();
                    console.log('Data Fetched and store')
                }
                setDbReady(true);
            } catch (error) {
                console.error('initDatabase or checkData error:', error);
            }
        };
        initDatabase();
    }, []);

    // Function to get data from Supabase, store the data in database local
    const fetchAndStoreData = async () => {
        try {
            
            {/*}
            // data set demo
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const json = await response.json();
            setMenuList(json.menu);
            console.log(json.menu);
            // json.menu -> data
            */}

            const { data, error } = await supabase.from("menu").select("*");
            if (error) {
                console.error("❌ Supabase error:", error.message);
            } else {
                console.log("✅ Successful connection to supabase");
            }
            
            // store data in sqlite, local database
            for (const row of data ) {
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

    // Filter logic after the database is ready: filer by word and category
    useEffect(() => {
         if (!dbReady) return;

        const filterData = async () => {
            try {

                let result;
                let query = 'SELECT * FROM menu';
                let conditions = [];
                let params = [];
                const selectedCategories = categories.filter((_, i) => filters[i]);

                // filter by category -----
                if (selectedCategories.length > 0) {
                    const placeholders = selectedCategories.map(() => '?').join(', '); // '?,?,?'
                    conditions.push( `category IN (${placeholders})` );
                    params.push(...selectedCategories)
                }

                // filter by word --------
                if (searchText.trim() != '') {
                    conditions.push(`(name LIKE ? OR description LIKE ?)`)
                    params.push(`%${searchText}%`, `%${searchText}%` )
                }

                // query -----------------
                if (conditions.length > 0) {
                    query += ' WHERE ' + conditions.join(" AND ");
                }
                result = await db.getAllAsync(query, params);

                setMenuList(result);
                {/* 
                    SELECT * FROM menu 
                    WHERE category IN (?, ?) AND (name LIKE ? OR description LIKE ?)
                */}

            } catch(error) {
                console.error('Filter error:', error);
            }
        };
        
        filterData();

    }, [filters, searchText, dbReady]);

    // Changing the filter state
    const toggleFilterAtIndex = (index) => {
        const updated = [...filters];
        updated[index] = !filters[index];
        setFilters(updated);
    };

    {/* List menu */}
    const Item = ({name, description, price, image})=> {
        
        const [loadingImg, setLoadingImg] = useState(true);

        // return random img if the dishes is not found
        const [imgUri, setImgUri] = useState(
            `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`
        );
        const handleError = async () => {
            try {
                setLoadingImg(true);
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
                const data = await response.json();
                setImgUri(data.meals[0].strMealThumb);
            } catch (err) {
                console.error("Fallback fetch failed:", err);
            } finally {
            };
        };

            return (
                <View style={{ padding:15, height:100}}>
                    <Text style={{fontSize:20}}>{name}</Text>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:3, paddingBottom:8, paddingRight:5}}>
                            <Text numberOfLines={2}>{description}</Text>
                            <Text style={{fontSize:20, opacity:0.3, fontWeight:'bold'}}>${price}</Text>
                        </View>
                        <View style={{flex:1, 
                            justifyContent: "center",
                            alignItems: "center",}}>
                            <Image 
                                source={{uri: imgUri}} 
                                style={{height:'100%', width:'100%', borderRadius:5}}
                                onError={handleError}
                                onLoadStart={() => setLoadingImg(true)}
                                onLoadEnd={() => setLoadingImg(false)}/>
                            {loadingImg && (
                                <ActivityIndicator
                                size="small"
                                color="#0000ff"
                                style={{ position: "absolute" }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            )
    };
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

                {/* Search by keyword ---------------------- */}
                <View style={[styles.textInput,{flexDirection:'row'}]}>
                    {/*
                    <Pressable 
                        onPress={ () => searchMenu(searchText) }
                        style={{flex:0.1, paddingTop:10}}>
                        
                    </Pressable>
                    */}
                    <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
                        <Ionicons name="search-outline" size={15} color="black"/>
                    </View>
                    <TextInput
                        style= {[{flex:15}]}
                        value= {searchText}
                        placeholder='Search food'
                        onChangeText = {setSearchText}
                    />
                </View>

            </View>
            <View style={{paddingTop:10, paddingLeft:10}}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>ORDER FOR DELIVERY!</Text>
            </View>

            {/**FILTER --------------------------------------------------------- */}

            <View style={{flex:0.2, flexDirection:'row'}}>
                <Pressable 
                    style={[styles.buttom, {flex:1}, filters[0] && styles.buttomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(0);
                    }}>
                    <Text style={styles.buttomText}>Starters</Text>
                </Pressable>
                <Pressable 
                    style={[styles.buttom, {flex:1}, filters[1] && styles.buttomPress]}
                    onPress={() => {
                        toggleFilterAtIndex(1);
                    }}
                >
                    <Text style={styles.buttomText}>Mains</Text>
                </Pressable>
                <Pressable 
                    style={[styles.buttom, {flex:1}, filters[2] && styles.buttomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(2);
                    }
                    }>
                    <Text style={styles.buttomText}>Desserts</Text>
                </Pressable>
                <Pressable 
                    style={[styles.buttom, {flex:1}, filters[3] && styles.buttomPress]}
                    onPress={()=>{
                        toggleFilterAtIndex(3);
                    }}>
                    <Text style={styles.buttomText}>Drinks</Text>
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

const styles = StyleSheet.create({
    buttom:{
        backgroundColor:'#dcdddc',
        padding:5,
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10,
        margin:5
    },
    buttomPress: {
        backgroundColor:'#ece942',
    },
    buttomText: {
        color:'#507355', 
        fontSize:15, 
        fontWeight:'bold'
    },
    textInput:{
        borderWidth:1,
        //marginTop:10,
        padding:10,
        fontSize:18,
        borderRadius:10,
        backgroundColor:'#dcdcdc'
    }
})