import axios from 'axios'
import moment from 'moment'
import DatePicker from 'vue2-datepicker'

export default {
    name: 'HelloWorld',
    components: {DatePicker},
    data() {
        return {
            moment: moment,
            eachVoteDetail: [],
            voteArray: [],
            name: 'example',
            mapName: this.name + "-map",
            map: null,
            deviceDetail: [],
            particularDeviceDetail: {},
            deviceId: 0,
            time1: moment().format('YYYY-MM-DD'),
            shortcuts: [
                {
                    text: 'Today',
                    start: new Date(),
                    end: new Date()
                }
            ],
            dateRangePlaceHolder: moment().format('DD-MM-YYYY') + ' ~ ' + moment().format('DD-MM-YYYY'),
            todayDate: moment().format('YYYY-MM-DD'),
            buttonsDetail: null,
            chartColor: [],
            buttonNames: {},
            buttonColor: {},
            buttonShape: {},
            deviceCity: '',
            deviceLocation: '',
        }
    },
    created: function () {
        let self = this;
        self.deviceId = self.$route.params.deviceId;
        self.getAllFeedbackOfDevice(self.deviceId);
        self.getTotalDevices();
    },
    mounted: function () {
        var self = this;
        setInterval(function () {
            if (self.time1 == self.todayDate) {
                self.getAllFeedbackOfDevice(self.deviceId)
            }
        }, 20000)
        /* const element = document.getElementById(this.mapName)
         const options = {
             zoom: 12,
             center: new google.maps.LatLng(self.particularDeviceDetail.latitude, self.particularDeviceDetail.longitude),
             mapTypeControl: false,
             gestureHandling: 'greedy'
         }
         self.map = new google.maps.Map(element, options);*/
    },
    methods: {
        getTotalDevices() {
            let self = this;
            axios({
                method: 'get',
               /* url: 'http://things.iot.bizbrain.in/api/v1/device',*/
                url: 'https://api.myjson.com/bins/e3cte',
            }).then(function (response) {
                if (response.data.flag) {
                    self.deviceDetail = response.data.data;
                    self.deviceDetail.forEach(function (data) {
                        if (data.deviceId == self.deviceId) {
                            self.particularDeviceDetail = data
                        }
                    })
                    self.buttonsDetail = self.particularDeviceDetail.device_type_obj.buttons
                    self.buttonsDetail.forEach(function (item) {
                        self.chartColor.push(item.color)
                        let id = item.id;
                        let label = item.label
                        let color = item.color
                        let shape = item.shape
                        self.buttonNames[id] = label
                        self.buttonColor[id] = color
                        self.buttonShape[id] = shape
                    })

                    const element = document.getElementById(self.mapName)
                    const options = {
                        zoom: 12,
                        center: new google.maps.LatLng(self.particularDeviceDetail.latitude, self.particularDeviceDetail.longitude),
                        mapTypeControl: false,
                        gestureHandling: 'greedy'
                    }
                    self.map = new google.maps.Map(element, options);

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(self.particularDeviceDetail.latitude, self.particularDeviceDetail.longitude),
                        map: self.map
                    });
                    var contentString = '<div>' +
                        '<div style="float: left;">' +
                        '<h4 style="display: inline-block;">' + self.particularDeviceDetail.nickName + '</h4>' +
                        '<p style="overflow-wrap: break-word;max-width: 70vw;margin-left: 50px">' + self.particularDeviceDetail.deviceId + '</p>' +
                        '</div>';
                    let infowindow = new google.maps.InfoWindow({content: contentString});

                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infowindow.open(self.map, marker);
                        }
                    })(marker));
                    google.maps.event.addListener(marker, 'mouseout', (function (marker) {
                        return function () {
                            infowindow.close(self.map, marker);
                        }
                    })(marker));
                    google.maps.event.addListener(marker, 'mouseover', (function (marker) {
                        return function () {
                            infowindow.open(self.map, marker);
                        }
                    })(marker));
                    let latlng = new google.maps.LatLng(self.particularDeviceDetail.latitude, self.particularDeviceDetail.longitude);
                    let geocoder = new google.maps.Geocoder();
                    geocoder.geocode({'latLng': latlng}, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                console.log("results",results)
                                self.deviceCity= results[7].formatted_address
                                self.deviceLocation= results[4].formatted_address
                            }
                        }
                    });

                }
            }).catch(function (error) {
                console.log(error)
            })
        },
        getAllFeedbackOfDevice(deviceId) {
            let self = this;


            let temp1 = moment(self.todayDate, 'YYYY-MM-DD HH:mm:ss').startOf("day").format('YYYY-MM-DD HH:mm:ss')
            let temp2 = moment(self.todayDate, 'YYYY-MM-DD HH:mm:ss').endOf("day").format('YYYY-MM-DD HH:mm:ss')
            let timestamp1 = parseInt(moment(temp1, "'YYYY-MM-DD HH:mm:ss'").utc().valueOf() / 1000)
            let timestamp2 = parseInt(moment(temp2, "'YYYY-MM-DD HH:mm:ss'").utc().valueOf() / 1000)
            axios({
                method: 'get',
                /*url: 'http://things.iot.bizbrain.in/api/v1/feedback/byDate',*/
                url: 'https://api.myjson.com/bins/o79wa',
                /*data: {
                    'startTimestamp': timestamp1,
                    'endTimestamp': timestamp2,
                    'deviceId': parseInt(deviceId)
                }*/
            }).then(function (response) {
                self.eachVoteDetail = [];
                self.eachVoteDetail = response.data.data

                self.eachVoteDetail.sort(function(a, b) {
                    var x = a.createdOn;
                    var y = b.createdOn;
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                });

                self.voteArray = [];
                let tempObj = {};
                self.eachVoteDetail.forEach(function (data) {
                    tempObj[data.vote] = (tempObj[data.vote] || 0) + 1;
                })
                Object.keys(tempObj)
                    .forEach(function eachKey(key) {
                        var obj = {
                            "key": key,
                            "value": tempObj[key]
                        }
                        self.voteArray.push(obj)
                    });
                let tempArrForChart = []
                let tempNewArray = []
                self.voteArray.forEach(function (item) {
                    tempNewArray = [self.buttonNames[item.key], item.value]
                    tempArrForChart.push(tempNewArray);
                });
                var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        columns: tempArrForChart,
                        type: 'donut',
                    },
                    donut: {
                        title: "Feedback"
                    },
                    color: {
                        pattern: self.chartColor
                    }
                });
            }).catch(function (error) {
                console.log(error)
            })
        },
        onDateChange() {
            let self = this;
            let temp1 = moment(self.time1[0], 'ddd MMM DD YYYY HH:mm:ss').startOf("day").format('YYYY-MM-DD HH:mm:ss')
            let temp2 = moment(self.time1[1], 'ddd MMM DD YYYY HH:mm:ss').endOf("day").format('YYYY-MM-DD HH:mm:ss')
            if (temp2 == self.todayDate) {

            } else {
                let timestamp1 = parseInt(moment(temp1, "YYYY-MM-DD HH:mm:ss").utc().valueOf() / 1000)
                let timestamp2 = parseInt(moment(temp2, "YYYY-MM-DD HH:mm:ss").utc().valueOf() / 1000)
                axios({
                    method: 'post',
                    url: 'http://things.iot.bizbrain.in/api/v1/feedback/byDate',
                    data: {
                        'startTimestamp': timestamp1,
                        'endTimestamp': timestamp2,
                        'deviceId': self.deviceId
                    }
                }).then(function (response) {
                    self.eachVoteDetail = [];
                    self.eachVoteDetail = response.data.data

                    self.eachVoteDetail.sort(function(a, b) {
                        var x = a.createdOn;
                        var y = b.createdOn;
                        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                    });

                    self.voteArray = [];
                    let tempArray = {}
                    self.eachVoteDetail.forEach(function (data) {
                        tempArray[data.vote] = (tempArray[data.vote] || 0) + 1;
                    })
                    Object.keys(tempObj)
                        .forEach(function eachKey(key) {
                            var obj = {
                                "key": key,
                                "value": tempObj[key]
                            }
                            self.voteArray.push(obj)
                        });
                    let tempArrForChart = []
                    let tempNewArray = []
                    self.voteArray.forEach(function (item) {
                        tempNewArray = [self.buttonNames[item.key], item.value]
                        tempArrForChart.push(tempNewArray);
                    });
                    var chart = c3.generate({
                        bindto: '#chart',
                        data: {
                            columns: tempArrForChart,
                            type: 'donut',
                        },
                        donut: {
                            title: "Feedback"
                        },
                        color: {
                            pattern: self.chartColor
                        }
                    });
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }
    }
}