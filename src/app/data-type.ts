export interface signUp{
    name:string,
    password:string,
    email:string
}

export interface login{
    email:string
    password:string,
}
export interface Product{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined | number,
}