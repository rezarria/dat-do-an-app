"use client"

import { memo, useEffect, type PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAXIOS from "shared/store/useAXIOS"

export default function AuthCheck(props: PropsWithChildren) {
	return <>
		<Check />
		{props.children}
	</>
}

const Check = memo(function Check() {
	const [isInit, isAuth] = useAXIOS(s => [s.isInit, s.isAuth])
	const router = useRouter()
	const path = usePathname()
	useEffect(() => {
		if (isInit) {
			if (!isAuth) {
				console.debug("AuthCheck", "redirect to login")
				router.push("/login?returnURL=" + path,)
			}
		}
	}, [isInit, isAuth, router, path])
	return <></>
})
