import { Slot } from "expo-router" 
import { Text } from "react-native"
import { Tabs } from "expo-router"
import Ionicons from "@expo/vector-icons/Ionicons"
// import cloudy.png from "../../assets/cloudy.png";
import { Stack } from "expo-router/stack";
import { createStackNavigator } from "react-native-screens";
import Header from "../components/header";


export default function TabsLayout() {

return (
        <Tabs>
            <Tabs.Screen 
            name="home/index"
            options={{
                header: () => <Header></Header>,
                headerShown: "true",
                title: "Home",
                tabBarIcon: ({ color }) => (
                    <Ionicons
                        size={28}
                        style={{marginBottom: -3}}
                        name="home"
                        color={color}
                    />
                ),
            }}
             />

             <Tabs.Screen
                name="translator/index"
                options={{
                    header: () => <Header></Header>,
                    title: "Translator",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={{marginBottom: -3}}
                            name="language"
                            color={color}
                            />
                    ),
                }}
                />

            <Tabs.Screen
                name="voicetranslator/index"
                options={{
                    header: () => <Header></Header>,
                    title: "VoiceTranslator",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={{marginBottom: -3}}
                            name="mic"
                            color={color}
                            />
                    ),
                }}
                />

            <Tabs.Screen
                name="history/index"
                options={{
                    header: () => <Header showDeleteIcon={true}></Header>,
                    title: "History",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={28}
                            style={{marginBottom: -3}}
                            name="time"
                            color={color}
                            />
                    ),
                }}
                />
        </Tabs>


    )

}


