"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { memo, useEffect, type PropsWithChildren } from "react"
import useApi from "../../hooks/useApi"

export default function Layout(props: PropsWithChildren) {
	return <><Observer />{props.children}</>
}

const Observer = memo(function Observer() {
	const { isAuth } = useApi()
	const router = useRouter()
	const params = useSearchParams()
	useEffect(() => {
		if (isAuth) {
			console.debug("LoginPage", "done")
			if (params.has("returnURL")) {
				router.push(params.get("returnURL")!)
			}
		}
	}, [isAuth, params, router])
	return <></>
})
