"use client"

import type { Category } from "shared/models";
import CreateBaseTable, { BaseTableRef, useCreateFetecher, type BaseTableProps, type ImplBaseTableProps } from "../CreateBaseTable";
import { forwardRef, useMemo } from "react";
import { Image } from "antd";
import ActionButton from "../buttons/ActionButton";

const CustomTable = CreateBaseTable<Category>()

export type CategoryTableRef = BaseTableRef<Category>

export default forwardRef<CategoryTableRef, ImplBaseTableProps>(function CategoryTable(props, ref) {

	const fetcher = useCreateFetecher<Category>("/api/v1/category")

	const columns = useMemo<BaseTableProps<Category>["columns"]>(() => [
		{
			title: "Tên món ăn",
			dataIndex: "name",
			key: "name",
			sorter: true,
		},
		{
			title: "Mô tả",
			dataIndex: "description",
			key: "description",
			sorter: true,
		},
		{
			title: "Ảnh",
			dataIndex: "icon",
			key: "icon",
			render: (text?: string) => <>
				{text && <Image src={text} alt="Icon" style={{ width: "100px" }} />}
			</>,
		},
		{
			title: "Hành động",
			dataIndex: "id",
			key: "id",
			width: 200,
			render: (id: string, _, index) => <ActionButton id={id} key={index} onView={props.onView} onDelete={props.onDelete} onEdit={props.onEdit} />
		}
	], [props.onDelete, props.onEdit, props.onView])

	return <CustomTable
		ref={ref}
		columns={columns}
		fetcher={fetcher}
		onLoad={props.onLoad} />
})


