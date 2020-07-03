export function initializer(store) {
    // ? before a request is made start the nprogress
    axios.interceptors.request.use((config) => {
        config.headers['Content-Type'] = 'application/json';
        // console.log('Starting Request', config)
        if (store.getters.isLoggedIn) {
            config.headers['Authorization'] = `Bearer ${store.state.token}`
        }
        return config;
    });

    axios.interceptors.response.use((response) => response);

    axios.defaults.baseURL = 'https://shara-api.herokuapp.com/api/v1';
}
