"use client"

import { Table, type TableProps } from "antd";
import type { AnyObject } from "antd/es/_util/type";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useApi } from "shared";
import type { Page } from "shared/models";
import type { OnClicks } from "./buttons/ActionButton";

export type ImplBaseTableProps = {
	onLoad?: () => void
} & OnClicks

export type BaseTableProps<T> = {
	fetcher?: (search?: string) => Promise<Page<T> | undefined>
	onLoad?: () => void
	columns: TableProps<T>["columns"]
}

export type BaseTableRef<T> = {
	setSearch(search?: string): void
	reload(): void
}

export default function CreateBaseTable<T extends AnyObject>() {
	return memo(forwardRef<BaseTableRef<T>, BaseTableProps<T>>(function BaseTable(props, ref) {
		const [search, setSearch] = useState<string>()
		const [data, setData] = useState<Readonly<Array<T>>>([])

		useEffect(() => {
			if (props.fetcher) {
				props.onLoad?.()
			}
		}, [props])

		useImperativeHandle(ref, () => ({
			setSearch(v) {
				setSearch(v)
			},

			reload() {
				if (props.fetcher)
					props.fetcher(search).then(res => {
						if (res)
							setData(res.content)
					})
			},

		}), [props, search])
		return <Table pagination={{ defaultPageSize: 10 }} columns={props.columns} dataSource={data} className="w-full" bordered rowKey={"id"} />
	}))
}

export function useCreateFetecher<T>(url: string) {
	const { api } = useApi()
	const fetcher = useMemo<BaseTableProps<T>["fetcher"]>(() => {
		if (api) return async (search) => {
			if (api) {
				const res = await api.get<Page<T>>(url, {
					params: {
						query: search
					}
				})
				return res.data
			}
		}
	}, [api, url])
	return fetcher
}
