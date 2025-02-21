

export default function TextToSpeech({text}) {
    const SynthesizeSpeech = async () => {
        try {
          const response = await fetch("http://localhost:5002/api/tts", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: "Hallo, ich bin Coqui TTS",
              voice: "tts_models/en/ljspeech/tacotron2-DDC",
            }),
          });
      
          if (!response.ok) {
            throw new Error("Fehler beim Abrufen der Sprachausgabe");
          }
      
          const audioBlob = await response.blob();
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
        } catch (error) {
          console.error("Fehler:", error);
        }
      };
}


  