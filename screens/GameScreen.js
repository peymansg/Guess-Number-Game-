import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    console.log("rndNum" + rndNum);
    return rndNum;
  }
}

function GameScreen({ userNumber, onGameOver }) {
  let maxBoundries = 100;
  let minBoundries = 1;
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuessNumber, setCurrentGuessNumber] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuessNumber === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuessNumber, userNumber, onGameOver]);

  useEffect(() => {
    minBoundries = 1;
    maxBoundries = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuessNumber < userNumber) ||
      (direction === "greater" && currentGuessNumber > userNumber)
    ) {
      Alert.alert("Don't say Lie", "You know that is wrong ...", [
        { text: "sorry!", style: "cancel" },
      ]);
      return;
    }
    // direction => "lower" , "greater"
    if (direction === "lower") {
      maxBoundries = currentGuessNumber;
    } else {
      minBoundries = currentGuessNumber + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundries,
      maxBoundries,
      currentGuessNumber
    );
    setCurrentGuessNumber(newRndNumber);
    setGuessRounds((prevGuessNumber) => [newRndNumber, ...prevGuessNumber]);
  }
  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer> {currentGuessNumber} </NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          To High or Too Low
        </InstructionText>
        <View style={styles.buttonStyles}>
          <View style={styles.buttonSize}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonSize}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}
export default GameScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  instructionText: {
    marginBottom: 12,
  },

  buttonStyles: {
    flexDirection: "row",
  },
  buttonSize: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
