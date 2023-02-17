import moment from 'moment';

export default {
    methods: {
        objectToArray(object) {
            const array = [];
            Object.keys(object).forEach((id) => {
                array.push(object[id]);
            });
            return array;
        },
        currentDateTime() {
            return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        },
        currentDateTimeCustomFormat(format) {
            return moment(new Date()).format(format);
        },
        convertDateString(date) {
            return (new Date(date)).toString().split(" ").splice(0, 5).join(" ");
        },
        convertDateType1(date) {
            // Aug 4th 22
            return moment(new Date(date)).format("MMM Do YY");
        },
        handleError(e) {
            let response = { error: false, data: null };
            if (e.response) {
                if (e.response.data.auth == 'no') {
                    response.error = true;
                    response.data = 'Access Denied';
                } else {
                    if (e.response.data.data != null) {
                        if (e.response.data.includes('jwt expired')) {
                            store.dispatch("logout");
                        } else {
                            response.error = true;
                            response.data = e.response.data ? e.response.data : e;
                        }
                    } else {
                        response.error = true;
                        response.data = 'Something went wrong.'
                    }
                }
            } else
                response = e;
            return response;
        }
    }
}