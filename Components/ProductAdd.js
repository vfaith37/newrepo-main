import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	Image,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { FormInput } from "./FormInput";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import "intl";
import "intl/locale-data/jsonp/en-GB";
import { Calendar, Calendars, Time, Back } from "../constants/icons";
const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object({
	title: Yup.string().required("Title is required!"),
	content: Yup.string().required("Content is required!"),
	images: Yup.array()
		.min(1, "Please select at least one image")
		.max(5, "You can only select a maximum of 5 images"),
});

export const Form = ({ component }) => {
	const navigation = useNavigation();
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const { width, height } = useWindowDimensions();

	const pickImage = async (setFieldValue) => {
		try {
			const permissionResult =
				await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (permissionResult.granted === false) {
				alert("Permission to access camera roll is required!");
				return;
			}
			setIsLoading(true);

			const pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsMultipleSelection: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				selectionLimit: 5, //for IOS 14+
			});

			if (!pickerResult.canceled) {
				const uris = pickerResult.assets.map((asset, index) => ({
					uri: asset.uri,
					id: index,
				}));
				setFieldValue("images", uris);
				setImages((prevImages) => [...prevImages, ...uris]);
			}
			setIsLoading(false);
			console.log(pickerResult.assets);
		} catch (e) {
			console.log(`${e}`);
		}
	}; 
	const [mode, setMode] = useState("date");
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	return (
		// add status bar with the color
		<View style={{ alignSelf: "center", width: width - 40, paddingTop: 55 }}>
			<View style={{ flexDirection: "row", paddingBottom: 15 }}>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.goBack()}
				>
					<Back color={"#707070"} size={30} />
				</TouchableOpacity>
				<Text
					style={{
						fontFamily: "Poppins3",
						alignItems: "center",
						fontSize: 28,
						position: "absolute",
						left: 100,
					}}
				>
					New {component}
				</Text>
			</View>

			<KeyboardAvoidingView
				enabled
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View>
					<Formik
						initialValues={{
							content: "",
							title: "",
							images: [],
							campus: "",
							date: "",
							time: "",
						}}
						onSubmit={(values) => {
							console.log(values);
						}}
						validationSchema={validationSchema}
					>
						{({
							values,
							errors,
							touched,
							isSubmitting,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
						}) => {
							const { title, images, content, campus } = values;
							return (
								<View style={{ position: "absolute", top: -35 }}>
									<FormInput
										onChangeText={handleChange("title")}
										onBlur={handleBlur("title")}
										error={touched.title && errors.title}
										value={title}
										placeholder="Title"
										TextInputStyle={styles.input}
									/>
									<View style={{ top: 10 }}>
										<Text
											style={{
												fontFamily: "Poppins3",
												fontWeight: "500",
												fontSize: 22,
											}}
										>
											Image
										</Text>
										<Text
											style={{
												fontWeight: "300",
												fontSize: 11,
												fontFamily: "Poppins",
												width: 0.9 * width,
											}}
										>
											You can only add a maximum of five images per post
										</Text>
									</View>
									<View
										style={{
											width: width - 40,
											height: height / 3.8,
											borderColor: "#d9d9d9",
											borderStyle: "dashed",
											borderWidth: 2.5,
											marginTop: 19,
											borderRadius: 3.5,
											borderRadius: 20,
										}}
									>
										<View style={{ padding: 10, flexDirection: "row" }}>
											<Text
												style={{
													fontSize: 16,
													padding: 5,
													fontFamily: "Poppins",
													color: "#000",
												}}
											>
												Upload Here now
											</Text>
											{isLoading ? (
												<View>
													<ActivityIndicator size="large" color="#0000ff" />
												</View>
											) : (
												<Pressable onPress={() => pickImage(setFieldValue)}>
													<View
														style={{
															height: 30,
															width: 30,
															backgroundColor: "#004fc7",
															borderRadius: 25,
															alignSelf: "center",
															marginLeft: width - 200,
														}}
													>
														<Text
															style={{
																fontSize: 30,
																fontWeight: "300",
																color: "black",
																justifyContent: "center",
																alignItems: "center",
																fontFamily: "Poppins",
																position: "absolute",
																left: 5,
																top: -4,
																color: "#fff",
															}}
														>
															+
														</Text>
													</View>
												</Pressable>
											)}
										</View>
										{errors.images && touched.images && (
											<Text
												style={{
													color: "red",
													fontFamily: "Poppins",
													fontSize: 10,
													top: -13,
													alignSelf: "center",
												}}
											>
												{errors.images}
											</Text>
										)}
										<FlatList
											data={images.slice(0, 5)}
											horizontal
											renderItem={({ item }) => (
												<View style={{ width: 120, height: 130 }}>
													<Image
														source={{ uri: item.uri }}
														style={{
															width: 103,
															height: 110,
															left: 7,
															marginHorizontal: 4,
															borderRadius: 6,
															resizeMode: "contain",
														}}
													/>
												</View>
											)}
											keyExtractor={(item) => item.uri}
											contentContainerStyle={{}}
										/>
									</View>
									{component === "Event" ? (
										<View>
											{show && (
												<DateTimePicker
													value={date}
													mode={mode}
													is24Hour={false}
													display="default"
													onChange={(event, selectedDate) => {
														const currentDate = selectedDate || date;
														setDate(currentDate);
														setShow(false);
														setFieldValue(
															"date",
															new Intl.DateTimeFormat("en-GB").format(date)
														);
														setFieldValue("time", date.toLocaleTimeString());
													}}
												/>
											)}
											<View style={styles.Container}>
												<View
													style={[
														styles.dateContainer,
														{
															justifyContent: "space-around",
															flexDirection: "row",
														},
													]}
												>
													<Text
														style={[styles.textContainer, { marginTop: 10 }]}
													>
														{new Intl.DateTimeFormat("en-GB").format(date)}
													</Text>
													<TouchableOpacity
														onPress={() => {
															setMode("date"), setShow(true);
														}}
													>
														{Calendars}
													</TouchableOpacity>
												</View>
												<View
													style={[
														styles.dateContainer,
														{
															justifyContent: "space-around",
															flexDirection: "row",
														},
													]}
												>
													<Text
														style={[styles.textContainer, { marginTop: 10 }]}
													>
														{date.toLocaleTimeString()}
													</Text>
													<TouchableOpacity
														onPress={() => {
															setMode("time"), setShow(true);
														}}
													>
														{Time}
													</TouchableOpacity>
												</View>
											</View>
										</View>
									) : null}
									<Text
										style={{
											fontSize: 22,
											marginTop: 5,
											fontFamily: "Poppins3",
										}}
									>
										Content
									</Text>
									{/* {errors.content && touched.content && 
		<Text style={{ color: 'red', fontFamily:"Poppins", fontSize:10, top:-13, alignSelf:"center" }}>
			{errors.content}
			</Text>
			} */}
									<TextInput
										multiline
										style={styles.TextInput2}
										placeholder="Type Something here..."
										onChangeText={handleChange("content")}
										onBlur={handleBlur("content")}
										error={touched.content && errors.content}
										value={content}
									/>
									<TouchableOpacity onPress={handleSubmit}>
										<View
											style={{
												backgroundColor: "#004fc7",
												width: 113,
												justifyContent: "center",
												alignSelf: "center",
												alignItems: "center",
												borderRadius: 8,
												marginTop: 13,
												height: 37,
											}}
										>
											<Text
												style={{
													fontSize: 18,
													fontWeight: "500",
													color: "white",
													fontFamily: "Poppins3",
												}}
											>
												Post
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							);
						}}
					</Formik>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 43,
		backgroundColor: "#d9d9d9",
		borderRadius: 5,
		marginTop: 10,
		paddingLeft: 10,
		fontSize: 16,
		textAlign: "left",
		fontFamily: "Poppins",
	},
	checkbox: {
		alignSelf: "center",
		width: 20,
		height: 20,
	},
	label: {
		fontSize: 16,
	},
	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 20,
		paddingTop: 15,
		justifyContent: "space-between",
	},
	TextInput2: {
		borderWidth: 2,
		borderColor: "#d9d9d9",
		width: width - 40,
		height: height / 4.5,
		paddingBottom: 100,
		marginTop: 5,
		borderRadius: 20,
		fontFamily: "Poppins",
		fontSize: 13,
		textAlign: "left",
		paddingLeft: 11,
		// height:180
	},
	Container: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		// marginBottom: 5,
	},
	dateContainer: {
		width: 155,
		height: 45,
		borderRadius: 6,
		borderStyle: "solid",
		borderWidth: 1.2,
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "rgba(217, 217, 217, 1)",
	},
	textContainer: {
		fontSize: 16,
		fontWeight: "500",
		textAlign: "center",
		color: "black",
	},
});
