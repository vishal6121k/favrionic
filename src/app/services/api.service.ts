import { Injectable } from '@angular/core';

declare var require: any;
const axios = require('axios').default;
// import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json'; // for POST requests
const apiUrl = "http://favrapi.coderpanda.tk/api/";

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
          console.log(err);
          return "Err";
        });
    }

  	signupUser(data){
  		return axios.post(apiUrl+'user/register', data)
      	.then(function(response){
	        return response.data;
      	})
      	.catch(function(err){
	        console.log(err);
	        return "Err";
      	});
  	}



  	loginUser(data){
  		return axios.post(apiUrl+'user/login', data)
      	.then(function(response){
	        return response.data;
      	})
      	.catch(function(err){
	        console.log(err);
	        return "Err";
      	});
  	}

    sendOtp(data){
      return axios.post(apiUrl+'user/send_otp', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    verifyOtp(data){
      return axios.post(apiUrl+'user/verify_otp', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    getUserDetails(){
      return axios.get(apiUrl+'users')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }


    switchRole(){
      return axios.put(apiUrl+'user/switch/profile')
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    saveUserProduct(data){
      return axios.post(apiUrl+'user/save/product', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }



    getAllCats(data){
      return axios.post(apiUrl+'category/getall', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    getAllProductByCategory(data){
      return axios.post(apiUrl+'product/get/by/category', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    getPopularProds(data){
      return axios.post(apiUrl+'product/get/popular/area', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    getReccProds(data){
      return axios.post(apiUrl+'product/get/recomended', data)
        .then(function(response){
          return response.data;
        })
        .catch(function(err){
          console.log(err);
          return "Err";
        });
    }

    getSubcatByCat(data){
      return axios.post(apiUrl+'subcategory/get/by/category', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getProdBySubcat(data){
      return axios.post(apiUrl+'product/get/by/subcategory', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    placeOrder(data){
      return axios.post(apiUrl+'order/book', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getOrderById(data){
      return axios.post(apiUrl+'order/get/by/id', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    updateOrderRadius(data){
      return axios.put(apiUrl+'order/update/radius', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getAcceptedDroppers(data){
      return axios.post(apiUrl+'user/get/droppers', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    addUserPolling(data){
      return axios.post(apiUrl+'polling/add', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }



    getShopperRequests(data){
      return axios.post(apiUrl+'user/get/shoppers', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }


    acceptShopperOffer(data){
      return axios.post(apiUrl+'order/accept/shopper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }


    acceptDropper(data){
      return axios.post(apiUrl+'order/accept', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }
    updateItemStatus(data){
      return axios.post(apiUrl+'orderdetail/update/status', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
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
        console.log(err);
        return "Err";
      });


    }

    getAppConfig(){
      return axios.get(apiUrl+'config/get')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getAllPlans(){
      return axios.get(apiUrl+'plan/all')
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }


    doPayment(data){
      return axios.post(apiUrl+'do_payment', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }


    getFavrTransacList(data){
      return axios.post(apiUrl+'transaction/get/by/user', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getAllOrder(data){
      return axios.post(apiUrl+'order/get/by/user', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }


    saveDropperRating(data){
      return axios.post(apiUrl+'add/rating/to/dropper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    saveShopperRating(data){
      return axios.post(apiUrl+'add/rating/to/shopper', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    cancelOrder(data){
      return axios.post(apiUrl+'order/cancel', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    blockUser(data){
      return axios.post(apiUrl+'user/block', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    addAddress(data){
      return axios.post(apiUrl+'add/user/location', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

    getAddress(data){
      return axios.post(apiUrl+'user/location', data)
      .then(function(response){
        return response.data;
      })
      .catch(function(err){
        console.log(err);
        return "Err";
      });
    }

}