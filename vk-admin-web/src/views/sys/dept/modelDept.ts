export interface IListParm {
    searchName: string;
    deptId: string | number;
}

//表格数据
export interface DeptTableAndTreeModel {
    id: number,
    pid: number,
    name: string,
    parentName: string,
    manager: string,
    deptAddress: string,
    deptPhone: string,
    createTime: string,
    updateTime: string,
    children:Array<DeptTableAndTreeModel>
}
//表单提交的数据类型
export interface AddDeptModel {
    type: string;
    id: string | number;
    pid: string | number;
    parentName: string;
    manager: string;
    deptAddress: string;
    deptPhone: string;
    name: string;
    createTime:string,
    updateTime:string
}
export interface Tree {
    label: string
    children?: Tree[]
}