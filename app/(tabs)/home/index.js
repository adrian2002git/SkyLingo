import { View, Text, StyleSheet } from "react-native"
import { useState, useEffect } from "react";
import { Image } from "react-native";
import cloudy_logo from "../../../assets/cloudy_logo.png"

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <Image source={cloudy_logo} style={styles.cloudy}/>
            <Text style={styles.text}>WELCOME TO SKYLINGO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 30,
        fontFamily: "roboto",
        whiteSpace: "pre-wrap",
    },
    cloudy: {
        resizeMode: "contain",
        height: 200,
        width: 200
    }
});
