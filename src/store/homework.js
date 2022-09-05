
import {doPost} from "@/utils/api";
import {mymessage} from "@/utils/myMessage";
import {getSessionStorage, setSessionStorage} from "@/store/auth";
import th from "element-ui/src/locale/lang/th";

export default {
    namespaced:true,
    state:{
        homeworks: [],
        dialogFormVisibleForAdd: false
    },
    actions:{
        initHomework(context,data){
            let homeworks = JSON.parse(getSessionStorage("homeworks"))
            //如果浏览器里面保存有作业，就直接拿来用，
            //因为每次进入classDetail页面都会更新里面的作业
            //为对应课程作业
            if (homeworks&&homeworks.length!==0){
                this.$store.state.homework.homeworks = homeworks
                return
            }
        //    浏览器没有，就到数据库里面去获取
            doPost("/homework/initHomework",data)
                .then((res)=>{
                    if (res.data.status === 200){
                        context.commit("INIT_HOMEWORK_SUCCESS",{...res})
                    }else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err)=>{
                    console.log("作业获取错误",err)
            })
        },
        postHomework(context,data) {
            console.log(data)
            doPost("/homework/postHomework",data)
                .then((res)=>{
                    if (res.data.status === 200){

                        context.commit("POST_HOMEWORK_SUCCESS",{...res})
                    }
                }).catch((err)=>{
                    console.log('发布错误',err)
            })
        },
        submitHomework(context,data){
            doPost("/homework/submitHomework",data)
                .then((res)=>{
                    if (res.data.status === 200){

                        context.commit("SUBMIT_HOMEWORK_SUCCESS",{...res})
                    }
                    else {
                        mymessage.error(res.data.msg)
                    }
                })
        },
        updateScore(context,data){
            doPost("/homework/updateScore",data)
                .then((res)=>{
                    console.log("更新分数",res.data)
                    if (res.data.status === 200){
                        mymessage.success("更新成功")
                    }
                    else {
                        mymessage.error(res.data.msg)
                    }
                })
        }
    },
    mutations:{
        INIT_HOMEWORK_SUCCESS(state,res){
            state.homeworks = res.data.data;
            // setSessionStorage("homework",JSON.stringify(state.homeworks))

        },
        POST_HOMEWORK_SUCCESS(state,res){
            state.homeworks.push(res.data.data);
            setSessionStorage("homework",JSON.stringify(state.homeworks));

            state.dialogFormVisibleForAdd = false
            mymessage.success("作业发布成功")
            setTimeout(()=>{
                window.location.reload()
            },100 )

        },
        SUBMIT_HOMEWORK_SUCCESS(state,res){
            window.location.reload();
            mymessage.success("提交成功")
        }
    },
    getters:{

    }
}
