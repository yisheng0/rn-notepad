import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';

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
    console.log('Long press detected');
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
      ]
    );
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.noteCard,
        pressed && styles.noteCardPressed
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={500}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
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