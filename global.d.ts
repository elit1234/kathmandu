type MenuOption = {
    id: number;
    label: string;
    page: number;
    parent?: number;
    extName: string;
    position: number;
};

type ProductType = {
    id: number;
    message: string;
    title: string;
    extName: string;
    regular: number;
    price: number;
    images: [string];
    showingImage: any;
    swatches: [SwatchType]
    paragraphs?: [string]
    features?: [string]
    materials?: [MaterialType]
}



type SwatchType = {
    label: string;
    url: string;
}

type MaterialType = {
    name: string;
    value: string;
}

type UserLoginType = {
    email?: string;
    password?: string;
};

type UserType = {
    email?: string;
    admin: number;

}