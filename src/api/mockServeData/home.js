import Mock from 'mockjs'
// 图标数据
let list=[]
export default{
    getStatisticalData:()=>{
        // Mock.Random.float产生随机数100-8000之间，保留小数，最小0位，最大0位
        for(let i= 0;i<7;i++){
            list.push(
                Mock.mock({
                苹果:Mock.Random.float(100,8000,0,0),
                vivo:Mock.Random.float(100,8000,0,0),
                oppo:Mock.Random.float(100,8000,0,0),
                魅族:Mock.Random.float(100,8000,0,0),
                三星:Mock.Random.float(100,8000,0,0),
                小米:Mock.Random.float(100,8000,0,0),
                荣耀:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code:20000,
            data:{
                // 饼图
                videoData:[
                    {
                        name:'小米',
                        value:2999
                    },
                    {
                        name:'苹果',
                        value:5999
                    },
                    {
                        name:'vivo',
                        value:1500
                    },
                    {
                        name:'oppo',
                        value:1999
                    },
                    {
                        name:'魅族',
                        value:2200
                    },
                ],
                // 柱状图
                userData:[
                    {
                        date:'周一',
                        new:5,
                        active:200
                    },
                    {
                        date:'周二',
                        new:10,
                        active:500
                    },
                    {
                        date:'周三',
                        new:12,
                        active:550
                    },
                    {
                        date:'周四',
                        new:60,
                        active:800
                    },
                    {
                        date:'周五',
                        new:100,
                        active:1000
                    },
                    {
                        date:'周六',
                        new:120,
                        active:1300
                    },
                    {
                        date:'周日',
                        new:200,
                        active:2000
                    },

                ],
                // 折线图
                orderData:{
                    date:['20221001','20221002','20221003','20221004','20221005','20221006','20221007'],
                    data:list
                },
                tableData: [
                    {
                      name: "appo",
                      todayBuy: 500,
                      monthBuy: 3500,
                      totalBuy: 22000,
                    },
                    {
                      name: "vivo",
                      todayBuy: 300,
                      monthBuy: 2200,
                      totalBuy: 24000,
                    },
                    {
                      name: "苹果",
                      todayBuy: 800,
                      monthBuy: 4500,
                      totalBuy: 65000,
                    },
                    {
                      name: "小米",
                      todayBuy: 500,
                      monthBuy: 3500,
                      totalBuy: 45000,
                    },
                    {
                      name: "三星",
                      todayBuy: 450,
                      monthBuy: 2400,
                      totalBuy: 32000,
                    },
                    {
                      name: "魅族",
                      todayBuy: 150,
                      monthBuy: 1500,
                      totalBuy: 21000,
                    },
                  ],
            }
        }
    }
}
