import { Table } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import { forwardRef, memo, useImperativeHandle, useState } from "react";
import type { Page } from "shared/models";

type BaseTableProps<T> = {
	fetcher: (search?: string) => Promise<Page<T>>
}

type BaseTableRef<T> = {
	setSearch(search?: string): void
	reload(): void
}

export default function CreateBaseTable<T extends AnyObject>() {
	const [search, setSearch] = useState<string>()

	const [data, setData] = useState<Readonly<Array<T>>>([])
	return memo(forwardRef<BaseTableRef<T>, BaseTableProps<T>>(function BaseTable(props, ref) {
		useImperativeHandle(ref, () => ({
			setSearch(v) {
				setSearch(v)
			},

			reload() {
				props.fetcher(search).then(res => {
					setData(res.content)
				})
			},
		}), [search])
		return <Table dataSource={data} rowKey={"id"} />
	}))
}