"use client"

import { LoginOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Layout, Modal, Space } from "antd"
import { useForm, type FormProps } from "antd/es/form/Form"
import { Content } from "antd/es/layout/layout"
import { forwardRef, memo, useCallback, useImperativeHandle as useImperativeHandler, useRef, useState } from "react"
import type { RegisterForm } from "./../../models"
import useFormInstance from "antd/es/form/hooks/useFormInstance"
import useApi from "../../hooks/useApi"
import useAXIOS from "../../store/useAXIOS"

export default function LoginPage() {

	const setJWT = useAXIOS(s => s.setJwtToken)
	const { api } = useApi()

	const submitHandler = useCallback<NonNullable<FormProps["onFinish"]>>(() => {
		if (api) {
			api.post<{ acess_token: string }>("/api/v1/auth/login").then(res => {
				console.debug("LoginPage", "login")
				localStorage.setItem("access_token", res.data.acess_token)
				setJWT(res.data.acess_token)
			})
		}
	}, [api, setJWT])
	return <Layout>
		<Content className="w-screen h-screen bg-[white] flex justify-center items-center">
			<Card className="w-fit min-w-[400px]">
				<Form onFinish={submitHandler} labelCol={{ span: 5 }} colon={false}>
					<Form.Item label="Tài khoản">
						<Input />
					</Form.Item>
					<Form.Item label="Mật khẩu">
						<Input.Password />
					</Form.Item>
					<Form.Item label=" ">
						<Space wrap>
							<LoginButton />
							<RegisterButton />
						</Space>
					</Form.Item>
				</Form>
			</Card>
		</Content>
	</Layout>
}

const LoginButton = memo(function LoginButton() {
	const form = useFormInstance()
	const clickHandler = useCallback(() => {
		form.submit()
	}, [form])
	return <Button onClick={clickHandler} type="primary" icon={<LoginOutlined />}>
		Đăng nhập
	</Button>
})

function RegisterButton() {
	const formRef = useRef<RegisterFromRef>(null)
	const clickHandler = useCallback(() => {
		formRef.current?.open()
	}, [])
	return <>
		<Button onClick={clickHandler}>
			Đăng ký
		</Button>
		<RegisterForm ref={formRef} />
	</>
}

type RegisterFromRef = {
	open(): void
	close(): void
	toggle(): void
}


const RegisterForm = memo(forwardRef<RegisterFromRef>((_props, ref) => {

	const [open, setOpen] = useState(false)

	const [form] = useForm<RegisterForm>()

	const { api } = useApi()

	const submitHandler = useCallback<NonNullable<FormProps<RegisterForm>["onFinish"]>>((v) => {
		if (api) {
			api.post("/api/v1/auth/register", {
				username: v.username,
				password: v.password,
				name: v.name
			}).then(() => {
				setOpen(false)
				form.resetFields()
			})
		}
	}, [api, form])

	const closeHandler = useCallback(() => {
		setOpen(false)
	}, [])

	const okHandler = useCallback(() => {
		form.submit()
	}, [form])

	useImperativeHandler(ref, () => ({
		open() {
			setOpen(true)
		},
		close() {
			setOpen(false)
		},
		toggle() {
			setOpen(s => !s)
		}
	}), [])

	return <Modal onOk={okHandler} onCancel={closeHandler} open={open} title="Đăng ký">
		<Form<RegisterForm> onFinish={submitHandler} form={form} labelCol={{ span: 7 }} colon={false}>
			<Form.Item<RegisterForm> label="Tài khoản" name="username" required rules={[
				{
					required: true,
					message: "Tài khoản không được để trống"
				}
			]}>
				<Input />
			</Form.Item>
			<Form.Item<RegisterForm> label="Mật khẩu" name="password" required rules={[{
				required: true,
				message: "Mật khẩu không được để trống"
			}]}>
				<Input.Password />
			</Form.Item>
			<Form.Item<RegisterForm> label="Nhập lại mật khẩu" name="password2" dependencies={["password"]} rules={[
				{
					required: true,
					async validator(_rule, value) {
						if (value !== form.getFieldValue("password")) {
							throw "Mật khẩu không khớp"
						} else {
							return
						}
					},
				}
			]}>
				<Input.Password />
			</Form.Item>
			<Form.Item<RegisterForm> label="Tên người dùng" name="name" required rules={[{
				required: true,
				message: "Tên người dùng không được để trống"
			}]}>
				<Input />
			</Form.Item>
		</Form>
	</Modal>
}))
