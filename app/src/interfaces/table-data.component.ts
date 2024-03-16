import { Item } from "./request-response";

export type TTableData = Pick<Item, "sku" | "name" | "quantity" | "price"> & {
    id: string;
    number: string;
};