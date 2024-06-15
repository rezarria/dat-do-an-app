import { memo } from "react";
import { FlatList } from "react-native";
import { Image, View, YGroup, Text } from "tamagui";

const url = 'https://asset.brandfetch.io/iduGha3_LP/id0Wg-oyAs.jpeg?updated=1716988059438'

export default memo(() => {
	return <View paddingBlock={12}>
		<FlatList
			data={Array.from(Array(12).keys()).map((i) => ({
				id: i,
				name: 'item ' + i,
				icon: url
			}))}
			numColumns={4}
			style={{ margin: -24 }}
			columnWrapperStyle={{ width: "100%", gap: 12, padding: 24, paddingVertical: 12 }}
			keyExtractor={(item) => item.id?.toString()}
			renderItem={(item) => <View elevationAndroid={3} backgroundColor={"white"} borderRadius={8} overflow="hidden" flex={1} key={item.item.id}>
				<YGroup alignItems="center" padding={8} gap={8}>
					<View><Image width={24} height={24} src={item.item.icon} /></View>
					<Text fontSize={12} fontWeight={"bold"}>{item.item.name}</Text>
				</YGroup>
			</View>} />
	</View>
})