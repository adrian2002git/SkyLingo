import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Spinner() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color="#ff5800"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
})