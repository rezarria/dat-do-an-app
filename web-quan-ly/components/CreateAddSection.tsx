import { Form, type FormProps } from "antd"
import { memo, useCallback, useRef, type PropsWithChildren } from "react"
import { useApi } from "shared"
import type { CreateButtonRef } from "./buttons/ModalButton"
import ModalButton from "./buttons/ModalButton"
import { PlusOutlined } from "@ant-design/icons"

export default function CreateAddSection<T>() {
	return memo(function AddSection(props: PropsWithChildren<{ onAdd?: () => void, url: string, title: string }>) {
		const [form] = Form.useForm<T>()

		const okHandler = useCallback(() => {
			form.submit()
		}, [form])

		const { api } = useApi()

		const buttonRef = useRef<CreateButtonRef>(null)

		const submitHandler = useCallback<NonNullable<FormProps<T>["onFinish"]>>((v) => {
			if (api) {
				api.post(props.url, {
					...v
				}).then(() => {
					form.resetFields()
					buttonRef.current?.close()
					props.onAdd?.()
				})
			}
		}, [api, form, props])

		return <ModalButton icon={<PlusOutlined />} onOk={okHandler} title={props.title}>
			<Form form={form} layout="vertical" onFinish={submitHandler}>
				{props.children}
			</Form>
		</ModalButton>
	}
	)
}