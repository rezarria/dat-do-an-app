import { Form, type FormProps } from "antd"
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState, type PropsWithChildren, type ReactNode } from "react"
import { createPatch, useApi } from "shared"
import type { CreateButtonRef } from "./buttons/ModalButton"
import ModalButton from "./buttons/ModalButton"
import { EditOutlined } from "@ant-design/icons"

export type EditSectionRef = {
	open(id: string): void
}

type EditSectionProps<T> = { onDone?: () => void, urlGet: string, urlPatch: string, title: string, map(v: T): any }

export default function CreateEditSection<T>(children: ReactNode) {
	return memo(
		forwardRef<EditSectionRef, EditSectionProps<T>>(
			function EditSection(props, ref) {

				const [_render, setRender] = useState(true)

				const [id, setId] = useState<string>()

				const [form] = Form.useForm()
				const okHandler = useCallback(() => {
					form.submit()
				}, [form])

				const { api } = useApi()

				const buttonRef = useRef<CreateButtonRef>(null)

				const submitHandler = useCallback<NonNullable<FormProps<T>["onFinish"]>>((v) => {
					if (api) {
						const data = createPatch(oldData.current, v)
						api.patch(`${props.urlPatch}/${id}`, data).then(() => {
							form.resetFields()
							buttonRef.current?.close()
							props.onDone?.()
						})
					}
				}, [api, form, id, props])

				const oldData = useRef({})

				const fetcher = useCallback(async (id: string) => {
					if (id && api) {
						form.resetFields()
						await api.get<T>(`${props.urlGet}/${id}`).then(res => {
							oldData.current = props.map(res.data)
							form.setFieldsValue(JSON.parse(JSON.stringify(oldData.current)))
						})
					}
				}, [api, form, props])

				useImperativeHandle(ref, () => ({
					open(id) {
						console.debug("EditSection", "open")
						buttonRef.current?.open(() => {
							console.debug("EditSection", "fetch")
							setId(id)
							fetcher(id).then(() => {
								setRender(s => !s)
							})
						})
					},
				}), [fetcher])


				return <ModalButton ref={buttonRef} icon={<EditOutlined />} onOk={okHandler} title={props.title}>
					<Form form={form} layout="vertical" onFinish={submitHandler}>
						{children}
					</Form>
				</ModalButton>
			}
		)
	)
}