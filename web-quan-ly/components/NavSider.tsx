import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { memo, useCallback, useEffect, useState } from "react";
import useSiderMenu from "../store/useSiderMenu";
import { useRouter } from "next/navigation";

export default memo(function NavSider() {
	const open = useSiderMenu(s => s.open)
	return <Sider collapsible collapsed={open}>
		<SiderMenu />
	</Sider>
})

const SiderMenu = memo(function SiderMenu() {
	const [data, chooseItem, item] = useSiderMenu(s => [s.items, s.chooseItem, s.item])
	const [items, setItems] = useState<MenuProps["items"]>()
	useEffect(() => {
		setItems(data.map(i => ({
			key: i.name,
			label: i.title,
			title: i.name,
			icon: i.icon
		})))
	}, [data])

	const router = useRouter()

	const selectHandler = useCallback<NonNullable<MenuProps["onSelect"]>>((v) => {
		chooseItem(v.key)
		router.push("/admin/" + v.key)
	}, [router, chooseItem])
	return <Menu defaultActiveFirst={true} selectedKeys={[item]} onSelect={selectHandler} theme="dark"
		mode="inline" items={items} />
})


