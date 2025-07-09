import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';


export default function FormScreen({ navigation }) {
    const [email, setEmail] = useState('');

    useEffect(() => {
        console.log('Formscreen montada!');
        return () => {
            console.log('Formscreen desmontada');
        };
    }, []);
    useEffect(() => {
        if (nome.length > 0) {
            Alert.alert('Entrada', `Você digitou: ${nome}`);
        }
    }, [nome]);

    const handleSubmit = () => {
        if (nome.trim() && email.trim()) {
            navigation.navigate('Details', {
                mensagem: `Nome submetido: ${nome}, Email: ${email}`
            });
        } else {
            Alert.alert('Erro', 'Por favor, insira nome e email.');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Formulário</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#dc3545' }]}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#dc3545' }]}
                onPress={() => navigation.navigate('Scroll')}
            >
                <Text style={styles.buttonText}>Voltar para Scroll</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
