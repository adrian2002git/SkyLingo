import { useState, useCallback } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import HistoryListItem from "../../components/HistoryListItem";
import ItemSeparator from "../../components/ItemSeparator";
import Spinner from "../../components/Spinner";

const API_URL = "http://192.168.121.36:5003/get-translations";

export default function History() {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            console.log("Daten werden geladen...");
            const res = await axios.get(API_URL);
            setRecords(res.data);
            console.log("Verlauf geladen:", res.data);
        } catch (error) {
            console.error("Fehler beim Abrufen des Verlaufs:", error);
            Alert.alert("Fehler", "Der Verlauf konnte nicht geladen werden.");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            fetchHistory();
        }, [])
    );

    return (
        <View style={{ flex: 1, padding: 16 }}> 
            {isLoading ? (
                <Spinner />
            ) : (
                <FlatList
                    data={records}           
                    renderItem={({ item }) => <HistoryListItem item={item} />}
                    ItemSeparatorComponent={ItemSeparator}
                    ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Kein Verlauf vorhanden</Text>}
                />
            )}
        </View>
    );
}
