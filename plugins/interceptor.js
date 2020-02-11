import { Message } from 'element-ui'

export default (data) => {
    data.$axios.onError(err => {
    console.log(err.response);
    const {statusCode,message} = err.response.data

    if(statusCode == 400) Message.error(message)
    })
}