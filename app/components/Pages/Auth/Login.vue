<template>
    <Page actionBarHidden="true">
        <StackLayout class="px-6 w-full" orientation="vertical" verticalAlignment="center">
            <Image
                    horizontalAlignment="center"
                    src="~/assets/images/shara_logo.png"
                    width="200"
            />
            <StackLayout class="w-full" orientation="vertical">
                <FlexboxLayout alignItems="center" class="w-full mt-32">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf0e0;" width="50"/>
                    <StackLayout>
                        <TextField class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Email" keyboardType="email" v-model="form.email"/>
                    </StackLayout>
                </FlexboxLayout>

                <FlexboxLayout alignItems="center" class="w-full mt-5">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf023;" width="50"/>
                    <StackLayout>
                        <TextField class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Password" secure="true" v-model="form.password"/>
                    </StackLayout>
                </FlexboxLayout>
                <Button :text="button" @tap="login"
                        class="w-full text-center py-2 rounded-lg text-white bg-green-500 mt-5" fontSize="20"/>
                <Label @tap="$navigator.navigate('/register')" class="text-gray-700 mt-5 text-center" fontSize="20"
                       text="Don't have an account? Sign up"></Label>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                button: 'Login'
            }
        },
        mounted() {
            this.checkNoAuth()
        },
        methods: {
            login() {
                this.button = 'Logging In ...'
                const vm = this
                axios.post('login', this.$data.form)
                    .then(response => {
                        this.$store.dispatch('loginUser', response.data.data.token).then(_fn => {
                            vm.$navigator.navigate('/home', {clearHistory: true})
                            vm.form.email = ''
                            vm.form.password = ''
                            vm.button = 'Login'
                        })
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            this.$feedback.error({
                                title: 'Error',
                                message: error.response.data.message,
                            });
                        }
                        this.button = 'Login'
                    })
            },
            checkNoAuth() {
                if (this.$store.getters.isLoggedIn) {
                    this.$navigator.navigate('/home', {clearHistory: true})
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
