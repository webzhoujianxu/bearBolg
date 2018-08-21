export interface Notice {
    title: String,
    message: String,
    type: String
}
export interface table {
    pageNum: number,
    pageSize: number,
    currentPage: number,
    allSize: number
}
export interface event {
    getFuncKey: string,
    clickType: number,
    EditIndex: number,
    addUrl: string,
    editUrl: string,
    ArrayKey: string,
    deleteUrl: string,
    name: string
}