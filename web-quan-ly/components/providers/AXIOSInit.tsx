"use client"

import { memo, useEffect, type PropsWithChildren } from "react";
import useAXIOS from "../../store/useAXIOS";
import config from "../../config/api.json";
import axios from "axios";

export default function AXIOSInit(props: PropsWithChildren) {
	return <>
		<Init />
		<InitJWT />
		{props.children}
	</>
}

const Init = memo(function Init() {
	const [set, isInit] = useAXIOS(s => [s.setInstance, s.isInit])
	useEffect(() => {
		if (!isInit) {
			const instance = axios.create({
				baseURL: config.baseURL,
			})
			set(instance)
			console.debug("AXIOSInit", "set up axios")
		}
	}, [set, isInit])
	return <></>
})

const InitJWT = memo(function InitJWT() {
	const [isInit, setJwtToken] = useAXIOS(s => [s.isInit, s.setJwtToken])
	useEffect(() => {
		if (isInit) {
			console.debug("AXIOSInit", "set up auth")
			let access_token = localStorage.getItem("access_token")
			if (access_token) {
				setJwtToken(access_token)
			}
		}
	}, [isInit, setJwtToken])
	return <></>
})

