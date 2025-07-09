import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import ScrollCard from '../components/ScrollCard';
import { useState } from 'react';

export default function ScrollScreen({ navigation }) {
    const [ClickCount, setClickCount] = useState(0);
    const DATA = {
        nome: 'arroz',
        text: 'cozido',
        image: { uri: 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png' }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tela com ScrollView</Text>
            <Text style={styles.counterText}>Iten Clicados: {ClickCount}</Text>
            <ScrollView style={styles.scrollContainer}>
                {Array.from({ length: 20 }).map((_, index) => (
                    <ScrollCard key={index} index={index} item={DATA}>
                    </ScrollCard>


                ))}
            </ScrollView>

            <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                    SetClickCount((prevCount) => prevCount + 1);
                    navigation.navigate('Details', { mensagem: `Item ${index + 1} Clicado!` })
                }}
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