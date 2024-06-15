import type { PropsWithChildren } from "react"
import { TamaguiProvider } from "tamagui"
import { tamaguiConfig } from './../../tamagui.config'
import { useColorScheme } from "react-native"
export default (props: PropsWithChildren) => {
	const colorScheme = useColorScheme()
	return <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
		{props.children}
	</TamaguiProvider>
}