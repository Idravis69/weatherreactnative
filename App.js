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
import Icon from 'react-native-vector-icons/FontAwesome';

const ToDo = () => {
    const [city, setCity] = useState('Lyon');
    const [weather, setWeather] = useState(null);
    const [time, setTime] = useState(new Date().toLocaleTimeString());

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

        const intervalID = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalID);
    }, [city]);

    return (
        <ImageBackground
            source={{
                uri: 'https://img.freepik.com/photos-premium/belle-vue-ciel-bleu-nuages-au-lever-du-soleil-partiellement-nuageux-fond-nuage-ete-nuage-ete-nuage-ciel-clair-coucher-soleil-ciel-naturel-cinematographique-beau-fond-texture-jaune-blanc_620624-3180.jpg',
            }}
            style={styles.backgroundImage}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    placeholder="Entrer le nom de la ville pour connaitre sa météo"
                />
                {weather && (
                    <View style={[styles.weatherCard]}>
                        <Text style={[styles.weatherText, { color: 'black' }]}>
                            <Icon name='thermometer' size={20} color='#1E90FF' /> {Math.round(weather.main.temp - 273.15)}°C
                        </Text>
                        <Text style={[styles.weatherText, { color: 'black' }]}>
                            <Icon name='tint' size={20} color='#1E90FF' /> {weather.main.humidity}%
                        </Text>
                        <Text style={[styles.weatherText, { color: 'black' }]}>
                            <Icon name='wind' size={20} color='#1E90FF' /> {weather.wind.speed}m/s
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

