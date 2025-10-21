import { SafeAreaView, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.container}>
      <Text style={s.title}>Blarney Castle</Text>
      <Text style={s.subtitle}>Home</Text>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0f584d' },
  title: { fontSize: 32, fontWeight: '700', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 22, color: '#fff' },
});
