import { memo } from "react";
import { FlatList } from "react-native";
import { Text, View, XGroup, YGroup, Image } from "tamagui";
import StartIcon from "./icons/StartIcon";
const url = 'https://asset.brandfetch.io/iduGha3_LP/id0Wg-oyAs.jpeg?updated=1716988059438'



export default memo(() => {
	const data = Array.from(Array(12).keys()).map((i) => ({
		id: i,
		name: "test",
		star: 5,
		price: 1000,
		primaryImage: url
	}))
	return <View>
		<YGroup>
			<XGroup>
				<Text fontSize={16} fontWeight={"bold"}>Đồ ăn</Text>
			</XGroup>
			<View>
				<FlatList

					numColumns={2}
					data={data}
					keyExtractor={i => i.id.toString()}


					style={{ marginHorizontal: -24 }}
					columnWrapperStyle={{ width: "100%", gap: 12, padding: 24, paddingVertical: 12 }}

					renderItem={(item) =>
						<View elevationAndroid={3} backgroundColor={"white"} borderRadius={8} overflow="hidden" flex={1} key={item.item.id} >
							<YGroup padding={8} gap={8}>
								<View>
									<View borderRadius={8} overflow="hidden">
										<Image width={"100%"} minHeight={100} src={item.item.primaryImage} />
									</View>
								</View>
								<Text>{item.item.name}</Text>
								<XGroup gap={4} alignItems="center">
									<StartIcon />
									<Text fontSize={12} color={"#0D1217"}>{item.item.star}</Text>
								</XGroup>
								<Text color={"#FF6347"} fontSize={16} fontWeight={"bold"}>{item.item.price}</Text>
							</YGroup>
						</View>} />
			</View>

		</YGroup>
	</View>
})