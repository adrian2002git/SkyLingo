import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import InputBox from "../../components/InputBox";
import ItemSeparator from "../../components/ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as Speech from 'expo-speech';
import Ionicons from "@expo/vector-icons/Ionicons"

const languages = [
    { label: "Deutsch", value: "de" },
    { label: "Englisch", value: "en" },
    { label: "Französisch", value: "fr" },
    { label: "Spanisch", value: "es" },
    { label: "Japanisch", value: "ja" },
    { label: "Koreanisch", value: "ko" },
    { label: "Chinesisch", value: "zh" },
    { label: "Indonesisch", value: "id" },
    { label: "Slowakisch", value: "sk" },
  ];

export default function Translator() {

    const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);
  const [targetLanguage, setTargetLanguage] = useState("de");
  const [sourceLanguage, setSource] = useState("");

  const API_URL = "http://192.168.1.44:5003/save-translate";

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => clearTimeout(handler);
  }, [text]);

  useEffect(() => {
    if (!debouncedText) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const translateText = async () => {
      try {
        const res = await fetch("http://192.168.1.44:5000/translate", {
          method: "POST",
          body: JSON.stringify({
            q: debouncedText,
            source: "auto",
            target: targetLanguage,
            format: "text",
          }),
          headers: { "Content-Type": "application/json" },
          signal,
        });

        if (!res.ok) throw new Error(`HTTP-Fehler! Status: ${res.status}`);
        const data = await res.json();
        console.log("Übersetzung erhalten:", data); 
        console.log("alt:", data.alternatives)
        setSource(data.detectedLanguage.language)
        setTranslated(data.translatedText);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fehler beim Abrufen der Übersetzung:", error);
        }
      }
    };

    translateText();

    return () => controller.abort();
  }, [debouncedText, targetLanguage]);

  
  useEffect(() => {
    if (!text || !translated) return;

    const saveTranslation = async () => {
      try {
        const res = await axios.post(API_URL, {
          source: sourceLanguage,
          target: targetLanguage,
          text: text,
          translatedtext: translated,
        });

        console.log("Übersetzung gespeichert:", res.data);
      } catch (error) {
        console.error("Fehler beim Speichern der Übersetzung:", error);
      }
    };

    saveTranslation();
  }, [translated, targetLanguage]);


    const speak = () => {
      const text = translated;
      Speech.speak(text, {
        language: targetLanguage,
      });
    };
  
    return (  
      <View style={styles.container}>
  <View style={styles.inputContainer}>
    
    <InputBox onChangeText={setText} value={text} style={{fontSize: "20px",}}/>

  </View>
  <ItemSeparator />
  <View style={styles.outputContainer}>
    <Picker
      selectedValue={targetLanguage}
      onValueChange={(itemValue) => setTargetLanguage(itemValue)}
      style={styles.picker}
      mode="dropdown"
    >
      {languages.map((lang) => (
        <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
      ))}
    </Picker>
    
    <View style={styles.outputBox}>
      <Text style={styles.textOutput}>{translated}</Text>
      <TouchableOpacity onPress={speak} style={styles.speakerButton}>
        <Ionicons name="volume-high" size={35} color="#4A83AB" />
      </TouchableOpacity>
    </View>
  </View>
</View>

    );
  }

  const styles = StyleSheet.create({
      picker: {
        height: 50,
        width: 175,
        fontSize: 16,
        backgroundColor: "#fff", 
        borderWidth: 1, 
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10
      },  
    InputBox: {
      fontSize: 18
    },
    
    container: {
      flex: 1,
      padding: 20,
    },
  
    inputContainer: {
      fontSize: 18,
      height: 200,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      textAlignVertical: "top",
      backgroundColor: "#fff",
      marginBottom: 30,
      overflow: "wrap"
    },
  
    outputContainer: {
      width: "100%",
      padding: 10,
    },
  
    outputBox: {
      minHeight: 200,
      padding: 15,
      backgroundColor: "#f4f4f4",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      flexDirection: "row", // Ermöglicht Icon und Text in einer Reihe
      alignItems: "baseline", // Vertikal ausrichten
      justifyContent: "space-between",
    },
  
    textOutput: {
      fontSize: 18,
      flex: 1, // Nimmt den verbleibenden Platz ein
      color: "#333",
    },
  
    speakerButton: {
      marginLeft: 10,
      top: 125
    },
  });
  
  