import type { PropsWithChildren } from "react";
import AuthCheck from "../../components/providers/AuthCheck";

export default function Layout(props: PropsWithChildren) {
	return <AuthCheck>
		{props.children}
	</AuthCheck>
}