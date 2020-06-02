var data = {
	defaultLang: "en",
	langItem: lang["en"],
	lang: lang,
	menu: false,
	currentItem: "join",
	sendError1: false,
	sendError2: false,
	sendError3: false,
	copySuccess: false,
	balanceError: false,
	quitError:false,
	ingError:false,
	lowerError:false,
	canPlay: false,
	recommendError:false,
	ethNumber: 1,
	quantity: 10,
	playerID: "",
	stage: 1,
	calm: false,
	redeem:0,
	langList: {
		en: "English",
		cn: "中文（繁体）",
	},
	tabData: {
		joinCount: [
			"",
			{
				"1 ETH": 1,
				"10 ETH": 10,
				"20 ETH": 20,
				"30 ETH": 30
			},
			{
				"5 ETH": 5,
				"10 ETH": 10,
				"30 ETH": 30,
				"50 ETH": 50
			},
			{
				"10 ETH": 10,
				"30 ETH": 30,
				"50 ETH": 50,
				"100 ETH": 100
			},
		],
		address:null,
		superiorID:null,
	},
	income: {
		unsettled: 0,
		gameReward: 0,
		statics: 0,
		dynamic: {
			total: 0,
			tillage: 0,
			merit: 0,	
		},
		limit: 0
	},
	team:{
		direct: {
			nodes: 0,
			achievement: 0
		},
		group: {
			nodes: 0,
			largeArea: 0,
			secondArea: 0,
			smallArea: 0
		},
	},
	otherData: {
		grade: 0,
		nextStage: 0,
		a5Node: 0
	},
	web3: null,
	web3Provider: null,
	contracts: {},
	superiorID: 0,
	ethBalance: 0,
	isPlay: true,
	investAccount:0,
	account: null,
	lastInvest:0,
	timeId: {
		"scoundDown": null,
		"show": null
	}
}