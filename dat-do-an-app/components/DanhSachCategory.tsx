import { memo } from "react";
import { FlatList } from "react-native";
import { Image, View, YGroup, Text } from "tamagui";

const url = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Farchive.org%2Fdownload%2Fnhentai-logo-3%2Fnhentai-logo-3.jpg&tbnid=rdy09JtJSBXLdM&vet=12ahUKEwiu__3j_92GAxVzc_UHHVJWBMoQMygAegQIARAl..i&imgrefurl=https%3A%2F%2Farchive.org%2Fdetails%2Fnhentai-logo-3&docid=1i8RcEm6lMYbIM&w=512&h=512&q=nhentai%20logo&hl=en-US&client=firefox-b-d&ved=2ahUKEwiu__3j_92GAxVzc_UHHVJWBMoQMygAegQIARAl'

export default memo(() => {
	return <FlatList
		data={Array.from(Array(10).keys()).map((i) => ({
			id: i,
			name: '1',
			icon: url
		}))}
		numColumns={4}
		keyExtractor={(item) => item.id?.toString()}
		renderItem={(item) => <View key={item.item.id}>
			<YGroup>
				<Text>{item.item.name}</Text>
				<Image src={item.item.icon} />
			</YGroup>
		</View>} />
})