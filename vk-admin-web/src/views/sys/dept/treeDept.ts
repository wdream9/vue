
import http from '@/http/http'
import { onMounted, reactive, ref, watch } from 'vue'
import { DeptTableAndTreeModel, Tree } from './modelDept'
import { useStore } from '@/store';
export default function treeDept() {


    const store = useStore();
    // 定义左侧部门树
    var deptTree = ref<Array<DeptTableAndTreeModel>>([])
    // 获取部门数据
    const getDeptTree = async () => {
        await http.get({
            url: '/api/sys/dept/list',
            data: JSON.stringify({ "deptId": 0, "deptName": '' })
        }).then((res: any) => {
            console.log("1、get dept list response ===>", res)
            if (res && res.data.code == 200) {
                deptTree.value = deptTreeHandler(res.data.data);
                store.commit('system/setDeptTree', deptTree.value);
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    // 处理部门树
    const deptTreeHandler = (datalist: Array<DeptTableAndTreeModel>) => {
        let notRootNode = reactive<Array<DeptTableAndTreeModel>>([]);
        const deptTrees = reactive<Array<DeptTableAndTreeModel>>([])
        datalist.forEach((val, index) => {
            if (val.pid == 0) {
                deptTrees.push(val);
            } else {
                notRootNode.push(val);
            }
        });
        notRootNode.forEach((value) => {
            deptTrees.forEach((val) => {
                if (value.pid == val.id) {
                    val.children.push(value);
                }
            });
        });
        return deptTrees;
    }
    onMounted(() => {
        getDeptTree();
    })

    return {
        deptTree,
        getDeptTree
    }
}
