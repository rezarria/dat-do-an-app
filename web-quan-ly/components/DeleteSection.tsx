"use client"

import { WarningOutlined } from "@ant-design/icons";
import { Modal, Typography } from "antd";
import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import useDelete from "../actions/useDelete";

export type DeleteSectionRef = {
	setId(id: string): void
	open(): void
}
export type DeleteSectionProps = {
	url: string
	onDelete?: (id: string) => void
}

export default
	forwardRef<DeleteSectionRef, DeleteSectionProps>(
		function DeleteSection(props, ref) {
			const [id, setId] = useState<string>()
			const deleteAction = useDelete(props.url)
			const okHandler = useCallback(() => {
				setOpen(false)
				if (id)
					deleteAction(id).then(() => {
						props.onDelete?.(id)
					})
			}, [deleteAction, id, props])
			const cancelHandler = useCallback(() => {
				setOpen(false)
			}, [])
			const [open, setOpen] = useState(false)

			useImperativeHandle(ref, () => ({
				open() {
					console.debug("DeleteSection", "open")
					setOpen(true)
				},
				setId(id: string) {
					setId(id)
				}
			}), [])

			return <Modal open={open} title={
				<><WarningOutlined /> Xác nhận xóa</>
			} onOk={okHandler} onClose={cancelHandler} onCancel={cancelHandler}>
				<Typography>
					<Typography.Text>
						Bạn có chắc chắn muốn xóa?
					</Typography.Text>
				</Typography>
			</Modal>
		}
	)