import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.prod.min.js";

//#region 預設一個modal變數
/** 產品的Modal */
let productModal = ''
/** 刪除提示的Modal */
let delProductModal = ''
/** 假資料 */
const fakeData = [
    {
        category: "甜甜圈",
        content: "尺寸：14x14cm",
        description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
        id: "-L9tH8jxVb2Ka_DYPwng",
        is_enabled: 1,
        origin_price: 150,
        price: 99,
        title: "草莓莓果夾心圈",
        unit: "個",
        num: 10,
        imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        imagesUrl: [
            "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
            "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        ]
    },
    {
        category: "蛋糕",
        content: "尺寸：6寸",
        description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
        id: "-McJ-VvcwfN1_Ye_NtVA",
        is_enabled: 16,
        origin_price: 1000,
        price: 900,
        title: "蜂蜜檸檬蛋糕",
        unit: "個",
        num: 1,
        imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
        imagesUrl: [
            "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
        ]
    },
    {
        category: "蛋糕",
        content: "尺寸：6寸",
        description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
        id: "-McJ-VyqaFlLzUMmpPpm",
        is_enabled: 1,
        origin_price: 700,
        price: 600,
        title: "暗黑千層",
        unit: "個",
        num: 15,
        imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        imagesUrl: [
            "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
            "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
        ]
    }
]
//#endregion

const app = createApp({
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "larrylinr5",

            products: [],
            tempProduct: {},
            isNew: false
        };
    },
    methods: {
        //檢查是否為管理者
        checkAdmin() {
            axios
                .post(`${this.url}/api/user/check`)
                // 成功的結果
                .then((response) => {
                    if (response.data.success) this.getProducts();
                })
                // 失敗的結果
                .catch((error) => {
                    alert('非管理權限OR其他api查詢失敗狀況');
                    window.location = "index.html";
                });
        },
        //取得後臺產品列表
        getProducts() {
            axios
                .get(`${this.url}/api/${this.path}/admin/products`)
                // 成功的結果
                .then((response) => {
                    if (response.data.success) {
                        this.products = response.data.products;
                    }
                })
                // 失敗的結果
                .catch((error) => {
                    alert('取得後臺產品列表失敗');
                });
        },
        //在暫存產品物件內建立 imagesUrl多圖陣列
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
        //新增產品
        createProduct() {
            console.log()
            axios['post'](`${this.url}/api/${this.path}/admin/product`, { data: this.tempProduct })
                // 成功的結果
                .then((response) => {
                    //若成功新增
                    if (response.data.success) {
                        //彈出成功新增訊息
                        alert('新增成功');
                        //關閉Modal
                        productModal.hide();
                        //重新抓畫面的List
                        this.getProducts();
                        //清除tempProduct
                        this.RemoveTempProduct()
                    }
                })
                // 失敗的結果
                .catch((err) => {
                    alert('新增產品失敗');
                })
        },
        //編輯選取到的產品
        editProduct() {
            axios['put'](`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
                // 成功的結果
                .then((response) => {
                    //若成功編輯
                    if (response.data.success) {
                        //彈出成功編輯訊息
                        alert('編輯成功');
                        //關閉Modal
                        productModal.hide();
                        //重新抓畫面的List
                        this.getProducts();
                        //清除tempProduct
                        this.RemoveTempProduct()
                    }
                })
                // 失敗的結果
                .catch((err) => {
                    alert('編輯產品失敗');
                })
        },
        //刪除選取到的產品
        deleteProduct() {
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
                // 成功的結果
                .then((response) => {
                    //若成功刪除
                    if (response.data.success) {
                        //彈出成功刪除訊息
                        alert(response.data.message);
                        //關閉Modal
                        delProductModal.hide();
                        //重新抓畫面的List
                        this.getProducts();
                        //清除tempProduct
                        this.RemoveTempProduct()
                    }

                })
                // 失敗的結果
                .catch((err) => {
                    alert('刪除產品失敗');
                })

        },
        //清空暫存的產品
        RemoveTempProduct() {
            this.tempProduct = {}
        },
        //開啟Modal
        openModal(isNew, item) {
            //新增
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                    //標題
                    title: '',
                    //分類
                    category: '',
                    //單位
                    unit: '',
                    //
                    origin_price: '',
                    //售價
                    price: '',
                    //產品描述
                    description: '',
                    //說明內容
                    content: '',
                    //是否啟用
                    is_enabled: false
                };
                this.tempProduct = fakeData[0]
                this.isNew = true;
                productModal.show();
            }
            //編輯
            else if (isNew === 'edit') {
                this.isNew = false;
                this.tempProduct = { ...item };
                productModal.show();
            }
            //刪除
            else if (isNew === 'delete') {
                this.isNew = false;
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
    },
    created() {
        //存放token 只需要設定一次
        const tempToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)larryToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1"
        );
        //axios預設headers
        axios.defaults.headers.common["Authorization"] = tempToken;

        this.checkAdmin()
    },
    mounted() {
        //生成Modal元件
        productModal = new bootstrap.Modal(document.querySelector('#productModal'))
        //生成Modal元件
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
    },
});

app.mount("#app");
