import { StyleSheet, View, Text, Image, TouchableOpacity , Alert} from "react-native";
import cloudy from "../../assets/cloudy_logo.png";
import help_center_icon from "../../assets/help_center_24dp_FFFFFF.png";
import settings_icon from "../../assets/settings_24dp_FFFFFF.png";
import deleteIcon from "../../assets/deleteIcon.png";

export default function Header({ style, textStyle, showDeleteIcon, onDelete, onHelping, onSettings, ...props }) {
    const deleteHistory = () => {
        Alert.alert(
            "Bestätigung",
            "Möchtest du wirklich alle Einträge löschen?",
            [
                { text: "Abbrechen", style: "cancel" },
                { 
                    text: "Ja, löschen", 
                    onPress: async () => {
                        try {
                            const response = await fetch("http://192.168.121.36:5003/verlauf-delete", {
                                method: "DELETE",
                            });

                            console.log("Response Status:", response.status); 

                            if (!response.ok) {
                                throw new Error(`Fehler: ${response.status}`);
                            }

                            const data = await response.json();
                            console.log("Antwort der API:", data);
                            Alert.alert("Erfolg", "Alle Einträge wurden gelöscht.");
                            
                    
                        } catch (error) {
                            console.error("Fehler beim Löschen:", error);
                            Alert.alert("Fehler", "Daten konnten nicht gelöscht werden.");
                        }
                    },
                },
            ]
        );
    };
    // Navigation functions
    const handleHelp = () => {
        navigation.navigate('Help'); // Navigate to Help screen
    };

    const handleSettings = () => {
        navigation.navigate('Settings'); // Navigate to Settings screen
    };

    return (
        <View style={{ ...defaultStyle.container, ...style }} {...props}>
            <Image source={cloudy} style={defaultStyle.icon} />
            <Text style={{ ...defaultStyle.text, ...textStyle, flex: 1 }}>SkyLingo</Text>

            <View style={defaultStyle.iconsContainer}>
                {showDeleteIcon && (
                    <TouchableOpacity onPress={deleteHistory}>
                        <Image source={deleteIcon} style={defaultStyle.iconSize} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleHelp}>
                    <Image source={help_center_icon} style={defaultStyle.iconSize} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSettings}>
                    <Image source={settings_icon} style={defaultStyle.iconSize} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const defaultStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        backgroundColor: "#4A83AB",
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    icon: {
        width: 30, 
        height: 30,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft: 16,
        color: "white",
    },
    iconsContainer: {
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    iconSize: {
        width: 30, 
        height: 30, 
        marginLeft: 8,
    },
});
