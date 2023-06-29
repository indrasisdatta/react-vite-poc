export interface Tag {
    tag: string
}

export interface Product {
    id?: number;
    title: string;
    category?: string;
    brand?: string;
    price: number;
    description: string;
    tags?:Tag[];
}

