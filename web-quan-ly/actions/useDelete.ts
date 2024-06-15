import { useCallback } from "react";
import { useApi } from "shared";

export default function useDelete(url: string) {
	const { api } = useApi()
	return useCallback(async (id: string) => {
		if (api) {
			await api.delete(`${url}/${id}`)
		}
	}, [api, url])
}