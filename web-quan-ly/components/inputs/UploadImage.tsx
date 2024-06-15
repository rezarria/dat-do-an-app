"use client"

import { LoadingOutlined, PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload, type UploadProps } from "antd";
import { useCallback, useState } from "react";
import { useApi } from "shared";

export type UploadImageProps = {
	value?: string
	onChange?: (value: string) => void
}

export default function UploadImage(props: UploadImageProps) {
	const { api } = useApi()
	const [loading, setLoading] = useState(false)
	const upload = useCallback<NonNullable<UploadProps["customRequest"]>>((options) => {
		if (api) {
			let form = new FormData()
			form.append("image", options.file)
			api.post<string>("/api/v1/images/form", form, {
				headers: {
					"Content-Type": "multipart/form-data"
				},
				onDownloadProgress(progressEvent) {
					options.onProgress?.({ percent: progressEvent.loaded / (progressEvent.total ?? 0) * 100 })
				},
			}).then(res => {
				options.onSuccess?.(res.data)
			})
		} else {
			options.onError?.(new Error("API chưa khởi tạo"))
		}
	}, [api])

	const changeHandler = useCallback<NonNullable<UploadProps["onChange"]>>((info) => {
		switch (info.file.status) {
			case "done":
				props.onChange?.(info.file.response)
				setLoading(false)
				break
			case "uploading":
				setLoading(true)
				break
		}
	}, [props, setLoading])

	let url = null

	if (props.value?.startsWith("http"))
		url = props.value
	else
		url = api?.defaults.baseURL + "/api/v1/images/" + props.value

	return <Upload
		showUploadList={false} openFileDialogOnClick={props.value == null}
		listType="picture-card"
		customRequest={upload} onChange={changeHandler}

	>
		{
			props.value ?
				<div className="w-full h-full overflow-hidden p-[6px]">
					<Image width={"100%"} height={"100%"} style={{ objectFit: "cover" }} alt="image" wrapperClassName="w-full h-full" src={url} />
				</div> :
				(loading ? <LoadingOutlined /> : <PlusOutlined />)
		}
	</Upload>
}