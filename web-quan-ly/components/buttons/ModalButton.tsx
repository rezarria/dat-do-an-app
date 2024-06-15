"use client"

import { Button } from "antd";
import ModalForm, { type ModalFormRef } from "../ModalForm";
import { useCallback, useRef, forwardRef, type PropsWithChildren, useImperativeHandle, ReactNode, memo } from "react";

export type CreateButtonRef = {
	open: (callback?: () => void) => void
	close: () => void
}

export default memo(forwardRef<CreateButtonRef, PropsWithChildren<{
	title?: string
	icon?: ReactNode
	onOk?: () => void
	onClose?: () => void
	onCancel?: () => void
}>>(function CreateButton(props, ref) {
	const modalRef = useRef<ModalFormRef>(null)
	const clickHandler = useCallback(() => {
		modalRef.current?.open()
	}, [])
	useImperativeHandle(ref, () => ({
		open(c) {
			modalRef.current?.open(c)
		},
		close() {
			modalRef.current?.close()
		}
	}), [])
	return <>
		<Button onClick={clickHandler} icon={props.icon} type="primary">
			{props.title}
		</Button>
		<ModalForm title={props.title} ref={modalRef} onOk={() => {
			props.onOk?.()
		}} onCancel={props.onCancel} onClose={props.onClose}>
			{props.children}
		</ModalForm>
	</>
}))