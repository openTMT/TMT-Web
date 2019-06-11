import axios from 'axios'
import {baseURL_TMT} from '@/config'

axios.defaults.withCredentials=true

class HttpRequest {
    constructor(baseUrl = baseURL_TMT) {
        this.baseUrl = baseUrl
        this.queue = {}
    }

    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            // headers: {
            //     asdasd:1212
            // }
        }
        return config
    }

    distroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }

    interceptors(instance, url) {
        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show()
            }
            this.queue[url] = true
            return config
        }, error => {
            return Promise.reject(error)
        })
        instance.interceptors.response.use(res => {
            this.distroy(url)
            // const { data, status } = res
            return res
        }, error => {
            this.distroy(url)
            return Promise.reject(error)
        })
    }

    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

export default HttpRequest
