export const state = () => ({
    userInfo: {}
})

// 以上的写法相当于：
// export const state = () => {
//     return {

//     }
// }

export const mutations = {
    setUserInfo(state, data) {
        state.userInfo = data;
    }
}

export const actions = {
    // 相当于封装的api文件
    login(store, data) {
        this.$axios({
            method: 'post',
            url: '/accounts/login',
            data
        }).then(res => {
            // 获取res返回的数据
            const data = res.data;
            // 调用commit方法给mutations赋值
            store.commit('setUserInfo', data)
            return data;
        })
    }
}