import { memo } from "react"
import { YGroup, Text } from "tamagui"

export default () => {
	return <Screen />
}

const Screen = memo(() => {
	return <YGroup>
		<Text >home</Text>
	</YGroup>
})