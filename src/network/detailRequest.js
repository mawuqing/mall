import {request} from './request'

export function getDetailRequest(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export class goodsBaseInfo {
  //导出一个类,并且类里有构造函数,构造函数有参数需要传
  constructor(title,lowNowPrice,oldPrice,discountDesc,columns,services){
    this.title = title
    this.lowNowPrice = lowNowPrice
    this.oldPrice = oldPrice
    this.discountDesc = discountDesc
    this.columns = columns
    this. services = services
  }
}


export function getRecommend(){
  return request({
    url: '/recommend'
  })

}
