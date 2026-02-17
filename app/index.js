import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Blarney Castle</Text>
      <Text style={styles.subtitle}>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f584d",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
  },
});
