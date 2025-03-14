import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, Platform } from 'react-native';
import { router } from 'expo-router';

// Web端的Alert替代方案
const webAlert = (title: string, message: string, buttons: any[]) => {
  if (typeof window !== 'undefined') {
    const result = window.confirm(`${title}\n${message}`);
    if (result) {
      const confirmButton = buttons.find(button => button.style === 'destructive');
      confirmButton?.onPress?.();
    }
  }
};

interface Note {
  id: number;
  title: string;
  description: string;
  image: any;
  date?: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const handlePress = () => {
    router.push({
      pathname: "/(tabs)/add",
      params: { 
        id: note.id,
        title: note.title,
        description: note.description,
        date: note.date || new Date().toLocaleDateString()
      }
    });
  };

  const handleLongPress = () => {
    // 使用setTimeout来确保Alert在长按事件完成后显示
    setTimeout(() => {
      if (Platform.OS === 'web') {
        webAlert(
          "删除笔记",
          "确定要删除这条笔记吗？",
          [
            {
              text: "取消",
              style: "cancel"
            },
            {
              text: "删除",
              style: "destructive",
              onPress: () => {
                console.log('Deleting note from card:', note.id);
                onDelete(note.id);
              }
            }
          ]
        );
      } else {
        Alert.alert(
          "删除笔记",
          "确定要删除这条笔记吗？",
          [
            {
              text: "取消",
              style: "cancel"
            },
            {
              text: "删除",
              style: "destructive",
              onPress: () => {
                console.log('Deleting note from card:', note.id);
                onDelete(note.id);
              }
            }
          ],
          { cancelable: true }
        );
      }
    }, Platform.select({ ios: 50, android: 0, default: 0 }));
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.noteCard,
        pressed && styles.noteCardPressed
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={300}
    >
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text style={styles.noteDescription}>{note.description}</Text>
      </View>
      <Image source={note.image} style={styles.noteImage} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteCardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  noteContent: {
    flex: 1,
    marginRight: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noteImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
}); 