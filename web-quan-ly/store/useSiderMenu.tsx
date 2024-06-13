import type { ReactNode } from "react"
import { create } from "zustand"

type ItemType = {
	name: string
	title?: ReactNode
	icon?: ReactNode
}

type State = {
	open: boolean
	items: Array<ItemType>
	item: string
}

type Action = {
	setOpen(open: boolean): void
	setOpen(action: (v: boolean) => boolean): void
	setItem(items: Array<ItemType>): void
	chooseItem(name: string): void
}


export default create<State & Action>((set) => ({
	open: false,
	items: [], item: "category",
	chooseItem(name) {
		set((state) => {
			if (state.items.find(i => i.name === name) == null) {
				throw "Item not found"
			}
			return {
				item: name
			}
		})
	},
	setItem(items) {
		set({ items })
	},
	setOpen(open) {
		if (typeof open === "boolean")
			set({ open })
		else
			set(s => ({ open: open(s.open) }))
	}
}))