var contract_address = "0x8c9836f3CadB3754CcC73B4EdA8A6188b572352C";
var abi = [{"constant":true,"inputs":[],"name":"lastInvestTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getGameInfo","outputs":[{"name":"","type":"uint256[13]"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stageMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"investMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"outReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"userAddr","type":"address"}],"name":"getStaticReward","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getUserInfo","outputs":[{"name":"","type":"uint256[15]"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"redeemCancel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"redeemQuit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"investMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"a5Count","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"calc","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"redeemRatio","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"rates","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pid","type":"uint256"}],"name":"investIn","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"uid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"}];var invest_info = {"contractName":"IATKGame","ast":{},"legacyAST":{},"compiler":{},"networks":{"1":{"events":{},"links":{},"address":contract_address,"transactionHash":"0x09c64646c380a79a7d0ba9e084bcd33869247dbaadeef4cdae954d3ffb90387b"}},"schemaVersion":"3.0.12","updatedAt":"2020-03-08T03:48:00.711Z","devdoc":{"methods":{}},"userdoc":{"methods":{}},"abi":abi};var game_info = {"contractName":"ATKGame","ast":{},"legacyAST":{},"compiler":{},"networks":{"1":{"events":{},"links":{},"address":"0xC64DB6b3a0D0d8B8C7851E2d182d7647DC69272B","transactionHash":"0xabcb2bd3ad4682802df20b7f6a82e2750f4c5077eb1f8cbddcb39c4769216d8b"}},"schemaVersion":"3.0.12","updatedAt":"2020-03-08T03:48:00.711Z","devdoc":{"methods":{}},"userdoc":{"methods":{}},"abi":abi};
var app = new Vue({
	el: "#app",
	data: data,
	methods: {
		setCookie: function(name, value) {
			var Days = 7;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		getCookie: function(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
			if(arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		},
		initLang: function() {
			var _this = this;
			var value = this.getCookie("lang");
			for(var key in _this.lang) {
				if(key == value) {
					_this.langItem = _this.lang[key];
					break;
				}

			}
		},
		changeLang: function(index) {
			this.setCookie("lang", index);
			this.initLang();
			this.menu = false
		},
		displayMenu: function() {
			this.menu = !this.menu;
		},
		changeTab: function(index) {
			this.currentItem = index
		},
		hidePop: function() {
			this.sendError1 = false;
			this.sendError2 = false;
			this.sendError3 = false;
			this.copySuccess = false;
			this.balanceError = false;
			this.canPlay = false;
			this.quitError=false;
			this.ingError=false;
			this.lowerError=false;
			this.recommendError=false;
		},
		getQuantity: function(val) {
			this.quantity = val;
		},
		init: async function() {
			this.initLang();
			this.initSuperiorID();
			return await this.initWeb3();
		},
		initWeb3: async function() {
			if(window.ethereum) {
				window.web3 = new Web3(ethereum);
				try {
					await ethereum.enable();
					this.web3Provider = ethereum;
				} catch(error) {}
			} else if(window.web3) {
				this.web3Provider = web3.currentProvider;
				window.web3 = new Web3(web3.currentProvider);
			} else {
				console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
			}
			this.checkAccount();
			return this.initGame();
		},

		initGameData: function() {
			var _this = this;
			_this.getEthBalance();
			_this.getUserInfo();
			_this.getGameInfo();

			setInterval(function() {
				_this.getGameInfo();
				_this.getUserInfo();
				_this.getEthBalance();

			}, 30000);

		},
		copy: function() {
			var _this = this;
			var clipboard = new ClipboardJS('.btn');
			clipboard.on('success', function(e) {
				e.clearSelection();
				_this.copySuccess = true;
			});

			clipboard.on('error', function(e) {
				alert("copy failed!")
			});
		},
		initGame: function() {
			var _this = this;
			_this.contracts.game = TruffleContract(game_info);
			_this.contracts.game.setProvider(_this.web3Provider);
			_this.contracts.invest = TruffleContract(invest_info);
			_this.contracts.invest.setProvider(_this.web3Provider);
			_this.initGameData();
		},
		initSuperiorID: function() {
			var reg = new RegExp('(^|&)' + 'id' + '=([^&]*)(&|$)');
			var r = window.location.search.substr(1).match(reg);
			if(r != null) {
				//console.log(decodeURIComponent(r[2]) + " initSuperiorID");
				this.superiorID = parseInt(decodeURIComponent(r[2]));
			} else {
				this.superiorID = 0;
				//console.log("initSuperiorID = 0");
			}
		},

		getEthBalance: function() { 
			var _this = this;
			var account = web3.eth.coinbase;
			web3.eth.getBalance(account, function(error, result) {
				_this.ethBalance = result / 10 ** 18;
				//console.log(result + " at getEthBalance")
			})
		},

		investIn: function() { 

			var _this = this,
				amount = parseFloat(this.quantity);
            if(_this.superiorID==0){
            	_this.recommendError = true;
            	return false;
            }else if(amount > _this.ethBalance) {
				_this.balanceError = true;
				return false;
			} else if(_this.isPlay == false) {
				if(_this.income.limit > 0 && _this.redeem == 0) {
					_this.canPlay = true;
				    return false;
				}else {
					if(_this.redeem == 1) {
						_this.quitError=true;
						return false;
					} else {
						_this.ingError=true;
						return false;
					}
				}
			} else if(amount < _this.lastInvest) {
				_this.lowerError=true;
				return false;
			}

			if(_this.stage == 1) {
				if(amount < 1 || amount > 30) { 
					_this.sendError1 = true;
					return false;
				}
			} else if(_this.stage == 2) {
				if(amount < 5 || amount > 50) { 
					_this.sendError2 = true;
					return false;
				}
			} else if(_this.stage == 3) {
				if(amount < 10 || amount > 100) { 
					_this.sendError3 = true;
					return false;
				}
			}

			var account = web3.eth.coinbase;
			_this.contracts.invest.deployed().then(function(instance) {
				contract = instance;
				return contract.investIn.sendTransaction(_this.superiorID, {
					from: account,
					value: amount * 10 ** 18
				})
			}).then(function(result) {
				console.log(result + " at investIn");
				setTimeout(function() {
					_this.getEthBalance();
					_this.getGameInfo();
					_this.getUserInfo();
				}, 5000);

			}).catch(function(err) {
				console.log(err.message + " at investIn error");
			});
		},

		getUserInfo: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.game.deployed().then(function(instance) {
				contract = instance;
				return contract.getUserInfo(account)
			}).then(function(result) {
				_this.income.unsettled = result[0][0] / 10 ** 18;
				_this.income.gameReward = result[0][1] / 10 ** 18;
				_this.income.limit = result[0][2] / 10 ** 18;
				
				_this.income.statics = result[0][3] / 10 ** 18;
				_this.redeem = result[0][4];
				_this.lastInvest = result[0][7] / 10 ** 18;
				
				_this.income.dynamic.tillage = result[0][5] / 10 ** 18;
				_this.income.dynamic.merit = result[0][6] / 10 ** 18;
				_this.income.dynamic.total = result[0][5] / 10 ** 18 + result[0][6] / 10 ** 18;

				_this.tabData.address = account;
				_this.playerID = parseInt(result[1]);
				_this.tabData.superiorID = parseInt(result[2]);

				
				_this.otherData.grade = parseInt(result[3]);
				_this.TimeDisplay("coundDown", result[4]);

				//console.log(result + " at getUserInfo");
			}).catch(function(err) {
				console.log(err.message + " at getUserInfo error");
			});
		},
		getGameInfo: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.game.deployed().then(function(instance) {
				return instance.getGameInfo(account)
			}).then(function(result) {
				 //console.log(result + " at getGameInfo");
				_this.team.direct.nodes = parseInt(result[0][0]);
				_this.team.direct.achievement = result[0][1] / (10 ** 18);
				_this.team.group.nodes = parseInt(result[0][2]);

				_this.team.group.largeArea = result[0][4] / (10 ** 18);
				_this.team.group.smallArea = result[0][5] / (10 ** 18);
				_this.stage = parseInt(result[0][6]);
				
				
				_this.redeem = parseInt(result[0][12])

				_this.calm = result[2];
				_this.isPlay = result[3];
				

			}).catch(function(err) {
				console.log(err.message + " at getGameInfo Error");
			});
		},
		TimeDisplay: function(id, totalSeconds) {
			var _this = this;
			var hours = Math.floor(totalSeconds / (60 * 60));
			if(hours < 10) {
				hours = "0" + hours;
			}
			var modulo = totalSeconds % (60 * 60);
			var minutes = Math.floor(modulo / 60);
			if(minutes < 10) {
				minutes = "0" + minutes;
			}
			modulo = modulo % 60;
			var seconds = modulo % 60;
			if(seconds < 10) {
				seconds = "0" + seconds;
			}
			$("#" + id).html("<font>" + hours + "</font>:<font>" + minutes + "</font>:<font>" + seconds + "</font>");
			if(_this.timeId[id]) clearTimeout(_this.timeId[id]);
			if(totalSeconds > 0) {
			_this.timeId[id] =	setTimeout(function() {
					_this.TimeDisplay(id, --totalSeconds);
				}, 1000);
			}
		},

		calc: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.invest.deployed().then(function(instance) {
				return instance.calc.sendTransaction({
					from: account
				})
			}).then(function(result) {
				console.log(result + " at calc");
				setTimeout(function() {
					_this.getGameInfo();
					_this.getUserInfo();

				}, 3000);
			}).catch(function(err) {
				console.log(err.message + " at calc error");
			});
		},

		outReward: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.invest.deployed().then(function(instance) {
				return instance.outReward.sendTransaction({
					from: account
				})
			}).then(function(result) {
				console.log(result + " at outReward");

				setTimeout(function() {
					_this.getGameInfo();
					_this.getUserInfo();
				}, 3000);
			}).catch(function(err) {
				console.log(err.message + " at outReward error");
			});
		},
		redeemQuit: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.game.deployed().then(function(instance) {
				return instance.redeemQuit.sendTransaction({
					from: account
				})
			}).then(function(result) {
				console.log(result + " at redeemQuit");

				setTimeout(function() {
					_this.getGameInfo();
					_this.getUserInfo();
				}, 3000);
			}).catch(function(err) {
				console.log(err.message + " at redeemQuit error");
			});
		},
		redeemCancel: function() { 
			var _this = this,
				account = web3.eth.coinbase;
			_this.contracts.game.deployed().then(function(instance) {
				return instance.redeemCancel.sendTransaction({
					from: account
				})
			}).then(function(result) {
				console.log(result + " at redeemCancel");

				setTimeout(function() {
					_this.getGameInfo();
					_this.getUserInfo();
				}, 3000);
			}).catch(function(err) {
				console.log(err.message + " at redeemCancel error");
			});
		},

		checkAccount: function() {
			var _this = this;
			_this.account = web3.eth.coinbase;
			setInterval(function() {
				if(_this.account != web3.eth.coinbase) {
					_this.account = web3.eth.coinbase;
					window.location.reload();
				}
			}, 3000);
		},
	},
	computed: {
		formatURL: function() {
			var url = window.location.href;
			if(url.indexOf("?") != -1) {
				var offest = url.indexOf("?");
				var newUrl = url.substr(0, offest);
				return newUrl + "?id=" + this.playerID;
			} else {
				return url + "?id=" + this.playerID;
			}
		}
	},
	mounted: function() {
		var value = this.getCookie("lang");
		if(!value) {
			this.setCookie("lang", this.defaultLang);
		}
		this.init();
	}
})