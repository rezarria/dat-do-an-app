import type { AxiosInstance } from "axios"
import { create } from "zustand"

type State = {
	instance?: AxiosInstance
	isInit: boolean
	isAuth: boolean
	jwtToken?: string
}

type Action = {
	setInstance: (instance: AxiosInstance) => void
	setIsInit: (isInit: boolean) => void
	setJwtToken: (jwtToken?: string) => void
}

export default create<State & Action>((set) => ({
	isInit: false,
	isAuth: false,
	setInstance: (instance) => set({ instance }),
	setIsInit: (isInit) => set({ isInit }),
	setJwtToken: (jwtToken) => set({ jwtToken, isAuth: jwtToken != null }),
}))

