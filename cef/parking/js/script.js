let wrapper = new Vue({
    el: ".wrapper",
    data:{
        active: false,
        number: 12,
        freePlace:0,
        cars:[ // 1 - стоит чья-то машина, 2 - стоит машина пользователя, 0 - место свободно (заполняется автоматически)
        ]
    },
    methods:{
        addCar: function(a){
            cef.emit("cef:parkingsystem", 1, a);
        },
        tbCar: function(x){
            cef.emit("cef:parkingsystem", 2, x);
        }
    }
});

function loadcars(numberpark, carname){
	wrapper.number = numberpark
	wrapper.cars = JSON.parse(carname)
	wrapper.freePlace = 0
    for(let i = 0; i < wrapper.cars.length; i++){
        if(wrapper.cars[i] == 0){
            wrapper.freePlace++
        }
    }
	wrapper.active = true
}

function AddCarInParking(place, carname){
    Vue.set(wrapper.cars, place, [2, carname])
    wrapper.freePlace = 0 
    for(let i = 0; i < wrapper.cars.length; i++){
        if(wrapper.cars[i] == 0){
            wrapper.freePlace++
        }
    }
}

function DellCarInParking(place){
    Vue.set(wrapper.cars, place, [0])
    wrapper.freePlace = 0
    for(let i = 0; i < wrapper.cars.length; i++){
        if(wrapper.cars[i] == 0){
            wrapper.freePlace++
        }
    }
}

function CloseInterfaceParking(){
    cef.emit("cef:closeparking");
}

cef.on('interface:showparking', (numberpark, carname) => {
    loadcars(numberpark, carname);
});

cef.on('cef:addcarparking', (numberpark, carname) => {
    AddCarInParking(numberpark, carname);
});

cef.on('cef:delcarparking', (numberpark) => {
    DellCarInParking(numberpark);
});