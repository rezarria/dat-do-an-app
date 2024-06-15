"use client"

import { Flex, Form, Input, InputNumber, Space } from "antd";
import FoodTable, { type CategoryTableRef } from "../../../components/tables/CategortTable";
import { forwardRef, memo, useCallback, useRef } from "react";
import type { Category } from "shared/models";
import UploadImage from "../../../components/inputs/UploadImage";
import DeleteSection, { DeleteSectionRef } from "../../../components/DeleteSection";
import CreateAddSection from "../../../components/CreateAddSection";
import CreateEditSection, { EditSectionRef } from "../../../components/CreateEditSection";

const CustomSection = CreateAddSection<Category>()
const CustomEditSection = CreateEditSection<Category>(<>
	<Form.Item<Category> label="Tên món ăn" name="name" rules={[{
		required: true,
		message: "Tên món ăn không được để trống"
	}]}  >
		<Input />
	</Form.Item>
	<Form.Item<Category> label="Mô tả" name="description" >
		<Input.TextArea />
	</Form.Item>
	<Form.Item<Category> label="Ảnh" name="icon">
		<UploadImage />
	</Form.Item>
</>)

const EditSection = memo(
	forwardRef<EditSectionRef, { onDone?: () => void }>(
		function EditSection(props, ref) {
			return <CustomEditSection title="Sửa thể loại" urlGet="/api/v1/category/detail" urlPatch="/api/v1/category"
				ref={ref}
				onDone={props.onDone}
				map={(v) => ({
					name: v.name,
					description: v.description,
					icon: v.icon
				})} />

		}
	)
)

const AddSection = memo(function AddSection(props: { onAddHandler: () => void }) {
	return <CustomSection title="Thêm thể loại" url="/api/v1/category" onAdd={props.onAddHandler}>
		<Form.Item<Category> label="Tên thể loại" name={"name"} rules={[{
			required: true,
			message: "Tên thể loại không được để trống"
		}]}>
			<Input />
		</Form.Item>
		<Form.Item<Category> shouldUpdate={() => true} label="Mô tả" name={"description"}>
			<Input.TextArea showCount />
		</Form.Item>
		<Form.Item<Category> label="Ảnh" name="icon">
			<UploadImage />
		</Form.Item>
	</CustomSection>
})

export default function CategoryPage() {
	const tableRef = useRef<CategoryTableRef>(null)

	const firstLoad = useCallback(() => {
		tableRef.current?.reload()
	}, [])

	const onAddHandler = useCallback(() => {
		tableRef.current?.reload()
	}, [])

	const onEditHandler = useCallback((id: string) => {
		console.debug("edit", editRef.current != null, id)
		editRef.current?.open(id)
	}, [])

	const onDeleteHandler = useCallback(() => {
		tableRef.current?.reload()
	}, [])

	const onUpdateHandler = useCallback(() => {
		tableRef.current?.reload()
	}, [])

	const deleteRef = useRef<DeleteSectionRef>(null)
	const editRef = useRef<EditSectionRef>(null)

	const deleteHandler = useCallback((id: string) => {
		console.log("delete", id)
		deleteRef.current?.setId(id)
		deleteRef.current?.open()
	}, [])

	return <Flex vertical gap={16}>
		<Space>
			<AddSection onAddHandler={onAddHandler} />
			<EditSection ref={editRef} onDone={onUpdateHandler} />
			<DeleteSection onDelete={onDeleteHandler} ref={deleteRef} url="/api/v1/category" />
		</Space>
		<FoodTable ref={tableRef} onDelete={deleteHandler} onLoad={firstLoad} onEdit={onEditHandler} />
	</Flex>
}
