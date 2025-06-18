import { StyleSheet, View, Text, TouchableOpacity , Image } from 'react-native';

export default function ScrollCard({ item, image, key, index, text}) {
    return (
        <View key={index} index={index}>
            <Image style={styles.itemImage}>{image}</Image>
            <Text style={styles.item}>{item}</Text>
            <Text style={styles.itemText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
},
item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
},
itemText: {
    fontSize: 16,
    color: '#333',
},
})