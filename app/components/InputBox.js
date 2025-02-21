import { View,Text, TextInput, StyleSheet } from "react-native"

export default function InputBox({label, value, onChangeText}) {
        return(
            <View>
                <TextInput
                value={value}
                placeholder="Text Hier eingeben..."
                onChangeText={onChangeText}
                style={styles.inputText}
                multiline={true}
                ></TextInput>
            </View>
        )
}

const styles = StyleSheet.create({
        inputText: {
            fontSize: 18,
        },
        placeholder: {
            fontSize: 10,
        }
})