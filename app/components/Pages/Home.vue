<template>
    <Page>
        <ActionBar title="Shara[D]"/>
        <GridLayout class="mt-1 px-3">
            <PullToRefresh
                    @refresh="refreshList"
                    height="94%"
                    indicatorColor="#3489db"
                    indicatorFillColor="#fff000"
                    verticalAlignment="top"
            >
                <ListView @itemTap="onItemTap" class="list-group" for="order in orders">
                    <v-template>
                        <StackLayout orientation="horizontal">
                            <Image class="fas t-36 text-green-500 mr-3 w-2/12" src.decode="font://&#xf058;" width="30"/>
                            <StackLayout class="w-10/12 px-2" orientation="vertical">
                                <Label :text="`Order No: #${order.order_number}`" class="text-black" fontSize="20"/>
                                <FlexboxLayout justifyContent="space-between">
                                    <Label class="text-gray-500" fontSize="16" text="Order Date"/>
                                    <Label :text="order.created_at | humanReadable" class="text-gray-500"
                                           fontSize="16"/>
                                </FlexboxLayout>
                            </StackLayout>
                        </StackLayout>
                    </v-template>
                </ListView>
            </PullToRefresh>
            <fab
                    @tap="fabTap"
                    class="fab-button fas t-36"
                    icon="~/assets/images/plus.png"
                    rippleColor="#f1f1f1"
                    row="1"
            ></fab>
            <Button
                    text="Logout"
                    verticalAlignment="bottom"
                    @tap="logout"
                    class="mt-5 w-20 bg-red-400"
            />
        </GridLayout>
    </Page>
</template>

<script>
    import moment from 'moment'

    export default {
        data() {
            return {
                orders: []
            };
        },
        mounted() {
            this.checkAuth()
            this.getOrders()
        },
        methods: {
            getOrders() {
                axios.get('/history')
                    .then(response => {
                        this.orders = response.data
                        console.log('loaded')
                    })
            },
            fabTap() {
                prompt({
                    title: "Create Order",
                    message: "Order No",
                    okButtonText: "Create",
                    cancelButtonText: "Cancel",
                    defaultText: null,
                }).then(result => {
                    if (result.result) {
                        if (result.text === null) {
                            return this.$feedback.error({
                                title: 'Error',
                                message: 'All fields are needed',
                            });
                        } else {
                            axios.post('/order', {order_number: result.text, user_id: 1})
                                .then(response => {
                                    this.$feedback.success({
                                        title: 'Success',
                                        message: 'Order Added successfully',
                                    });
                                    this.orders.push(response.data)
                                })
                        }
                    }
                });
            },
            onItemTap: function (args) {
                console.log('Item with index: ' + args.index + ' tapped');
                console.log(args.item)
                this.$navigator.navigate('/order', {props: {context: args.item}})
            },
            refreshList(args) {
                const pullRefresh = args.object;
                this.getOrders()
                pullRefresh.refreshing = false;
            },
            message() {
                this.$feedback.success({
                    title: 'Success',
                    message: "I'm an OK message",
                });
            },
            checkAuth() {
                if (!this.$store.getters.isLoggedIn) {
                    this.$navigator.navigate('/login', {clearHistory: true})
                }
            },
            logout() {
                const vm = this
                this.$store.dispatch('logoutUser').then(_fn => {
                    vm.$navigator.navigate('/login', {clearHistory: true})
                })

            }
        },
        filters: {
            humanReadable(date) {
                return moment(date).format('MMM Do YYYY');
            }
        }
    };
</script>

<style lang="scss" scoped>

    .fab-button {
        height: 70;
        width: 70; /// this is required on iOS - Android does not require width so you might need to adjust styles
        margin: 15;
        background-color: #ff4081;
        horizontal-align: right;
        vertical-align: bottom;
    }
</style>
