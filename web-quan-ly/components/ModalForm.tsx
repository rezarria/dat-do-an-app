"use client"

import { type ModalProps } from "antd";
import dynamic from "next/dynamic";
import { forwardRef, useEffect, useImperativeHandle, useState, memo, type PropsWithChildren } from "react";


export type ModalFormRef = {
	open(callback?: () => void): void
	close(): void
}
type ModalFormProps = {
	title?: string
	onOk?: ModalProps["onOk"]
	onCancel?: ModalProps["onCancel"]
	onClose?: ModalProps["onClose"]
}

export default memo(forwardRef<ModalFormRef, PropsWithChildren<ModalFormProps>>(function ModalForm(props, ref) {
	const Modal = dynamic(() => import("antd").then((mod) => mod.Modal), {
		ssr: false
	})

	const [open, setOpen] = useState(false)
	const [callback, setCallback] = useState<(() => void)>()
	useEffect(() => {
		if (open && callback) {
			console.debug("ModalForm", "callback")
			callback()
			setCallback(undefined)
		}
	}, [open, callback])
	useImperativeHandle(ref, () => ({
		open(c) {
			console.debug("ModalForm", "open")
			setCallback(c)
			setOpen(true)
		},
		close() {
			setOpen(false)
		}
	}), [])

	return <Modal forceRender title={props.title} open={open} onOk={(e) => {
		props.onOk?.(e)
	}} onCancel={(e) => {
		setOpen(false)
		props.onCancel?.(e)
	}} onClose={(e) => {
		setOpen(false)
		props.onClose?.(e)
	}}>
		{props.children}
	</Modal>
}))