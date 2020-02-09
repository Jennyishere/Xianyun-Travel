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
    // 登录接口
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
    },
    // 注册
    register(store, data) {

        this.$axios({
            method:'POST',
            url:'/accounts/register',
            data
        }).then(res=> {
            store.commit('setUserInfo',res.data)
            return res.data;
        })
    },
    // 发送验证码
    Captcha(store, data) {
        this.$axios({
            method:'POST',
            url:'/captchas',
            data: {
                tel: data
            }
        }).then(res=> {
            return res;
        })
    }


}