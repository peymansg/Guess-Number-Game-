import { TextInput, View, StyleSheet, Alert, Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen({ pickedNumber }) {
  const [getTextInput, setGetTextInput] = useState("");

  function textInputHandler(textInput) {
    setGetTextInput(textInput);
  }

  function validateNumbers() {
    const chosenNumber = parseInt(getTextInput);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Ok", style: "destructive", onPress: resetButton }]
      );

      return;
    }
    pickedNumber(chosenNumber);
  }

  function resetButton() {
    setGetTextInput("");
  }

  return (
    <View style={styles.rootContainer}>
      <Title> Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={getTextInput}
          onChangeText={textInputHandler}
        />
        <View style={styles.button}>
          <View style={styles.buttonSize}>
            <PrimaryButton onPress={resetButton}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonSize}>
            <PrimaryButton onPress={validateNumbers}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}
export default StartGameScreen;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    padding: 20,
    alignItems: "center",
  },

  button: {
    flexDirection: "row",
  },
  buttonSize: {
    flex: 1,
  },
  numberInput: {
    marginTop: 40,
    height: 55,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
});
