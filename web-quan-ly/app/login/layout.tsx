"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { memo, Suspense, useEffect, type PropsWithChildren } from "react"
import { useApi } from "shared"

export default function Layout(props: PropsWithChildren) {
	return <><Suspense>
		<Observer /></Suspense>{props.children}</>
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
			} else
				router.push("/admin/food")
		}
	}, [isAuth, params, router])
	return <></>
})
