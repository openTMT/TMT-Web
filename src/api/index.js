import HttpRequest from '@/lib/axios'
import {baseURL_TMT} from '@/config'

const axios = new HttpRequest()
export const axios_tmt = new HttpRequest(baseURL_TMT)
export default axios
