import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FavrPage = /** @class */ (() => {
    let FavrPage = class FavrPage {
        constructor(api, stripe) {
            this.api = api;
            this.stripe = stripe;
            this.priceSlideOpts = {
                slidesPerView: 3,
                initialSlide: 0,
                speed: 400,
                freeMode: true
            };
            this.showPage = 0;
            this.selectedPlan = 0;
            this.buyFavrPop = 0;
            this.favrHistPop = 0;
            this.cardModel = {};
            this.payMsg = "";
            this.payPopOpen = 0;
        }
        ngOnInit() {
            this.config = JSON.parse(window.localStorage.getItem('config'));
            this.getUserDetails();
            this.getAllPlans();
            this.getFavrTransacList();
        }
        getAllPlans() {
            this.api.getAllPlans()
                .then(resp => {
                this.plans = resp;
                // this.showPage = 1;
            })
                .catch(err => {
            });
        }
        setPlan(credit, price) {
            this.selectedPlanCredit = credit;
            this.selectedPlanPrice = price;
        }
        getUserDetails() {
            this.api.getUserDetails()
                .then(resp => {
                this.userDets = resp;
                this.showPage = 1;
            })
                .catch(err => {
            });
        }
        initPayment() {
            this.payPopOpen = 1;
            this.payMsg = "Initiating Payment";
            this.stripe.setPublishableKey('pk_test_THB9B7zl6X8Y7QSJPoZ0Ly1U00SYpJxH7s');
            let card = this.cardModel;
            this.stripe.createCardToken(card)
                .then(token => {
                console.log(token.id);
                var data = {
                    stripeToken: token.id,
                    plan_id: this.selectedPlan
                };
                this.payMsg = "Receiving Payment";
                this.api.doPayment(data)
                    .then(resp => {
                    // console.log(resp);
                    if (resp.response.purchase_transactions.request_status == "succeeded") {
                        // alert('Added Credit');
                        this.payMsg = "Payment Successful. Updating Favr Balance.";
                        this.getUserDetails();
                        setTimeout(() => {
                            this.payPopOpen = 0;
                        }, 2000);
                    }
                    else {
                        this.payMsg = "Payment Failed. Please Try again.";
                        // alert('Failed');
                        setTimeout(() => {
                            this.payPopOpen = 0;
                        }, 2000);
                    }
                })
                    .catch(err => {
                    console.log(err);
                });
            })
                .catch(error => {
                console.error(error);
                this.payMsg = error;
                setTimeout(() => {
                    this.payPopOpen = 0;
                }, 2000);
                // alert(error);
                // alert(error);
            });
        }
        getFavrTransacList() {
            // getFavrTransacList
            var data = {
                offset: 0,
                limit: 1000
            };
            this.api.getFavrTransacList(data)
                .then(resp => {
                this.favTrans = resp;
            })
                .catch(err => {
                console.log(err);
            });
        }
    };
    FavrPage = __decorate([
        Component({
            selector: 'app-favr',
            templateUrl: './favr.page.html',
            styleUrls: ['./favr.page.scss'],
        })
    ], FavrPage);
    return FavrPage;
})();
export { FavrPage };
//# sourceMappingURL=favr.page.js.map