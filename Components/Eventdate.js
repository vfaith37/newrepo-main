// import React, { useState } from "react";
// import { Formik } from "formik";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { TouchableOpacity, Text, Button, View, StyleSheet } from "react-native";
// import "intl";
// import "intl/locale-data/jsonp/en-GB";
// import { Calendar, Calendars, Time } from "../constants/icons";
// const Eventdate = () => {
// 	const [mode, setMode] = useState();
// 	const [time, setTime] = useState();
// 	// const [dateshow, setDateShow] = useState(false);
// 	const [show, setShow] = useState(false);
// 	// const Fdate = new Intl.DateTimeFormat("en-GB").format(date);
// 	return (
// 		{/*<Formik
// 			initialValues={{ date: new Date(), time: new Date() }}
// 			onSubmit={(values) => console.log(values)}
// 		>
// 			{({ handleSubmit, values, setFieldValue, handleChange }) => (
// 				<>
// 					{/* {dateshow && (
// 						<DateTimePicker
// 							value={values.date}
// 							mode="date"
// 							display="default"
// 							// onConfirm={handleChange("date")}
// 							// onCancel={() => setDateShow(false)}
// 							onChange={[setFieldValue("date")]}
// 						/> */}
// 					)} */}

// 					{show && (
// 						<DateTimePicker
// 							value={values.time}
// 							mode={mode}
// 							is24Hour={true}
// 							display="default"
// 							onChange={(event, selectedTime) => {
// 								setShow(false);
// 								// setTime(values.time)
// 								setTime(selectedTime || time);
// 								setFieldValue("time", values.time);
// 							}}
// 						/>
// 					)}
// 					<View style={styles.Container}>
// 						<View
// 							style={[
// 								styles.dateContainer,
// 								{ justifyContent: "space-around", flexDirection: "row" },
// 							]}
// 						>
// 							<Text style={[styles.textContainer, { marginTop: 10 }]}>
// 								{new Intl.DateTimeFormat("en-GB").format(values.date)}
// 							</Text>
// 							<TouchableOpacity
// 								onPress={() => {
// 									setShow(true), setMode("date");
// 								}}
// 							>
// 								{Calendars}
// 							</TouchableOpacity>
// 						</View>
// 						<View
// 							style={[
// 								styles.dateContainer,
// 								{ justifyContent: "space-around", flexDirection: "row" },
// 							]}
// 						>
// 							<Text style={[styles.textContainer, { marginTop: 10 }]}>
// 								{values.time.toLocaleTimeString()}
// 							</Text>
// 							<TouchableOpacity
// 								onPress={() => {
// 									setShow(true), setMode("time");
// 								}}
// 							>
// 								{Time}
// 							</TouchableOpacity>
// 						</View>
// 					</View>
// 					<Button title="Submit" onPress={handleSubmit} />
// 				</>
// 			)}
// 		</Formik>
// 	);
// };
// const styles = StyleSheet.create({
// 	Container: {
// 		flexDirection: "row",
// 		justifyContent: "space-between",
// 		marginTop: 10,
// 		marginBottom: 10,
// 	},
// 	dateContainer: {
// 		width: 155,
// 		height: 45,
// 		borderRadius: 6,
// 		borderStyle: "solid",
// 		borderWidth: 1.2,
// 		justifyContent: "center",
// 		borderStyle: "solid",
// 		borderColor: "rgba(217, 217, 217, 1)",
// 	},
// 	textContainer: {
// 		fontSize: 16,
// 		fontWeight: "500",
// 		textAlign: "center",
// 		color: "black",
// 	},
// });
// export default Eventdate;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import "intl";
import "intl/locale-data/jsonp/en-GB";
import { Calendar, Calendars, Time } from "../constants/icons";

const Eventdate = () => {
	const [mode, setMode] = useState("date");
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setDate(currentDate);
		setShow(false);
	};

	return (
        // <Formik
		// 	initialValues={{ date: new Date(), time: new Date() }}
		// 	onSubmit={(values) => console.log(values)}
		// >
		// 	{({ handleSubmit, values, setFieldValue, handleChange }) => (
		// 		<>
		// 			{dateshow && (
		// 				<DateTimePicker
		// 					value={values.date}
		// 					mode="date"
		// 					display="default"
		// 					onConfirm={handleChange("date")}
		// 					onCancel={() => setDateShow(false)}
		// 					onChange={[setFieldValue("date")]}						/>
		<View>
			{show && (
				<DateTimePicker
					value={date}
					mode={mode}
					is24Hour={false}
					display="default"
					onChange={onChange}
				/>
			)}
			<View style={styles.Container}>
				<View
					style={[
						styles.dateContainer,
						{ justifyContent: "space-around", flexDirection: "row" },
					]}
				>
					<Text style={[styles.textContainer, { marginTop: 10 }]}>
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
						{ justifyContent: "space-around", flexDirection: "row" },
					]}
				>
					<Text style={[styles.textContainer, { marginTop: 10 }]}>
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
	);
};
const styles = StyleSheet.create({
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
export default Eventdate;
