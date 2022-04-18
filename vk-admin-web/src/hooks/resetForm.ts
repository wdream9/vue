//表单清空
// formRef: 表单的ref属性  obj表单的数据域
export default function resetForm(formRef:any, obj:any) {
    //清空数据域
    Object.keys(obj).forEach(key => {
        obj[key] = '';
    })
    //清空表单
    // if (formRef) {
    //     formRef.resetFields();
    //     formRef.clearValidate();
    // }
}