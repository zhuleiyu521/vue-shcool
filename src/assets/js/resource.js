import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

export default {
    version: "2.0.0",
    buildId: "1",
    app: Vue, //整个实例对象  

    resourceUnit(param, successcallback, errorcallback) {
        // console.log(`params:------------${JSON.stringify(param)}`
        var self = this;
        let isTimeout = true;
        setTimeout(function() {
            if (isTimeout) {
                var data = {
                    code: 0,
                    msg: "连接超时，请稍后再试！"
                }
                if (errorcallback) {
                    errorcallback(data)
                }
            }
        }, (param.timeout + 1000) || 10000);
        Vue.http({
            url: param.url,
            method: param.method,
            body: param.body, //body参数，post请求使用此参数
            params: param.pa, //url参数
            headers: param.headers == undefined ? JSON.parse(localStorage.getItem('headers')) : param.headers,
            timeout: param.timeout == undefined ? 50000 : param.timeout
        }).then(
            function(response) {
                isTimeout = false;
                self.dealREsponse(response, successcallback, errorcallback);
            },
            function(response) {
                isTimeout = false;
                self.dealREsponse(response, successcallback, errorcallback);
            })
    },

    dealREsponse(response, successcallback, errorcallback) {
        // console.log(response);
        var self = this;
        if (response.status == 200) {
            if (response.body.type == "image/jpeg") {
                successcallback(response.data)
                return;
            }
            //http成功
            if (response.data.code == 0) {
                //成功
                if (successcallback) {
                    successcallback(response.data)
                }
            } else {
                //我们的接口失败
                if (errorcallback) {
                    errorcallback(response.data)
                } else {}
            }
        } else if (response.status == 0) {
            //网络不通畅，连接超时
            var data = {
                code: 0,
                msg: "服务连接出错，请稍后再试！"
            }
            if (errorcallback) {
                errorcallback(data)
            } else {}
        } else if (response.status == 403) {
            //强制下线
            if (response.body.code && response.body.code == '403') {
                var data = {
                    code: 500,
                    msg: "登陆已过期,请重新登陆!"
                }
                if (errorcallback) {
                    errorcallback(data)
                }
            } else {
                //http失败
                var data = {
                    code: 500,
                    msg: "登陆已过期,请重新登陆!"
                }
                if (errorcallback) {
                    errorcallback(data)
                }
            }
        } else {
            //http失败
            var data = {
                code: 500,
                msg: "操作异常，请稍后再试！"
            }
            if (errorcallback) {
                errorcallback(data)
            }
        }
    }
}