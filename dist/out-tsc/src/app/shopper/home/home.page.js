import { __decorate } from "tslib";
import { Component } from '@angular/core';
let HomePage = /** @class */ (() => {
    let HomePage = class HomePage {
        constructor(api) {
            this.api = api;
            this.slideOpts = {
                slidesPerView: 4,
                speed: 400,
                freeMode: true
            };
            this.subcatSlideOpts = {
                slidesPerView: 3,
                initialSlide: 0,
                speed: 400,
                freeMode: true
            };
            this.prodSlideOpts = {
                slidesPerView: 3,
                initialSlide: 0,
                speed: 400,
                freeMode: true
            };
            this.cat_id = 0;
            this.subcat_id = 0;
            this.cartProd = {};
            this.favPrd = {};
            this.cartLength = 0;
            this.showLoad = 1;
            this.ProdImgUrl = "http://favr.coderpanda.tk/uploads/";
        }
        ngOnInit() {
            console.log('HomePage: ngOnInit');
            this.getAllCategories();
            this.getPopularProds();
            if (window.localStorage.getItem('cart')) {
                this.cartProd = JSON.parse(window.localStorage.getItem('cart'));
                this.cartTotal();
            }
        }
        getAllCategories() {
            var data = {
                offset: 0,
                limit: 100
            };
            this.api.getAllCats(data)
                .then(resp => {
                this.cats = resp;
            })
                .catch(err => {
            });
        }
        getPopularProds() {
            var data = {
                offset: 0,
                limit: 100
            };
            this.api.getPopularProds(data)
                .then(resp => {
                this.popProds = resp;
                this.getReccProds();
            })
                .catch(err => {
            });
        }
        getReccProds() {
            var data = {
                offset: 0,
                limit: 100
            };
            this.api.getReccProds(data)
                .then(resp => {
                this.showLoad = 0;
                this.reccProds = resp;
            })
                .catch(err => {
            });
        }
        selectCategory(cat_id) {
            this.cat_id = cat_id;
            this.subcat_id = 0;
            var data = {
                categoryId: this.cat_id,
                offset: 0,
                limit: 100
            };
            this.allProds = [];
            this.subcats = [];
            this.showLoad = 1;
            this.api.getSubcatByCat(data)
                .then(resp => {
                this.subcats = resp;
                // this.showLoad = 0;
                // console.log(resp);
            })
                .catch(err => {
            });
            this.api.getAllProductByCategory(data)
                .then(resp => {
                this.allProds = resp;
                this.showLoad = 0;
            })
                .catch(err => {
            });
        }
        selectSubcategory(subcat_id) {
            this.subcat_id = subcat_id;
            var data = {
                subcategoryId: this.subcat_id,
                offset: 0,
                limit: 100
            };
            this.allProds = [];
            this.showLoad = 1;
            this.api.getProdBySubcat(data)
                .then(resp => {
                this.allProds = resp;
                this.showLoad = 0;
            })
                .catch(err => {
            });
        }
        addProd(id, price, name) {
            if (this.cartProd[id]) {
                this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] + 1;
                this.cartProd[id]['unit_amount'] = price;
                this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
                this.cartProd[id]['name'] = name;
                this.cartProd[id]['product_id'] = id;
            }
            else {
                this.cartProd[id] = {};
                this.cartProd[id]['quantity'] = 1;
                this.cartProd[id]['unit_amount'] = price;
                this.cartProd[id]['total_amount'] = price * this.cartProd[id]['quantity'];
                this.cartProd[id]['name'] = name;
                this.cartProd[id]['product_id'] = id;
            }
            console.log(this.cartProd);
            this.cartTotal();
        }
        subProd(id) {
            if (this.cartProd[id]['quantity'] > 1) {
                this.cartProd[id]['quantity'] = this.cartProd[id]['quantity'] - 1;
            }
            else {
                delete this.cartProd[id];
            }
            console.log(this.cartProd);
            this.cartTotal();
        }
        favProd(id) {
            if (this.favPrd[id]) {
                delete this.favPrd[id];
            }
            else {
                this.favPrd[id] = 1;
            }
            console.log(this.favPrd);
        }
        cartTotal() {
            window.localStorage.setItem('cart', JSON.stringify(this.cartProd));
            this.cartLength = 0;
            for (var el in this.cartProd) {
                if (this.cartProd.hasOwnProperty(el)) {
                    this.cartLength += parseFloat(this.cartProd[el]['quantity']);
                }
            }
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
        })
    ], HomePage);
    return HomePage;
})();
export { HomePage };
//# sourceMappingURL=home.page.js.map