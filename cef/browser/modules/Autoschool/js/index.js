var GovPedMenu = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	nameact: "Ашотик",
	fisttext: "Тест на пидораса ебаного если ты не прошёл его то ты просто конченый уебан по этому давай быстро",
	twutext: "Хз чё написать",
	buttext1: "Купить цемент",
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		buylic: function(id) {
			this.active = false;
			this.style = 0;
			cef.emit("cef:actor", id);
		},
    }
});
function closemenu() {
	GovPedMenu.active = false;
    cef.emit("cef:actor", -1);
}
function showinterf(name, text1, text2, button1){
	GovPedMenu.nameact = name;
	GovPedMenu.fisttext = text1;
	GovPedMenu.twutext = text2;
	GovPedMenu.buttext1 = button1;
	GovPedMenu.active = true;
}

cef.on('cef:showactordialog', (name, text1, text2, button1) => {
    showinterf(name, text1, text2, button1);
});

