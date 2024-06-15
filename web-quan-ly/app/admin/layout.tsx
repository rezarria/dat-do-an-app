"use client"

import { memo, useCallback, useEffect, useState, type PropsWithChildren } from "react";
import AuthCheck from "../../components/providers/AuthCheck";
import { Button, Layout, theme } from "antd";
import NavSider from "../../components/NavSider";
import { Content, Header } from "antd/es/layout/layout";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import useSiderMenu from "../../store/useSiderMenu";
import { usePathname, useRouter } from "next/navigation";
import { useAXIOS } from "shared";

export default function AdminLayout(props: PropsWithChildren) {
	return <AuthCheck>
		<CustomLayout>
			<Init />
			{props.children}
		</CustomLayout>
	</AuthCheck>
}

const Init = memo(function Init() {
	const chooseItem = useSiderMenu(s => s.chooseItem)
	const firstPath = usePathname()
	useEffect(() => {
		const regex = /\/admin\/(\w+)/;
		const match = firstPath.match(regex);
		const xxxx = match ? match[1] : null;
		if (xxxx) {
			chooseItem(xxxx);
		}
	}, [])
	return <></>
})

const CustomLayout = memo(function CustomLayout(props: PropsWithChildren) {
	const token = theme.useToken()
	return <>
		<Layout className="h-screen">
			<NavSider />
			<Layout>
				<CustomHeader />
				<Content className="mx-[24px] my-[16px] p-[24px] bg-[white]" style={{
					borderRadius: token.token.borderRadiusLG
				}}>
					{props.children}
				</Content>
			</Layout>
		</Layout>
	</>
})

const CustomHeader = memo(function CustomHeader() {
	return <Header style={{
		padding: 0,
		backgroundColor: "white"
	}}>
		<ToggleButton />
		<LogoutButton />
	</Header>
})

const LogoutButton = memo(function LogoutButton() {
	const setJwt = useAXIOS(s => s.setJwtToken)
	const router = useRouter()
	const clickHandler = useCallback(() => {
		localStorage.clear()
		setJwt(undefined)
		router.push('/login')
	}, [router, setJwt])
	return <Button onClick={clickHandler} type="text" icon={<LogoutOutlined />}>Đăng xuất</Button>
})

const ToggleButton = memo(function ToggleButton() {
	const [collapsed, setCollapsed] = useSiderMenu(s => [s.open, s.setOpen])
	return <Button
		type="text"
		icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
		onClick={() => setCollapsed(s => !s)}
		style={{
			fontSize: '16px',
			width: 64,
			height: 64,
		}}
	/>
})
