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
	setJwtToken: (jwtToken?: string) => void
}

export default create<State & Action>((set) => ({
	isInit: false,
	isAuth: false,
	setInstance: (instance) => set({ instance, isInit: true }),
	setJwtToken: (jwtToken) => set({ jwtToken, isAuth: jwtToken != null }),
}))

