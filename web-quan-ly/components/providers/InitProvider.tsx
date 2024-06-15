"use client"

import { memo, useEffect, type PropsWithChildren } from "react";
import useSiderMenu from "../../store/useSiderMenu";
import { CodeOutlined, PaperClipOutlined, UserOutlined } from "@ant-design/icons";

export default function InitProvider(props: PropsWithChildren) {
	return <>
		<Init />
		{props.children}
	</>
}

const Init = memo(function Init() {
	const setItem = useSiderMenu(s => s.setItem)
	useEffect(() => {
		setItem([
			{
				name: "category", title: "Thể loại", icon: <CodeOutlined />
			},
			{
				name: "food", title: "Đồ ăn", icon: <CodeOutlined />
			},
			{
				name: "user", title: "Người dùng", icon: <UserOutlined />
			},
			{
				name: "order", title: "Đơn hàng", icon: <PaperClipOutlined />
			}
		])
	}, [setItem])
	return <></>
})
