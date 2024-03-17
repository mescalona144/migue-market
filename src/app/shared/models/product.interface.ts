/* {
    id:1,
    title:'...',
    price:'...',
    category:'...',
    description:'...',
    image:'...'
} */
interface Rating {
    rating: number,
    count: number,
    rate: number
}

export interface Product {
        id: number,
        title: string
        price: number,
        category: string,
        description: string,
        image: string,
        rating: Rating,
        qty: number,
        subTotal: number,
}