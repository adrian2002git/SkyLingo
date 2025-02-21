import Dialog from "react-native-dialog";
import {View, StyleSheet } from "react-native";

export default function DeleteDialog() {
    return (
        <View>
            <Dialog.Container visible={true} style={styles.container}>
                <Dialog.Title>
                    Delete Record
                </Dialog.Title>
                <Dialog.Description>
                    Do you really want to delete this record? You cannot undo this.
                </Dialog.Description>
                <Dialog.Button label="Cancel" style={styles.cancel}>

                </Dialog.Button>
                <Dialog.Button label="Delete" style={styles.delete}>

                </Dialog.Button>
            </Dialog.Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    cancel: {
        backgroundColor: "white"
    },
    delete: {
        backgroundColor: "red"
    }
})