import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import DetailsScreen from './details';

const DATA=[
    {id:'1', title:'Item 1', description: ' Descrição do item 1'}
    {id:'2', title:'Item 2', description: ' Descrição do item 2'}
    {id:'3', title:'Item 3', description: ' Descrição do item 3'}
    {id:'4', title:'Item 4', description: ' Descrição do item 4'}
    {id:'5', title:'Item 5', description: ' Descrição do item 5'}
]

export default function ProfileScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}>

                <Text style={styles.buttonText}>Voltar para Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Details', { mensagem: 'Olá do Perfil!' })}
            >
                <Text style={styles.buttonText}>Ir para Detalhes</Text>
            </TouchableOpacity>
        </View >
    )
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Itens</Text>
            <FlatList
            Data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={style.id}
                />
           <TouchableOpacity
           style={[styles.button , {backgroundColor : '#28a745'}]}
           onPress={() => navigation.navigate('Profile')}
           >
            <Text style={styles.buttonText}>Ir para Perfil</Text>
            </TouchableOpacity>     
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    list: {
      flex: 1,
    },
    card: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    cardDescription: {
      fontSize: 14,
      color: '#666',
      marginTop: 5,
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
  
