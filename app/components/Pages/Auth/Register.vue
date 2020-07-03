<template>
    <Page actionBarHidden="true">
        <StackLayout class="px-6 w-full" orientation="vertical" verticalAlignment="center">
            <Image
                    src="~/assets/images/shara_logo.png"
                    width="200"
                    horizontalAlignment="center"
            />
            <StackLayout class="w-full mt-20" orientation="vertical">
                <FlexboxLayout alignItems="center" class="w-full mt-5">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf007;" width="50"/>
                    <StackLayout>
                        <TextField autocapitalizationType="words"
                                   class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Full Name" v-model="form.name"/>
                    </StackLayout>
                </FlexboxLayout>

                <FlexboxLayout alignItems="center" class="w-full mt-5">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf0e0;" width="50"/>
                    <StackLayout>
                        <TextField autocapitalizationType="none"
                                   class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Email" keyboardType="email" v-model="form.email"/>
                    </StackLayout>
                </FlexboxLayout>

                <FlexboxLayout alignItems="center" class="w-full mt-5">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf098;" width="50"/>
                    <StackLayout>
                        <TextField class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Phone Number" keyboardType="phone" v-model="form.phone_number"/>
                    </StackLayout>
                </FlexboxLayout>

                <FlexboxLayout alignItems="center" class="w-full mt-5">
                    <Image class="fas t-36 text-gray-700 mr-3" src.decode="font://&#xf023;" width="50"/>
                    <StackLayout>
                        <TextField class="placeholder-gray-700 text-gray-700 w-full border-b-2 border-gray-700"
                                   fontSize="20" hint="Password" secure="true" v-model="form.password"/>
                    </StackLayout>
                </FlexboxLayout>
                <Button :text="button" @tap="register"
                        class="w-full text-center py-2 rounded-lg text-white bg-green-500 mt-5" fontSize="20"/>
                <Label @tap="$navigator.navigate('/login')" class="text-gray-700 mt-5 text-center" fontSize="20"
                       text="Already have an account? Sign in"></Label>
            </StackLayout>
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    phone_number: '',
                    password: ''
                },
                button: 'Register'
            }
        },
        mounted() {
            this.checkNoAuth()
        },
        methods: {
            register() {
                if (this.form.name === '' || this.form.email === '' || this.form.phone_number === '' || this.form.password === '') {
                    return this.$feedback.error({
                        title: 'Error',
                        message: 'All fields are needed',
                    });
                }
                this.button = 'Registering ...'
                const vm = this
                axios.post('register', this.$data.form)
                    .then(response => {
                        this.$store.dispatch('loginUser', response.data.data.token).then(_fn => {
                            vm.$navigator.navigate('/home', {clearHistory: true})
                            vm.form.email = ''
                            vm.form.name = ''
                            vm.form.phone_number = ''
                            vm.form.password = ''
                            vm.button = 'Register'
                        })
                    })
                    .catch(error => {
                        if (error.response.status === 400) {
                            this.$feedback.error({
                                title: 'Error',
                                message: error.response.data.message,
                            });
                        }
                        this.button = 'Register'
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
