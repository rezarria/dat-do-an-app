import { memo } from "react";
import { Pressable } from "react-native";
import { Circle, View } from "tamagui";
import { Path, Svg } from "react-native-svg";


export default memo(() => {
	return <View>
		<Pressable>
			<Circle justifyContent="center" alignItems="center" elevate elevationAndroid={3} backgroundColor={"white"} width={42} height={42}>
				<Icon />
			</Circle>
		</Pressable>
	</View>
})


const Icon = () => {
	return <Svg width="20" height="16" viewBox="0 0 20 16" fill="none" >
		<Path fillRule="evenodd" clipRule="evenodd" d="M8.40784 0.925476C8.72514 1.24278 8.72514 1.75722 8.40784 2.07452L3.29486 7.1875H18.6666C19.1154 7.1875 19.4791 7.55127 19.4791 8C19.4791 8.44873 19.1154 8.8125 18.6666 8.8125H3.29486L8.40784 13.9255C8.72514 14.2428 8.72514 14.7572 8.40784 15.0745C8.09054 15.3918 7.57609 15.3918 7.25879 15.0745L0.758789 8.57452C0.441488 8.25722 0.441488 7.74278 0.758789 7.42548L7.25879 0.925476C7.57609 0.608175 8.09054 0.608175 8.40784 0.925476Z" fill="#0D1217" />
	</Svg>

}