"use client"

import { Select, type SelectProps } from "antd";
import { memo, useEffect, useState } from "react";
import { useApi, type Unpacked } from "shared";
import type { Category, Page } from "shared/models";

export default memo(function CategorySelect(props: {
	onChange?: (value: string) => void
	value?: string
}) {
	const { api } = useApi()
	const [loading, setLoading] = useState(true)
	const [options, setOptions] = useState<SelectProps["options"]>([])
	useEffect(() => {
		if (api) {
			api.get<Page<Category>>("/api/v1/category", {
				params: {
					size: 1000
				}
			}).then(res => {
				setOptions(res.data.content.map((item) => ({
					title: item.name,
					label: item.name,
					value: item.id
				} as NonNullable<Unpacked<SelectProps["options"]>>)))
				setLoading(false)
			})
		}
	}, [api])
	return <Select loading={loading} disabled={loading} value={props.value} onChange={props.onChange} options={options} />
})