import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import styles from "../styles";

export let BackButton = ({ style, ...props }) => (
  <TouchableOpacity style={[styles.back, style]} activeOpacity={0.8} {...props}>
    <AntDesign name="arrowleft" size={30} color="dodgerblue" />
  </TouchableOpacity>
);

export let Button = ({ style, title, ...props }) => {
  let color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  let textStyle = color ? { color } : { color: "white" };

  return (
    <TouchableOpacity style={[styles.button, style]} activeOpacity={0.8} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export let SimpleButton = ({ style, title, ...props }) => {
  let color = Array.isArray(style) ? style.reduce((_, style) => style?.color || _, undefined) : style?.color;
  let textStyle = color ? { color } : { color: "dodgerblue" };
  return (
    <TouchableOpacity style={[styles.button, styles.simpleButton, style]} activeOpacity={0.8} {...props}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
