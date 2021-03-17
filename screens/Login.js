import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import useAuth from "../hooks/auth";
import useApi from "../hooks/api";

import ActivityIndicator from "../components/ActivityIndicator";
import ErrorMessage from "../components/ErrorMessage";
import { PhoneInput, PasswordInput } from "../components/Inputs";
import { Button, BackButton } from "../components/Button";

import styles from "../styles";

export default Login = ({ navigation }) => {
  const [phone, setPhone] = useState("");

  const { api, loading, error } = useApi();
  const auth = useAuth();

  // Возможно, вынести этот код в хук
  let submitLogin = async () => {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (!permission.granted) return;

    const pushToken = await Notifications.getExpoPushTokenAsync().catch((error) => console.log("Ошибка при получении Push-токена:", error));
    const response = await api.users.auth({ phone, pushToken: pushToken.data });
    auth.setData({ phone });

    if (!response.error) navigation.navigate("CodeEntry");
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <SafeAreaView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={wrapper}>
            <View>
              <BackButton onPress={() => navigation.goBack()} />
              <Text style={styles.title}>Вход</Text>
              <Text style={styles.subtitle}>Введите свой телефон, чтобы начать пользоваться приложением.</Text>
              <PhoneInput style={input} state={[phone, setPhone]} />
              <ErrorMessage error={error} />
            </View>
            <View>
              <Button style={button} title="Далее" onPress={submitLogin} />
              <Text style={styles.agreement}>Нажимая на эту кнопку, я на всё подписываюсь и соглашаюсь со всем, с чем только можно.</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

const wrapper = { ...styles.wrapper, justifyContent: "space-between" };
const input = { marginBottom: 10 };
const button = { marginBottom: 10 };
