import http from '@/http/http'
import { EditType } from "@/hooks/EditType";
import { SearchType } from '@/hooks/SearchType'
import { onMounted, reactive, ref } from "vue"
import useInstance from '@/hooks/globalInstance'
import { AddDeptModel, DeptTableAndTreeModel, IListParm } from "./modelDept"
import { DeptApi } from '@/api/dept/DeptApi';
import treeDept from './treeDept'
export default function deptApi(searchFrom: IListParm) {
    const addDeptRef = ref<{ show: (type: string, row?: any) => void }>();
    const { global } = useInstance();
    const { getDeptTree } = treeDept();
    //搜索
    const searchBtn = () => {
        console.log("searchBtn", searchFrom)
        getDeptList(searchFrom);
    }
    // 重置
    const resetBtn = () => {
        searchFrom.searchName = '';
        getDeptList();
    }
    //新增
    const addBtn = () => {
        console.log("addBtn")
        addDeptRef.value?.show(EditType.ADD);
    }
    //编辑
    const editBtn = (row: DeptTableAndTreeModel) => {
        console.log("editBtn", row)
        addDeptRef.value?.show(EditType.EDIT, row)
    }
    //删除
    const deleteBtn = async (row: DeptTableAndTreeModel) => {
        console.log("delete")
        let temp = await global.$myconfirm("确定删除本部门及下级部门？")
        if (temp) {
            await http.post({
                url: DeptApi.DeleteDept,
                data: JSON.stringify({ "id": row.id })
            }).then((res: any) => {
                console.log("2、add dept response===>", res)
                if(res.data.code == 200){
                    global.$mymessage()
                    // 1 table刷新
                    getDeptList()
                    // 2 部门树刷新
                    getDeptTree()
                }
                
            }).catch((error: any) => {
                console.log(error)
            });

        }

    }
    //保存 或修改
    const save = (model: AddDeptModel) => {
        console.log('部门父组件保存')
        console.log(model)
        // 1、保存
        http.post({
            url: DeptApi.AddDept,
            data: JSON.stringify(model)
        }).then((res: any) => {
            console.log("2、add dept response===>", res)
            if (res.data.code == 200) {
                // 1 table刷新
                getDeptList()
                // 2 部门树刷新
                getDeptTree()
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    //定义表格数据
    const tableData = reactive({
        list: []
    })


    // 获取表格数据
    const getDeptList = async (search?: IListParm) => {
        await http.get({
            url: '/api/sys/dept/list',
            data: JSON.stringify(search)
        }).then((res: any) => {
            console.log("1、get dept list response ===>", res)
            if (res && res.data.code == 200) {
                tableData.list = res.data.data;
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }

    //首次加载数据
    onMounted(() => {
        getDeptList()
    })
    return {
        searchBtn,
        addBtn,
        editBtn,
        resetBtn,
        deleteBtn,
        addDeptRef,
        tableData,
        getDeptList,
        save
    }
}