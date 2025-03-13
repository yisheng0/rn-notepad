import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#6C63FF',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        height: 70,
        paddingBottom: 8,
        paddingTop: 6,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: 0,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '添加',
          tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'AI助手',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
} 