import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as KakaoLogin from "@react-native-seoul/kakao-login";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [responseData, setResponseData] = useState(null);

  //구글 로그인 설정
  GoogleSignin.configure({
    webClientId: `${process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT}`,
    offlineAccess: true,
  });

  const [auth, setAuth] = useState(false);

  //구글 로그인 버튼 클릭시 수행
  const onGoogleButtonPress = async () => {
    try {
      //구글 아이디 선택창으로 넘어가서 선택하면 accessToken, refreshToken을 받아오게됨
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_GOOGLE_LOGIN_URL}`,
        {
          userInfo: userInfo,
        }
      );
      setResponseData(response.data);
      setAuth(true);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("play services not available");
      } else {
        console.log(error);
      }
    }
  };

  const onKakaoButtonPress = async () => {
    try {
      const Login = await KakaoLogin.login().then((result) => {
        KakaoLogin.getProfile().then((result1) => {
          console.log(result1);
        });
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DarkTheme}>
      {auth ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })}>
          <View style={styles.contianer}>
            <Text style={[styles.txt, { fontSize: 30 }]}>LIKE U</Text>
            <TouchableOpacity
              style={[
                styles.login_btn,
                { backgroundColor: "yellow", flexDirection: "row" },
              ]}
              onPress={() => {
                onKakaoButtonPress();
              }}
            >
              <Text style={{ fontSize: 20, color: "#000000", fontWeight: 600 }}>
                K
              </Text>
              <Text style={{ fontSize: 20, color: "#000000", fontWeight: 600 }}>
                A
              </Text>
              <Text style={{ fontSize: 20, color: "#000000", fontWeight: 600 }}>
                K
              </Text>
              <Text style={{ fontSize: 20, color: "#000000", fontWeight: 600 }}>
                A
              </Text>
              <Text style={{ fontSize: 20, color: "#000000", fontWeight: 600 }}>
                O
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.login_btn,
                { backgroundColor: "white", flexDirection: "row" },
              ]}
              onPress={() => {
                onGoogleButtonPress();
              }}
            >
              <Text style={{ fontSize: 20, color: "#4285F4", fontWeight: 600 }}>
                G
              </Text>
              <Text style={{ fontSize: 20, color: "#DB4437", fontWeight: 600 }}>
                o
              </Text>
              <Text style={{ fontSize: 20, color: "#F4B400", fontWeight: 600 }}>
                o
              </Text>
              <Text style={{ fontSize: 20, color: "#4285F4", fontWeight: 600 }}>
                g
              </Text>
              <Text style={{ fontSize: 20, color: "#0F9D58", fontWeight: 600 }}>
                l
              </Text>
              <Text style={{ fontSize: 20, color: "#DB4437", fontWeight: 600 }}>
                e
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  txt: {
    color: "white",
    fontSize: 20,
  },

  login_btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F88600",
    width: 280,
    height: 40,
    margin: 10,
    borderRadius: 10,
  },

  input_txt: {
    width: 200,
    height: 50,
    color: "white",
    margin: 10,
    fontSize: 17,
  },

  input_view: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "white",
    borderRadius: 10,
    margin: 10,
  },
});
