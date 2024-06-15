export interface Page<T> {
	"content": Array<T>,
	"pageable": {
		"pageNumber": number,
		"pageSize": number,
		"sort": {
			"empty": boolean,
			"sorted": boolean,
			"unsorted": boolean
		},
		"offset": number,
		"unpaged": boolean,
		"paged": boolean
	},
	"last": boolean,
	"totalPages": number,
	"totalElements": number,
	"size": number,
	"number": number,
	"sort": {
		"empty": boolean,
		"sorted": boolean,
		"unsorted": boolean
	},
	"first": boolean,
	"numberOfElements": number,
	"empty": boolean
}

export interface Food {
	id: string,
	name: string,
	description: string,
	price: number,
	primaryImage?: string,
	categoryId?: string
}

export interface Category {
	id: string,
	name: string,
	description: string,
	icon?: string,

}

export interface RegisterForm {
	username: string
	password: string
	password2: string
	name: string
}


