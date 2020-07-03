<template>
  <Navigator :defaultRoute="isLoggedIn ? '/home' : '/login'"/>
</template>

<script >
  export default {
      computed: {
          isLoggedIn() {
              return this.$store.getters.isLoggedIn
          }
      },
      created() {
          axios.interceptors.response.use(null, (error) => {
              if (error.response) {
                  if (error.response.status === 401) {
                      this.$navigator.navigate('/login', {clearHistory: true})
                  }
                  if (error.response.status === 500 || error.response.status === 502) {
                      this.$feedback.error({
                          title: 'Error',
                          message: 'AN Internal Error occurred',
                      });
                  }
                  if (error.response.status === 404) {
                      this.$feedback.error({
                          title: 'Error',
                          message: 'Resource not found',
                      });
                  }
                  // console.log(error.response)
              } else if (error.request) {
                  // console.log(error.request);
                  // ? No Internet
              } else {
                  // ! no internet
              }
              // console.log(error);
              return Promise.reject(error);
          });

          //middleware

      }
  }
</script>

<style scoped>

</style>
