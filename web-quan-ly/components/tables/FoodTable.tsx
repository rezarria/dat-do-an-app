"use client"

import type { Food } from "shared/models";
import CreateBaseTable, { BaseTableRef, useCreateFetecher, type BaseTableProps, type ImplBaseTableProps } from "../CreateBaseTable";
import { forwardRef, useMemo } from "react";
import { Image } from "antd";
import ActionButton from "../buttons/ActionButton";

const CustomTable = CreateBaseTable<Food>()

export type FoodTableRef = BaseTableRef<Food>

export default forwardRef<FoodTableRef, ImplBaseTableProps>(function FoodTable(props, ref) {

	const fetcher = useCreateFetecher<Food>("/api/v1/food")

	const columns = useMemo<BaseTableProps<Food>["columns"]>(() => [
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
			title: "Giá",
			dataIndex: "price",
			key: "price",
			sorter: true,
		},
		{
			title: "Ảnh",
			dataIndex: "primaryImage",
			key: "primaryImage",
			render: (text?: string) => <>
				{text && <Image src={text} alt="Primary Image" style={{ width: "100px" }} />}
			</>,
		},
		{
			title: "Thể loại",
			dataIndex: "categoryId",
			key: "categoryId",
			sorter: true,
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


