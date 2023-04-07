import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
} from 'react-native';
import axios from 'axios';

const ToDo = () => {
    const [city, setCity] = useState('Lyon');
    const [weather, setWeather] = useState(null);
    const OPENWEATHER_API_KEY = '24e52e2a264859eafbd347c8dd05b12a';

    const handleWeatherClick = async () => {
        const data = await fetchWeather(city);
        setWeather(data);
    };

    const fetchWeather = async (city) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&lang=fr`;
        const response = await axios.get(url);
        return response.data;
    };

    useEffect(() => {
        handleWeatherClick();
    }, [city]);

    return (
        <ImageBackground
            source={{
                uri: 'https://i.pinimg.com/564x/06/94/b1/0694b1d20329a735180d724f5f94be89.jpg',
            }}
            style={styles.backgroundImage}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder="Entrer le nom de la ville pour connaitre sa météo"
                />
                {weather && (
                    <View style={[styles.weatherCard, { backgroundColor: 'white' }]}>
                        <Text style={[styles.weatherText, { color: 'black' }]}>

                            {weather.weather[0].description}
                        </Text>
                        <Text style={[styles.weatherText, { color: 'black' }]}>
                            {Math.round(weather.main.temp - 273.15)}°C
                        </Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    todoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    editButton: {
        backgroundColor: '#FFA500',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    editText: {
        color: 'white',
        fontSize: 12,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    deleteText: {
        color: 'white',
        fontSize: 12,
    },
    weatherContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    weatherText: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default ToDo;

