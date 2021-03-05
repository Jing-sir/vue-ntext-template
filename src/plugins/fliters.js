import { moment } from '../utils/common';

export const timeStampToDate = (timeStamp, reg = 'YYYY.MM.DD HH:mm:ss') => { // 时间戳转时间
    if (!timeStamp) return '暂无数据';
    return moment(timeStamp).format(reg);
};

export const timeDuration = (start, end, key) => { // 时间周期，支持单独获取一个key的时间周期
    const momentDiff = moment(start).diff(moment(end), key, true);
    const timeDuration = moment.duration(momentDiff);
    return key ? momentDiff : {
        years: timeDuration.get('years'),
        months: timeDuration.get('months'),
        weeks: timeDuration.get('weeks'),
        days: timeDuration.get('days'),
        hours: timeDuration.get('hours'),
        minutes: timeDuration.get('minutes'),
        seconds: timeDuration.get('seconds'),
        milliseconds: timeDuration.get('milliseconds'),
    };
};
