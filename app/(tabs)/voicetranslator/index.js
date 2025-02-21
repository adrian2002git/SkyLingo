import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import InputBox from "../../components/InputBox";
import ItemSeparator from "../../components/ItemSeparator";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import * as Speech from 'expo-speech';

const languages = [
    { label: "Deutsch", value: "de" },
    { label: "Englisch", value: "en" },
    { label: "Französisch", value: "fr" },
    { label: "Spanisch", value: "es" },
    { label: "Japanisch", value: "ja" },
    { label: "Koreanisch", value: "ko" },
  ];

export default function VoiceTranslator() {

    const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [debouncedText, setDebouncedText] = useState(text);
  const [targetLanguage, setTargetLanguage] = useState("de");

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
          source: "auto",
          target: "de",
          text: text,
          translatedtext: translated,
        });

        console.log("Übersetzung gespeichert:", res.data);
      } catch (error) {
        console.error("Fehler beim Speichern der Übersetzung:", error);
      }
    };

    saveTranslation();
  }, [translated]);


    const speak = () => {
      const text = translated;
      Speech.speak(text, {
        language: targetLanguage, // für deutsche Sprache
      });
    };
  
    return (
      
      <View style={styles.view}>
      <View style={styles.inputContainer}>
        <InputBox onChangeText={setText} value={text} style={styles.inputbox} />
      </View>
      <ItemSeparator />
      <View style={styles.outputContainer}>
      <Picker
          selectedValue={targetLanguage}
          onValueChange={(itemValue) => setTargetLanguage(itemValue)}
          style={styles.picker}
        >
          {languages.map((lang) => (
            <Picker.Item key={lang.value} label={lang.label} value={lang.value} />
          ))}
        </Picker>
        <Text style={styles.outputbox}>Translation: {translated}</Text>
        <Button title="Sprechen" onPress={speak} />
      </View>
    </View>
    );
  }

  const styles = StyleSheet.create({
    view: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      width: "100%",
      padding: 10,
      marginBottom: 20,
    },
    inputbox: {
      height: 100,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 15,
      textAlignVertical: "top",
    },
    outputContainer: {
      width: "100%",
      padding: 1,
    },
    outputbox: {
      minHeight: 100,
      padding: 15,
      backgroundColor: "#f4f4f4",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      textAlignVertical: "top",
      justifyContent: "flex-start",
    },
    seperator: {
      margin: 5,
    },
  });
  