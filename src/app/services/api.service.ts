import { Injectable } from '@angular/core';

declare var require: any;
const axios = require('axios').default;
// import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json'; // for POST requests
// const apiUrl = "http://favrapi.coderpanda.tk/api/";
const apiUrl = "http://api.favr.ie/api/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	  constructor() {
  		var token = localStorage.getItem('token');
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
      }
  	}

    getCountryList(){
      return axios.get('/assets/jsons/phonecodes.json')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    search(data){
      return axios.post(apiUrl+'product/search', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getPages(data){
      return axios.post(apiUrl+'pages/get', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }
    getFaqs(){
      return axios.get(apiUrl+'faqs/get')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

  	signupUser(data){
  		return axios.post(apiUrl+'user/register', data)
      	.then(function(response){
	        return response.data;
      	})
      	.catch(function(err){
          return Promise.reject(err);
      	});
  	}

    forgPw(data){
      return axios.post(apiUrl+'password/change', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    resetPw(data){
      return axios.post(apiUrl+'password/reset', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }





  	loginUser(data){
  		return axios.post(apiUrl+'user/login', data)
      	.then(function(response){
	        return response.data;
      	})
      	.catch(function(err){
          return Promise.reject(err);
      	});
  	}

    sendOtp(data){
      return axios.post(apiUrl+'user/send_otp', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    verifyOtp(data){
      return axios.post(apiUrl+'user/verify_otp', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getUserDetails(){
      return axios.get(apiUrl+'users')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }


    switchRole(){
      return axios.put(apiUrl+'user/switch/profile')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    updateRole(data){
      return axios.post(apiUrl+'user/update/role', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    saveUserProduct(data){
      return axios.post(apiUrl+'user/save/product', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }



    getAllCats(data){
      return axios.post(apiUrl+'category/getall', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getAllProductByCategory(data){
      return axios.post(apiUrl+'product/get/by/category', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getPopularProds(data){
      return axios.post(apiUrl+'product/get/popular/area', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getSavedItems(data){
      return axios.post(apiUrl+'user/save/get', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getReccProds(data){
      return axios.post(apiUrl+'product/get/recomended', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          return Promise.reject(err);
        });
    }

    getSubcatByCat(data){
      return axios.post(apiUrl+'subcategory/get/by/category', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getProdBySubcat(data){
      return axios.post(apiUrl+'product/get/by/subcategory', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    placeOrder(data){
      return axios.post(apiUrl+'order/book', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getOrderById(data){
      return axios.post(apiUrl+'order/get/by/id', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    updateOrderRadius(data){
      return axios.put(apiUrl+'order/update/radius', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getAcceptedDroppers(data){
      return axios.post(apiUrl+'user/get/droppers', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    addUserPolling(data){
      return axios.post(apiUrl+'polling/add', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }



    getShopperRequests(data){
      return axios.post(apiUrl+'user/get/shoppers', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    acceptShopperOffer(data){
      return axios.post(apiUrl+'order/accept/shopper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    acceptDropper(data){
      return axios.post(apiUrl+'order/accept', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }
    updateItemStatus(data){
      return axios.post(apiUrl+'orderdetail/update/status', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    updateOrderStatus(status, data){
      if(status == 3){
        var loc_url = "status/to/purchasing";
      }
      if(status == 4){
        var loc_url = "status/to/purchased";
      }
      if(status == 5){
        var loc_url = "status/to/delivery";
      }
      if(status == 6){
        var loc_url = "order/complete";
      }

      return axios.post(apiUrl+loc_url, data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });


    }

    getAppConfig(){
      return axios.get(apiUrl+'config/get')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getAllPlans(){
      return axios.get(apiUrl+'plan/all')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    doPayment(data){
      return axios.post(apiUrl+'do_payment', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    getFavrTransacList(data){
      return axios.post(apiUrl+'transaction/get/by/user', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getAllOrder(data){
      return axios.post(apiUrl+'order/get/by/user', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getAllDropperOrder(data){
      return axios.post(apiUrl+'order/get/by/dropper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    notifyForOrder(){
      return axios.post(apiUrl+'notify/for/order')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }


    saveDropperRating(data){
      return axios.post(apiUrl+'add/rating/to/dropper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    saveShopperRating(data){
      return axios.post(apiUrl+'add/rating/to/shopper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    cancelOrder(data){
      return axios.post(apiUrl+'order/cancel', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    cancelOrderBefore(data){
      return axios.post(apiUrl+'order/cancel/before', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    blockUser(data){
      return axios.post(apiUrl+'user/block', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    addAddress(data){
      return axios.post(apiUrl+'add/user/location', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getAddress(data){
      return axios.post(apiUrl+'user/location', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    sendMessage(data){
      return axios.post(apiUrl+'send/messages', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getMessages(data){
      return axios.post(apiUrl+'get/messages', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    sendMessageToAdmin(data){
      return axios.post(apiUrl+'send/messages/to/admin', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    changeDp(data){
      return axios.post(apiUrl+'change/dp', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    updateUser(data){
      return axios.put(apiUrl+'user/update/profile', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    getMessagesFromAdmin(data){
      return axios.post(apiUrl+'get/messages/from/admin', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    setUserFbToken(data){
      return axios.post(apiUrl+'user/set/fb/token', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    removeDropperRequest(data){
      return axios.post(apiUrl+'dropper/request/remove', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }
    reorder(data){
      return axios.post(apiUrl+'reorder', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

    logout(){
      return axios.post(apiUrl+'user/logout')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        return Promise.reject(err);
      });
    }

}