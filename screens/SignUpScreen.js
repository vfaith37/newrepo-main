import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {SignUpForm} from "../Components/SignupForm";
import LoginScreen from "./LoginScreen";

const { width, height } = Dimensions.get("screen");
const ArrowBack = (
	<Icon
		// onPress={console.warn("no link")}
		name="arrow-left"
		size={30}
		color="#0D13E3"
		style={{ alignSelf: "flex-start", paddingTop: 10, marginLeft: 20 }}
	/>
);
const Bg = () => {
	return (
		<>
		<View
			style={{
				backgroundColor: "#FFF",
				height: width * 2,
				width: width * 2,
				bottom: 300,
				right: -10,
				position: "absolute",
				transform: [{ rotate: "230deg" }],
			}}
		/>
		<View
			style={{
				marginTop: 55,
				height: height / 1.46,
				width: width - 60,
				borderRadius: 17,
				backgroundColor: "#FFFFFF",
				alignSelf: "center",
				position: "absolute",
				// justifyContent: "center",
				borderWidth: 1,
				borderColor: "rgba(73, 137, 242, 0.48)",
			}}
		/>
		</>
	);
};

export const SignUp = () => {
	return (
		<View style={{ flex: 1, backgroundColor: "#0D13E3", paddingTop: 55 }}>
			<Bg />
			
			{/* {ArrowBack} */}
			{/* <SignInForm /> */}
			{/* <LoginScreen /> */}
			<SignUpForm />
			{/* </View> */}
			<StatusBar hidden />
		</View>
	);
};
const styles = StyleSheet.create({});
