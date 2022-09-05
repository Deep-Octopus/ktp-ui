import store from "@/store/index";


const TokenKey = 'token'


/**
 * 获取缓存数据
 * @param key
 * @returns {string|null}
 */
export const getStorage = function (key) {
    if (localStorage.getItem(key)) {
        console.log(localStorage.getItem(key))
        return localStorage.getItem(key);
    }
    return null;
};
export const getSessionStorage = function (key) {
    if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
    }
    return null;
}

/**
 * 对课程进行分组，（根据semester）返回一个parts数组
 * @param lessonKey
 */

export const getGroups = function (lessonKey) {
    let lessons = getSessionStorage(lessonKey)
    if(lessons){
        let parts = []

        lessons.forEach(lesson => {
            let flag = false;
            if (parts.length===0){
                parts[0] = {}
                parts[0].semester = lesson.semester
                parts[0].lessons = []
                parts[0].lessons.push(lesson)
            }else {
                for (let i = 0; i < parts.length; i++) {
                    if (lesson.semester === parts[i].semester){
                        parts[i].lessons.push(lesson)
                        flag = true
                        break
                    }
                }

                if (!flag){
                    parts[parts.length]={}
                    parts[parts.length-1].semester = lesson.semester
                    parts[parts.length-1].lessons=[]
                    parts[parts.length-1].lessons.push(lesson)
                }
            }
        })

        console.log("parts",parts)

        //排序
        for (let i = 0; i < parts.length; i++) {
            for (let j = i+1; j < parts.length-i-1; j++) {
                if (parseInt(parts[i].semester.substring(0,4))>parseInt(parts[j].semester.substring(0,4))){
                    swapArrayLocs(parts,i,j)
                }
            }
        }
        return parts;
    }
    return null;

}
/**
 * 交换数组两个元素位置
 * @param arr
 * @param index1
 * @param index2
 */
export const swapArrayLocs = (arr, index1, index2) => {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
}
/**
 * 缓存数据
 * @param key
 * @param value
 */
export const setStorage = function (key, value) {
    localStorage.setItem(key, value);
};
export const setSessionStorage = function (key, value) {
    sessionStorage.setItem(key, value);
}

/**
 * 删除缓存数据
 * @param key 'key1' | 'key1 key2 key3'
 */
export const delStorage = function (key) {
    if (!key) return;
    const keys = key.split(" ");
    keys.forEach(key => {
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
        }
    });
};
export const delSessionStorage = function (key) {
    if (!key) return;
    const keys = key.split(" ");
    keys.forEach(key => {
        if (sessionStorage.getItem(key)) {
            sessionStorage.removeItem(key);
        }
    });
};
/**
 * 清空缓存数据
 */
export const clearStorage = function () {
    localStorage.clear();
};

export const clearSessionStorage = function () {
    sessionStorage.clear();
};

/**
 * token操作
 * @returns {string|null}
 */
export function getToken() {
    return getStorage(TokenKey);
}

export function setToken(token) {
    console.log(token)
    return setStorage(TokenKey, token)
}

export function removeToken() {
    return delStorage(TokenKey)
}
getGroups('teachLesson')
