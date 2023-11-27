import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'


export default function Picker(props) {
    const hr = [];
    for (let i = 0; i < props.p; i++) {
        let x = i.toString();
        if (i < 10)
            x = '0' + x;
        hr.push({ key: i, name: x });
    }

    const [pressedItem, setPressedItem] = useState(null);

    const renderItem = ({ item }) => (
        <Item item={item} pressedItem={pressedItem} setPressedItem={setPressedItem} />
    );
    const sendvalue=(a)=>
    {
        props.sendnumber(a)        
    }
    const Item = React.memo(({ item, pressedItem, setPressedItem }) => (
        <TouchableHighlight underlayColor={'null'}
            onPress={() => {setPressedItem(item.key); sendvalue(item.key)}}
            key={item.key}
        >
            <Text style={[
                styles.textlist,
                { color: pressedItem === item.key ? "white" : "grey" }
            ]}>
                {item.name}
            </Text>
        </TouchableHighlight>
    ));
   
    return (
        <View style={styles.container}>
            <FlatList
                data={hr}
                renderItem={renderItem}
                keyExtractor={(item) => item.key.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        
        
        height: 330,
    },
    textlist: {
        fontSize: 30,
        fontFamily: 'sans-serif',
        padding: 15,
    }
});
