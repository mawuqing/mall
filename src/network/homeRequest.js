import {request,getHomeGoodsData} from './request.js'

export function getHomeMultiData () {
   return request( {url: '/home/multidata'})
}

export function getHomeGoods (type,page) {
 return getHomeGoodsData({
   url: '/home/data' ,
   params: {
     type,
     page
   }
 })
}







