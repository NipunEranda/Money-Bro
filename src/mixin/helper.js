export default {
    methods: {
        objectToArray(object) {
            const array = [];
            Object.keys(object).forEach((id) => {
                array.push(object[id]);
            });
            return array;
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