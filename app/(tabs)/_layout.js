import { Tabs } from "expo-router"
import Ionicons from "@expo/vector-icons/Ionicons"
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


