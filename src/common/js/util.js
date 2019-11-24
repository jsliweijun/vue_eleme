/* eslint-disable no-unused-vars */
/**
 * 解析url参数
 * @example ?id=123&username=xx
 * @return Object {id:123,useraname:xx}
 */
export function urlParse(){
    // eslint-disable-next-line no-unused-vars
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr =url.match(reg);
    // ['?id=123','&username=xx']
    if(arr){
        arr.forEach((item)=>{
            let tempArr = item.substring(1).split('=');
            let key=decodeURIComponent(tempArr[0]);
            let value=decodeURIComponent(tempArr[1]);
            obj[key]=value;
        });
    }
    return obj;
}