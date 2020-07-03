<template>
    <Page>
        <ActionBar :title="`Order #${order.order_number}`">
            <NavigationButton @tap="$navigator.back" android.systemIcon="ic_menu_back" text="Go back"/>
        </ActionBar>
        <GridLayout class="mt-1 px-3">

            <ListView @itemTap="onItemTap" class="list-group" for="product in order.product" height="100%"
                      v-if="order.product.length > 0"
                      verticalAlignment="top">
                <v-template>
                    <StackLayout orientation="horizontal">
                        <Image class="fas t-36 text-green-500 mr-3 w-2/12" src.decode="font://&#xf058;" width="30"/>
                        <StackLayout class="w-10/12 px-2" orientation="vertical">
                            <FlexboxLayout justifyContent="space-between">
                                <Label :text="product.name" class="text-black" fontSize="18" textWrap="true"/>
                                <Label :text="`KES: ${product.price}`" class="text-black" fontSize="18"
                                       textWrap="true"/>
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="space-between">
                                <Label class="text-gray-500" fontSize="16" text="Product UOM"/>
                                <Label :text="product.uom" class="text-gray-500" fontSize="16"/>
                            </FlexboxLayout>
                        </StackLayout>
                    </StackLayout>
                </v-template>
            </ListView>
            <StackLayout class="mt-10" v-else>
                <Label class="text-danger text-center" fontSize="22" text="No Products here yet !"/>
            </StackLayout>
            <fab
                    @tap="fabTap"
                    class="fab-button fas t-36"
                    icon="~/assets/images/plus.png"
                    rippleColor="#f1f1f1"
                    row="1"
            ></fab>
        </GridLayout>
    </Page>
</template>

<script>
    import moment from "moment";

    export default {
        name: "Order",
        props: ['context'],
        // data() {
        //     return {
        //         products: []
        //     }
        // },
        mounted() {
            this.checkAuth()
            // this.getProducts()

        },
        methods: {
            checkAuth() {
                if (!this.$store.getters.isLoggedIn) {
                    this.$navigator.navigate('/login', {clearHistory: true})
                }
            },
            onItemTap: function (args) {
                console.log('Item with index: ' + args.index + ' tapped');
            },
            // getProducts(){
            //     axios.get('/product')
            //         .then(response =>{
            //             this.products = response.data
            //         })
            // },
            fabTap() {
                prompt({
                    title: "Create Order Product",
                    message: "Product name, Price, uom",
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
                            const data = result.text.split(',')
                            if (data.length !== 3) {
                                return this.$feedback.error({
                                    title: 'Error',
                                    message: 'enter product name, price, uom',
                                });
                            } else {
                                axios.post('/product', {
                                    name: data[0].trim(),
                                    price: data[1].trim(),
                                    uom: data[2].trim(),
                                    order_id: this.order.id
                                })
                                    .then(response => {
                                        this.$feedback.success({
                                            title: 'Success',
                                            message: 'Order Added successfully',
                                        });
                                        this.context.product.push(response.data)
                                    })
                            }
                        }
                    }
                });
            },
        },
        filters: {
            humanReadable(date) {
                return moment(date).format('MMM Do YYYY');
            }
        },
        computed: {
            order() {
                return this.context || {}
            }
        }
    }
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
