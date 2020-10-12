//1.导入已安装的axios
import axios from 'axios'

//4.导出网络请求的函数request(config) ,这里必须有一个参数,调用者要请求哪个地址,就把哪个地址对象发过来,config不是全网址,是?后面的参数,自动追加到baseRUL后面
export function request (config) {

//2.不要用全局请求,应该创建实例instance,实例里面配置baseURL,就是网址前面重复冗余的地址
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  // 3.返送真正的网络请求:instance(config)config就是网络请求的连接地址参数,这里返回return一个实例instance,这个instance和promise一样,谁调用,就可以在谁的后面.then()获取请求结果
  return instance(config)
}
export function getHomeGoodsData (config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout:5000
  })
  return instance(config)

}
