import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import SectionHeader from "../components/SectionHeader";
import { colors, spacing } from "../constants/theme";

const questions = [
  {
    question: "Welke campus past het best bij STEM en technologie?",
    answers: ["Campus Botaniek", "Campus Tivoli", "Campus Bruul"],
    correct: "Campus Botaniek",
  },
  {
    question: "Hoeveel campussen toont het redesign?",
    answers: ["4", "8", "12"],
    correct: "8",
  },
  {
    question: "Welke kleur hoort bij de nieuwe visuele stijl?",
    answers: ["#86bc25", "#ff9900", "#6741d9"],
    correct: "#86bc25",
  },
  {
    question: "Waarvoor gebruik je de studiezoeker?",
    answers: ["Richting vinden", "Boeken betalen", "Afwezigheden melden"],
    correct: "Richting vinden",
  },
  {
    question: "Welke app-functionaliteit hoort bij de webshop?",
    answers: ["Prijs en aantal berekenen", "Treintickets kopen", "Roosters printen"],
    correct: "Prijs en aantal berekenen",
  },
  {
    question: "Wat moet de mini-game zeker hebben?",
    answers: ["Score en timer", "Database", "Checkout"],
    correct: "Score en timer",
  },
];

const GAME_TIME = 30;

export default function GameScreen() {
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");

  const currentQuestion = useMemo(
    () => questions[questionIndex % questions.length],
    [questionIndex]
  );

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setFinished(true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  const answerQuestion = (answer) => {
    if (finished) return;

    if (answer === currentQuestion.correct) {
      setScore((current) => current + 10);
      setFeedback("Juist! +10");
    } else {
      setScore((current) => Math.max(0, current - 3));
      setFeedback("Net niet. -3");
    }

    setQuestionIndex((current) => current + 1);
  };

  const restart = () => {
    setTimeLeft(GAME_TIME);
    setScore(0);
    setQuestionIndex(0);
    setFinished(false);
    setFeedback("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionHeader
        eyebrow="Mini-game"
        title="Campus Challenge"
        subtitle="Beantwoord zo veel mogelijk schoolvragen binnen de tijd."
      />

      <View style={styles.scoreRow}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Timer</Text>
          <Text style={styles.scoreValue}>{timeLeft}s</Text>
        </View>
      </View>

      <View style={styles.gameCard}>
        {finished ? (
          <>
            <Text style={styles.finishedTitle}>Tijd voorbij</Text>
            <Text style={styles.question}>Je eindscore is {score}. Probeer boven 50 te geraken.</Text>
          </>
        ) : (
          <>
            <Text style={styles.round}>Vraag {(questionIndex % questions.length) + 1}</Text>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            {currentQuestion.answers.map((answer) => (
              <Pressable key={answer} style={styles.answerButton} onPress={() => answerQuestion(answer)}>
                <Text style={styles.answerText}>{answer}</Text>
              </Pressable>
            ))}
            {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
          </>
        )}
      </View>

      <Pressable style={styles.restartButton} onPress={restart}>
        <Text style={styles.restartText}>Herstart game</Text>
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
  scoreRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  scoreBox: {
    backgroundColor: colors.darkGreen,
    borderRadius: 8,
    flex: 1,
    padding: 16,
  },
  scoreLabel: {
    color: "#d9ead4",
    fontWeight: "800",
  },
  scoreValue: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },
  gameCard: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  round: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginBottom: 10,
  },
  question: {
    color: colors.ink,
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 30,
    marginBottom: 18,
  },
  answerButton: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  answerText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  feedback: {
    color: colors.darkGreen,
    fontWeight: "900",
    marginTop: 8,
  },
  finishedTitle: {
    color: colors.darkGreen,
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
  },
  restartButton: {
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 14,
  },
  restartText: {
    color: colors.ink,
    fontWeight: "900",
  },
});
