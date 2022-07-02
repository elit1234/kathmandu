type MenuOption = {
    id: number;
    label: string;
    page: number;
    parent?: number;
    extName: string;
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
}

type SwatchType = {
    label: string;
    url: string;
}