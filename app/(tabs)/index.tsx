import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import NoteCard from '@/components/NoteCard';

const initialNotes = [
  {
    id: 1,
    title: 'Project Status',
    description: 'Summary of meeting notes on project status.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-13',
  },
  {
    id: 2,
    title: 'Marketing Strategy',
    description: 'Key takeaways from the latest marketing strategy session.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-12',
  },
  {
    id: 3,
    title: 'Product Launch',
    description: 'Ideas for new product launch and promotional activities.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-11',
  },
  {
    id: 4,
    title: 'Customer Feedback',
    description: 'Outline of customer feedback and improvement suggestions.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-10',
  },
  {
    id: 5,
    title: 'Financial Planning',
    description: 'Summary of the financial planning meeting.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-09',
  },
  {
    id: 6,
    title: 'Project Status',
    description: 'Summary of meeting notes on project status.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-13',
  },
  {
    id: 7,
    title: 'Project Status',
    description: 'Summary of meeting notes on project status.',
    image: require('@/assets/images/adaptive-icon.png'),
    date: '2024-03-13',
  },
];

export default function Home() {
  const [notes, setNotes] = useState(initialNotes);
  const [searchText, setSearchText] = useState('');

  const handleDeleteNote = (id: number) => {
    console.log('Deleting note:', id);
    setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <View style={styles.headerRight}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="stats-chart-outline" size={24} color="#666" />
          </Pressable>
          <View style={styles.avatar}>
            <Ionicons name="person-circle-outline" size={40} color="#666" />
          </View>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.notesListContainer}>
        <ScrollView style={styles.notesList} showsVerticalScrollIndicator={false}>
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
            />
          ))}
        </ScrollView>
      </View>

      <Link href="/add" asChild>
        <Pressable style={styles.addButton}>
          <Ionicons name="person-add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>添加笔记</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  notesListContainer: {
    flex: 1,
  },
  notesList: {
    flex: 1,
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 80, // 位于底部标签栏上方
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 