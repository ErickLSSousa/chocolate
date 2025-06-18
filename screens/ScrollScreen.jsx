import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import ScrollCard from '../components/ScrollCard';

export default function ScrollScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela com ScrollView</Text>
            <ScrollView style={styles.scrollContainer}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <ScrollCard key={index} index={index}>
                        title={item.title}
                        image={item.Image}
                        text={item.text}
                    </ScrollCard>


                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    scrollContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});