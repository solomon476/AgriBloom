import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default function ExpenseLoggerScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // === VOICE NOTE HANDLING ===
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
        setIsRecording(true);
      } else {
        Alert.alert('Permission Denied', 'Please grant microphone permissions.');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording) return;
    
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);
    
    // Auto-transcribe by sending to backend OCR/Voice route
    simulateVoiceTranscription(uri);
  };

  const simulateVoiceTranscription = async (uri: string | null) => {
    setIsUploading(true);
    // Mocking an API call to /api/voice/transcribe
    setTimeout(() => {
      setDescription('Bought 2 bags of fertilizer for 4500 shillings');
      setAmount('4500');
      setCategory('FERTILIZER');
      setIsUploading(false);
      Alert.alert('Transcription Success', 'Voice note transcribed and fields auto-filled!');
    }, 2000);
  };

  // === OCR RECEIPT HANDLING ===
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'You need to grant camera roll permissions!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setReceiptImage(result.assets[0].uri);
      simulateOCRScan(result.assets[0].uri);
    }
  };

  const simulateOCRScan = async (uri: string) => {
    setIsUploading(true);
    // Mocking API call to /api/ocr/scan-receipt
    setTimeout(() => {
      setAmount('3200');
      setCategory('SEEDS');
      setIsUploading(false);
      Alert.alert('OCR Success', 'Receipt scanned successfully. Fields auto-filled!');
    }, 1500);
  };

  const submitExpense = () => {
    Alert.alert('Expense Saved', `Logged ${amount} KES for ${category}`);
    setAmount('');
    setCategory('');
    setDescription('');
    setReceiptImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Expense</Text>

      {/* Voice Input Button */}
      <TouchableOpacity 
        style={[styles.voiceButton, isRecording && styles.voiceButtonRecording]} 
        onPressIn={startRecording} 
        onPressOut={stopRecording}
      >
        <Text style={styles.voiceButtonText}>
          {isRecording ? 'Listening (Release to stop)...' : '🎙 Hold to Speak'}
        </Text>
      </TouchableOpacity>

      {/* OCR Scan Button */}
      <TouchableOpacity style={styles.scanButton} onPress={pickImage}>
        <Text style={styles.scanButtonText}>📸 Upload Receipt (OCR)</Text>
      </TouchableOpacity>

      {receiptImage && (
        <Image source={{ uri: receiptImage }} style={styles.imagePreview} />
      )}

      {isUploading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginVertical: 20 }} />
      ) : (
        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Amount (KES)" 
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Category (e.g. Fertilizer, Labor)" 
            value={category}
            onChangeText={setCategory}
          />
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Description" 
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.saveButton} onPress={submitExpense}>
            <Text style={styles.saveButtonText}>Save Expense</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#2E7D32' },
  voiceButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  voiceButtonRecording: { backgroundColor: '#D32F2F' },
  voiceButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  scanButton: { backgroundColor: '#1976D2', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  scanButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  imagePreview: { width: '100%', height: 150, borderRadius: 10, marginBottom: 20, resizeMode: 'cover' },
  form: { flex: 1 },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  textArea: { height: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#2E7D32', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
