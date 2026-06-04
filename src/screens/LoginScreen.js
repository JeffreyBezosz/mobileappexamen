import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";

export default function LoginScreen({ navigation, user, setUser }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");

  const login = () => {
    if (!name || !email) {
      setMessage("Vul je naam en e-mail in.");
      return;
    }

    setUser({ name, email });
    setMessage("Je bent ingelogd met dummy data.");
  };

  const logout = () => {
    setUser(null);
    setName("");
    setEmail("");
    setMessage("Je bent uitgelogd.");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Account"
        title="Login"
        subtitle="Dummy login voor extra functionaliteit in de app."
      />

      <TextInput
        placeholder="Naam"
        placeholderTextColor="#8b94a3"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#8b94a3"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Pressable style={styles.primaryButton} onPress={login}>
        <Text style={styles.primaryText}>Inloggen</Text>
      </Pressable>

      {user ? (
        <Pressable style={styles.secondaryButton} onPress={logout}>
          <Text style={styles.secondaryText}>Uitloggen</Text>
        </Pressable>
      ) : null}

      {message ? <Text style={styles.message}>{message}</Text> : null}
      {user ? <Text style={styles.userText}>Ingelogd als {user.name}</Text> : null}

      <Pressable style={styles.linkButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.linkText}>Terug naar home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: spacing.page,
    paddingBottom: 40,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    paddingVertical: 14,
  },
  primaryText: {
    color: colors.white,
    fontWeight: "900",
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: colors.darkGreen,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 14,
  },
  secondaryText: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
  message: {
    color: colors.darkGreen,
    fontWeight: "800",
    marginTop: 14,
  },
  userText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 14,
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: colors.darkGreen,
    fontWeight: "900",
  },
});
