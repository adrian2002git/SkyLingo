import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router"

export default function Detail() {
    const { translationId, inputLanguage, outputLanguage, text, translation } = useLocalSearchParams();
    const navigation = useNavigation();

    const goToHistory = () => {
        navigation.navigate("History");
    }
    return (
        <View style={styles.container}>
            {/* Header mit Zurück-Button */}
            <View style={styles.header}>
                <Link href="/history" style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
                </Link>
                <Text style={styles.headerTitle}>Übersetzungsdetails</Text>
            </View>

            {/* Quelltext-Sektion */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Quelltext:</Text>
                <Text style={styles.subtitle}>Sprache: {inputLanguage}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>

            {/* Übersetzung-Sektion */}
            <View style={styles.section}>
                <Text style={styles.subtitle}>Übersetzung:</Text>
                <Text style={styles.subtitle}>Sprache: {outputLanguage}</Text>
                <Text style={styles.text}>{translation}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 64,
        backgroundColor: "#4A83AB",
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffff",
    },
    section: {
        paddingTop: 8,
        paddingLeft: 16,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 8,
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
});
