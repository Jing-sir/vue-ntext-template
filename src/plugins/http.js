import os from 'os';
import { http, moment } from '../utils/common';
import { typeOf } from '../utils';
import router from '../setup/router-setup';

const packageInfo = require('../../package');

const xhrDefaultConfig = {
    headers: {
        OS: JSON.stringify({
            platform: os.platform(),
            totalmem: os.totalmem(),
            freemem: os.freemem(),
            endianness: os.endianness(),
            arch: os.arch(),
            tmpdir: os.tmpdir(),
            type: os.type(),
        }),
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        // 'User-Agent': os.release(),
        DEVICESOURCE: 'web',
        Accept: 'application/json',
    },
    // timeout: 1000,
};

function httpInit(instance) {
    instance.interceptors.request.use(config => ({
        ...config,
        headers: {
            ...xhrDefaultConfig.headers,
            'X-B3-Traceid': moment().valueOf() * 1000, // Traceid
            'X-B3-Spanid': moment().valueOf() * 1000,
            platform: 'WEB',
            version: packageInfo.version,
        },
        transformRequest: [
            // Do whatever you want to transform the data
            (data = {}/* , headers */) => {
                 (typeOf(data) === 'object' ? Object.entries(data).reduce((acc, cur) => acc.append(...cur) || acc, new FormData()) : data)
            },
        ],
    }), (error) => {
        // toast(error?.message, 'error');
        return Promise.reject(error);
    });

    instance.interceptors.response.use((/* response */{ data = {} }) => {


        if (typeOf(data) !== 'object') return data;
        switch (data?.code) {
            case 400000: // 去登录
                router.app.$store.commit('updateUserInfo', {});
                router.push('/login'); // 原生登录
                return Promise.reject(new Error({ code: data.code }));
            case 0: // 正常
                return data.data;
            /* case '100007':
              return data; // 账户已经存在 */
            default:
                try {
                    // toast(data.msg || data.message, 'error');
                    return Promise.reject(new Error(data.msg));
                } catch (error) {
                    return data;
                }
        }
    }, ({ response }) => {
        // if (!__CANCEL__) toast(response?.message || response?.data?.message, 'error');
        throw new Error(response);
    });

    return instance;
}

export default typeof Proxy === 'undefined' ? {
    instance: (uri) => {
        const { baseURL = uri, timeout } = xhrDefaultConfig;
        return httpInit(http.create({
            baseURL,
            timeout,
        }));
    },
} : new Proxy(Object.create(null),
    {
        get(target, key) {
            if (key === 'instance') return null;
            const { baseURL = key, timeout } = xhrDefaultConfig;
            return httpInit(http.create({
                baseURL,
                timeout,
            }));
        },
    });
