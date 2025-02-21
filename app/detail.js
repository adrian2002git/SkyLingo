import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Detail() {
    const { translationId, inputLanguage, outputLanguage, text, translation } = useLocalSearchParams();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header mit Zurück-Button */}
            <View style={styles.header}>
                {navigation.canGoBack() && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={28} color="#333" />
                    </TouchableOpacity>
                )}
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
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
    },
    section: {
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
