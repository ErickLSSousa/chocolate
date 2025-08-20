import { StyleSheet, View, Text, ActivityIndicator, Alert, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import * as Location from 'expo-location';

export default function LocationScreen() {
    const { theme } = useSelector((state) => state.tasks);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const getLocation = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permissão de localização negada');
                setIsLoading(false);
                return;
            }

            const locationData = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const { latitude, longitude } = locationData.coords;
            setLocation({ latitude, longitude });

            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                    {

                        headers: {
                            'User-Agent': 'taskApp/1.0 (https://github.com/username/taskApp)'
                        }
                    }
                );
                setAddress(response.data.display_name);
            } catch (err) {
                setError('Erro ao obter endereço: ' + err.message);
                console.log('Erro na geocodificação', err);
            }
            setIsLoading(false);
        } catch 
        (err) {
            setError('Erro ao carregar localização: ' + err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
            <Text style={[styles.title, theme === 'dark' && styles.darkText]}>Sua localização</Text>
            {IsLoading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : error ? (
                <>
                    <Text style={[styles.errorText, theme === 'dark' && styles.darkText]}>{error}</Text>
                    <CustomButton title="Tentar novamente" onPress={getLocation} color="#ffc107" />
                </>
            ) : location ? (
                <>
                    <Text style={[styles.locationText, theme === 'dark' && styles.darkText]}>Latitude: {location.latitude.toFixed(6)}</Text>
                    <Text style={[styles.locationText, theme === 'dark' && styles.darkText]}>Longitude: {location.longitude.toFixed(6)}</Text>
                    <Text style={[styles.locationText, theme === 'dark' && styles.darkText]}>Endereço: {address || 'Carregando endereço...'}</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            title="Você está aqui"
                            pinColor="#007bff"
                        />
                    </MapView>
                    <CustomButton
                        title="Atualizar localização"
                        onPress={getLocation}
                        color="#007bff"
                    />
                </>
            ) : (
                <Text style={[styles.text, theme === 'dark' && styles.darkText]}>OBtendo localização...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    darkText: {
        color: '#fff',
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: '#dc3545',
        marginBottom: 10,
    },
    map: {
        width: Dimensions.get('window').width - 40,
        height: 300,
        marginVertical: 20,
        borderRadius: 10,
    },
});