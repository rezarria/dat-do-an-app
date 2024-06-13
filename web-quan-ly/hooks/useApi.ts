import useAXIOS from "../store/useAXIOS";

export default function useApi() {
	const [api, isAuth, isInit] = useAXIOS(s => [s.instance, s.isAuth, s.isInit])
	return { api, isAuth, isInit }
}