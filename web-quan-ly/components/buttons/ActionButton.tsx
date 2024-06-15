import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import { memo } from "react"

export type OnClicks = {
	onDelete?: (id: string) => void
	onEdit?: (id: string) => void
	onView?: (id: string) => void
}

export default memo(function ActionButtons(props: {
	id: string
} & OnClicks) {
	return <Space.Compact>
		<Button onClick={() => {
			props.onEdit?.(props.id)
		}} icon={<EditOutlined />} type="primary">Sửa</Button>
		<Button onClick={() => {
			props.onView?.(props.id)
		}} icon={<EyeOutlined />}>Xem</Button>
		<Button onClick={() => {
			console.debug("ActionButtons", "onDelete", props.onDelete != null, props.id)
			props.onDelete?.(props.id)
		}} icon={<DeleteOutlined />} type="primary" danger>Xóa</Button>
	</Space.Compact>
}
)