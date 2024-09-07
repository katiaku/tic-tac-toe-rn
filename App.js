import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Snackbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [isCheck, setIsCheck] = useState(false);
  const [gameWinner, setGameWinner] = useState("");
  const [gameState, setGameState] = useState(new Array(9).fill("empty", 0, 9));
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const reloadGame = () => {
    setIsCheck(false);
    setGameWinner("");
    setGameState(new Array(9).fill("empty", 0, 9));
  };

  const checkIsWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== "empty"
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== "empty" &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== "empty" &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== "empty" &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== "empty" &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== "empty" &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== "empty" &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== "empty" &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes("empty", 0)) {
      setGameWinner("Draw game... ⌛️");
    }
  };

  const onChangeItem = (itemNumber) => {
    if (gameWinner) {
      setSnackMessage(gameWinner);
      setSnackVisible(true);
      return;
    }

    if (gameState[itemNumber] === "empty") {
      gameState[itemNumber] = isCheck ? "check" : "smile";
      setIsCheck(!isCheck);
    } else {
      setSnackMessage("Position is already filled");
      setSnackVisible(true);
    }

    checkIsWinner();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>Check - Smile - Toe</Text>

        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCheck ? styles.playerX : styles.playerO,
            ]}
          >
            <Text style={styles.gameTurnTxt}>
              Player {isCheck ? "Check" : "Smile"}'s Turn
            </Text>
          </View>
        )}
        {/* Game Grid */}
        <FlatList
          numColumns={3}
          data={gameState}
          style={styles.grid}
          renderItem={({ item, index }) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}
            >
              {item === "empty" ? (
                <Entypo name="pencil" size={24} color="#eee" />
              ) : item === "check" ? (
                <AntDesign name="circledown" size={24} color="#38c" />
              ) : (
                <AntDesign name="smile-circle" size={24} color="#f7c" />
              )}
            </Pressable>
          )}
        />
        {/* Game Action */}
        <Pressable style={styles.gameBtn} onPress={reloadGame}>
          <Text style={styles.gameBtnText}>
            {gameWinner ? "Start New Game" : "Reload the Game"}
          </Text>
        </Pressable>

        <Snackbar
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
          action={{
            label: "OK",
            onPress: () => {
              setSnackVisible(false);
            },
          }}
        >
          {snackMessage}
        </Snackbar>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 16,
  },

  playerInfo: {
    height: 56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginTop: 12,
    marginBottom: 25,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },

  gameTurnTxt: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    paddingHorizontal: 20,
  },

  playerX: {
    backgroundColor: "#38c",
  },

  playerO: {
    backgroundColor: "#f7c",
  },

  grid: {
    margin: 12,
  },

  card: {
    height: 100,
    width: "33.33%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333",
  },

  winnerInfo: {
    borderRadius: 8,
    backgroundColor: "#38cc77",
    shadowOpacity: 0.1,
    marginBottom: 25,
    padding: 14,
  },

  winnerTxt: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },

  gameBtn: {
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#8d3daf",
  },

  gameBtnText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
});
