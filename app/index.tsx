import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <View style={styles.triangle} />
          <View style={styles.semicircle} />
        </View>
      </View>
      
      <Text style={styles.title}>NoteMaster</Text>
      <Text style={styles.subtitle}>Welcome to NoteMaster, your notes organized perfectly.</Text>
      
      <Link href="/(tabs)" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 86.6, // 等边三角形的高度
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#6C63FF', // 紫色
  },
  semicircle: {
    width: 40,
    height: 20,
    backgroundColor: '#FF69B4', // 粉色
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: 300,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
