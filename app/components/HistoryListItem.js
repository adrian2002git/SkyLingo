import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

const languageMapping = {
    "de": "Deutsch",
    "en": "Englisch",
    "fr": "Französisch",
    "es": "Spanisch",
    "ja": "Japanisch",
    "ko": "Koreanisch",
    "zh": "Chinesisch",
    "id": "Indonesisch",
    "sk": "Slowakisch",
    // Weitere Abkürzungen hier hinzufügen
};

const getLanguageName = (abbreviation) => {
    return languageMapping[abbreviation] || abbreviation; // Rückgabe der Abkürzung, wenn sie nicht im Mapping enthalten ist
};

export default function HistoryListItem({ item }) {
    
    console.log(item.id)
    return (
        <Link
            href={{
                pathname: "detail",
                params: {
                    translationId: item.id,
                    inputLanguage: getLanguageName(item.source) ,
                    outputLanguage: getLanguageName(item.target),
                    text: getLanguageName(item.text), 
                    translation: getLanguageName(item.translatedtext),
                },
            }}
            asChild
        >
            <TouchableOpacity style={styles.container}>
                <Ionicons
                    name="document-text-outline"
                    size={32}
                    color="#555"
                    style={styles.icon}
                />
                <View style={styles.textContainer}>
                    <View style={styles.containerSmall}>
                        <Text>{getLanguageName(item.source)}</Text>
                        <Text>{getLanguageName(item.target)}</Text>
                    </View>
                    <View style={styles.containerSmall}>
                        <Text style={[styles.text, styles.ellipsis]} 
                            numberOfLines={1} 
                            ellipsizeMode="tail">{item.text}</Text>
                        <Ionicons name="arrow-forward" size={32} color="black" />
                        <Text style={[styles.translation, styles.ellipsis]} 
                            numberOfLines={1} 
                            ellipsizeMode="tail">{item.translatedtext}</Text>
                    </View>        
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        // height: 72,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 8,
        marginBottom: 8,
        // justifyContent: 'flex-start',

    },
    containerSmall: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row', // Ensure that the items are aligned horizontally within this container
        alignItems: 'center',
        marginBottom: 12, // Space between each row
    },
    icon: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    translation: {
        fontSize: 14,
        color: "#777",
        marginTop: 4,
    },
});
