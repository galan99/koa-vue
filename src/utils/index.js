import Vue from 'vue';
import Qs from 'qs';
import axios from 'axios';
import { Message } from 'element-ui'
import router from '../router'

export let checkNumber = (rule, value, callback) => {
    if(!/^[0-9]*$/.test(value) || value==''){
        return callback(new Error('请输入数字'));
    }else{
        callback();
    }                
};


export const Ajax= (...rest) => {

    function checkStatus(response) {
        if(response.data.code!=0 && response.data.msg){
            if (response.data.code == 10003) {
                // 未登陆或登陆已失效
                router.push('/login');
            } else {
                Message.error(response.data.msg);
            }         
        }
        return response.data
    }

    function checkCode(res) {
        Message.error('请求出错，请稍后再试！');
        return res
    }

    let data=rest[2];
    let headers={'X-Requested-With': 'XMLHttpRequest'};
    let json={};

    if(rest[0].toLowerCase()=='post'){
        data= rest.length == 3 ? Qs.stringify(data) : data;
        headers= {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        };      
        json.data=data;
    }else if(rest[0].toLowerCase()=='get'){
        //data.t=new Date().getTime(); //去除get缓存
        json.params=data;
    }else{
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        return axios.post(rest[1], data, config).then(checkStatus).catch(checkCode);
    }
 
    json.method=rest[0]; // 请求方式
    json.url=rest[1]; // 请求的地址
    json.timeout= 80000; // 超时时间, 单位毫秒
    json.headers=headers;

    return axios(json).then(checkStatus).catch(checkCode);

}

/*使用方法
async comeIn(){
    let postData = {
        page: this.curPage, 
        pageSize: this.pageSize,
        sort: this.sort,
    };
    const data=await Ajax('get',`${this.$url}wpk/popups/list`,postData);
    if(data.code==0){

    }
}
*/
