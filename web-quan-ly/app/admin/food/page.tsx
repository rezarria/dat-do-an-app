"use client"

import { Flex, Form, Input, InputNumber, Space } from "antd";
import FoodTable, { type FoodTableRef } from "../../../components/tables/FoodTable";
import { forwardRef, memo, useCallback, useRef } from "react";
import type { Food } from "shared/models";
import UploadImage from "../../../components/inputs/UploadImage";
import DeleteSection, { DeleteSectionRef } from "../../../components/DeleteSection";
import CategorySelect from "../../../components/inputs/CategorySelect";
import CreateAddSection from "../../../components/CreateAddSection";
import CreateEditSection, { EditSectionRef } from "../../../components/CreateEditSection";

const CustomSection = CreateAddSection<Food>()
const CustomEditSection = CreateEditSection<Food>(<>
	<Form.Item<Food> label="Tên món ăn" name="name" rules={[{
		required: true,
		message: "Tên món ăn không được để trống"
	}]}  >
		<Input />
	</Form.Item>
	<Form.Item<Food> initialValue={0} label="Giá" name="price">
		<InputNumber min={0} style={{ width: "100%" }} />
	</Form.Item>
	<Form.Item<Food> label="Mô tả" name="description" >
		<Input.TextArea />
	</Form.Item>
	<Form.Item<Food> label="Ảnh" name="primaryImage">
		<UploadImage />
	</Form.Item>
	<Form.Item<Food> label="Thể loại" name="categoryId">
		<CategorySelect />
	</Form.Item>
</>)

const EditSection = memo(
	forwardRef<EditSectionRef, { onDone?: () => void }>(
		function EditSection(props, ref) {
			return <CustomEditSection title="Sửa món ăn" urlGet="/api/v1/food/detail" urlPatch="/api/v1/food"
				ref={ref}
				onDone={props.onDone}
				map={(v) => ({
					name: v.name,
					price: v.price,
					description: v.description,
					primaryImage: v.primaryImage,
					categoryId: v.categoryId
				})} />

		}
	)
)

const AddSection = memo(function AddSection(props: { onAddHandler: () => void }) {
	return <CustomSection title="Thêm món ăn" url="/api/v1/food" onAdd={props.onAddHandler}>
		<Form.Item<Food> label="Tên món ăn" name={"name"} rules={[{
			required: true,
			message: "Tên món ăn không được để trống"
		}]}>
			<Input />
		</Form.Item>
		<Form.Item<Food> initialValue={0} label="Giá" name="price">
			<InputNumber min={0} style={{ width: "100%" }} />
		</Form.Item>
		<Form.Item<Food> shouldUpdate={() => true} label="Mô tả" name={"description"}>
			<Input.TextArea showCount />
		</Form.Item>
		<Form.Item<Food> label="Ảnh" name="primaryImage">
			<UploadImage />
		</Form.Item>
		<Form.Item<Food> label="Thể loại" name="categoryId">
			<CategorySelect />
		</Form.Item>
	</CustomSection>
})

export default function FoodPage() {
	const tableRef = useRef<FoodTableRef>(null)

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
			<DeleteSection onDelete={onDeleteHandler} ref={deleteRef} url="/api/v1/food" />
		</Space>
		<FoodTable ref={tableRef} onDelete={deleteHandler} onLoad={firstLoad} onEdit={onEditHandler} />
	</Flex>
}
