import Vue from 'vue';

import {mymessage} from "@/utils/myMessage";
import Vuex from "vuex";
import router from "@/router/router";
import main from "element-ui/packages/main";
import {doGet, doPost} from "@/utils/api";
import homework from "@/store/homework";
import {
    clearSessionStorage,
    clearStorage,
    getGroups,
    getSessionStorage,
    setSessionStorage,
    setStorage
} from "@/store/auth"

//
Vue.use(Vuex);

const user = {
    namespaced: true,
    state: {
        userInfo: {},
        isLogin: false,
        isTeacher: true,
        studyLesson: [],
        teachLesson: []
    },
    actions: {
        login(context, data) {
            doPost('/login', data)
                .then((res) => {
                    console.log("login",res)
                    if (res.data.status === 200) {
                        context.commit('LOGIN_SUCCESS', {...res})
                        user.state.isLogin = true;
                        context.dispatch("initLesson", data.username)
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch(err => {
                console.log(err)
            })
        },
        register(context, data) {
            doPost('/register', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit('REGISTER_SUCCESS', {...res})
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        },
        logout() {
            router.push({
                name: 'login'
            }).then(() => {
                clearStorage();
                clearSessionStorage();
                user.state.isLogin = false;
                user.state.userInfo = {};
                user.state.studyLesson = {};
                user.state.teachLesson = {};
            })
        },
        createLesson(context, data) {
            doPost('/lesson/createLesson', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit('CREATE_LESSON_SUCCESS', {...res})
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        },

        joinLesson(context, data) {
            doPost('/lesson/joinLesson', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit("JOIN_LESSON_SUCCESS", {...res})
                        mymessage.success("加课成功")
                        mainAbout.state.dialogFormVisibleForJoin = false;
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log("sss",err)
            })
        },
        initLesson(context, username) {
            console.log("init")
            doPost('/lesson/initLesson', username)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit("INIT_SUCCESS", {...res})
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        },
        setTop(context,data){
            doPost('/lesson/setTop', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit("SET_TOP_SUCCESS",data)
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        },
        dropOut(context,data){
            doPost('/lesson/dropOut', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit("DROP_OUT_SUCCESS", data)
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        },
        deleteLesson(context,data){
            doPost('/lesson/deleteLesson', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        context.commit("DELETE_LESSON_SUCCESS", data)
                    } else {
                        mymessage.error(res.data.msg)
                    }
                }).catch((err) => {
                console.log(err)
            })
        }
    },
    mutations: {
        LOGIN_SUCCESS(state, res) {
            setStorage("token", res.data.data.token)
            //vuex保存用户数据
            state.userInfo = res.data.data.userInfo
            setSessionStorage("isTeacher", res.data.data.userInfo.identity === "teacher")
            state.isTeacher = getSessionStorage("isTeacher")
            //浏览器本地
            setSessionStorage("userInfo", JSON.stringify(res.data.data.userInfo))
            setSessionStorage("isLogin", true)
            state.isLogin = true;

            //跳转到首页
            router.push({
                name: 'main'
            }).then(() => {
                mymessage.success("登录成功")
            })
        },
        REGISTER_SUCCESS(_, res) {
            mymessage.success("注册成功，快登录吧！")
            router.push({
                name: 'login'
            })
        },


        CREATE_LESSON_SUCCESS(state, res) {
            let lessons = getSessionStorage("teachLesson");
            lessons[lessons.length] = res.data.data;
            setSessionStorage("teachLesson", JSON.stringify(lessons));
            state.teachLesson = getGroups("teachLesson")
            mymessage.success("创建成功")
            mainAbout.state.dialogFormVisibleForCreate = false
        },
        JOIN_LESSON_SUCCESS(state, res) {
            let lessons = getSessionStorage("studyLesson");
            lessons[lessons.length] = res.data.data;
            setSessionStorage("studyLesson", JSON.stringify(lessons));
            state.studyLesson = getGroups("studyLesson")
        },
        INIT_SUCCESS(state, res) {
            console.log(res.data.data)
            setSessionStorage("teachLesson", JSON.stringify(res.data.data.teach))
            setSessionStorage("studyLesson", JSON.stringify(res.data.data.study))
            state.studyLesson = getGroups("studyLesson");
            state.teachLesson = getGroups("teachLesson");
            console.log("INIT_SUCCESS",state.studyLesson)
        },
        SET_TOP_SUCCESS(state,data){
            let studyLesson = getSessionStorage("studyLesson")
            let flag = false
            for (let i = 0; i < studyLesson.length; i++) {
                if (studyLesson[i].lessonCode === data.lessonCode){
                    studyLesson[i].isTop = data.isTop
                    flag = true;
                    break;
                }
            }
            setSessionStorage("studyLesson",JSON.stringify(studyLesson))
            if (!flag){
                let teachLesson = getSessionStorage("teachLesson")
                for (let i = 0; i < teachLesson.length; i++) {
                    if (teachLesson[i].lessonCode === data.lessonCode){
                        teachLesson[i].isTop = data.isTop
                        break;
                    }
                }
                setSessionStorage("teachLesson",JSON.stringify(teachLesson))
            }
            window.location.reload();
        },
        DROP_OUT_SUCCESS(state,data){
            let studyLesson = getSessionStorage("studyLesson")
            for (let i = 0; i < studyLesson.length; i++) {
                if (studyLesson[i].lessonCode === data.lessonCode){
                    console.log(studyLesson.length)
                    studyLesson.splice(i,1)
                    console.log(studyLesson.length)
                    break;
                }
            }
            setSessionStorage("studyLesson",JSON.stringify(studyLesson))
            window.location.reload();
        },
        DELETE_LESSON_SUCCESS(state,data){
            let teachLesson = getSessionStorage("teachLesson")
            for (let i = 0; i < teachLesson.length; i++) {
                if (teachLesson[i].lessonCode === data.lessonCode){
                    console.log(teachLesson.length)
                    teachLesson.splice(i,1)
                    console.log(teachLesson.length)
                    break;
                }
            }
            setSessionStorage("teachLesson",JSON.stringify(teachLesson))
            window.location.reload();
        }
    },
}
const teacherAbout = {
    namespaced: true,
    state: {
        avatar: '',
        homeworks: [
            {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }
        ]
    },
    actions: {},
    mutations: {},
    getters: {}
}

const studentAbout = {
    namespaced: true,
    state: {
        avatar: '',
        homeworks: [
            {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            },
            {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            },
            {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }, {
                homeworkTitle: '最后一次作业',
                anotherName: '作业',
                deadline: '22/06/13 00:00',
                isFinish: true,
                homeworkType: '个人作业',
                isCorrect: true,
                score: '90'
            }
        ]
    },
    actions: {},
    mutations: {},
    getters: {}
}

const mainAbout = {
    namespaced: true,
    state: {
        isTeacher: true,
        temporaryLesson: {},
        dialogFormVisibleForJoin: false,
        dialogFormVisibleForCreate: false,

    },
    mutations: {},

    getters: {
        isTeacher() {
            return mainAbout.state.isTeacher;
        },
        hasTopLesson() {
            for (let i = 0; i < user.state.studyLesson.length; i++) {
                for (let j = 0; j < user.state.studyLesson[i].lessons.length; j++) {
                    if (JSON.parse(user.state.studyLesson[i].lessons[j].isTop)) {
                        return true;
                    }
                }
            }
            for (let i = 0; i < user.state.teachLesson.length; i++) {
                for (let j = 0; j < user.state.teachLesson[i].lessons.length; j++) {
                    if (JSON.parse(user.state.teachLesson[i].lessons[j].isTop)) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

}
const homeworksAbout = {
    namespaced: true,
    state: {
        homeworks: [
            {
                name: '张洁',
                id: '12123020122',
                similarity: '0%',
                commitStatus: '22/08/24/19:13 提交',
                numOfWords: '632',
                reviewTimes: '0',
                score: '未批'
            }
        ]
    }
}
export default new Vuex.Store({
    modules: {
        homework,
        teacherAbout,
        studentAbout,
        mainAbout,
        homeworksAbout,
        user
    }
})