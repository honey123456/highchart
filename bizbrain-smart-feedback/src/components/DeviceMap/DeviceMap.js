import axios from 'axios'

export default {
    name: 'deviceMap',
    data() {
        return {
            eachVoteDetail: [],
            name: 'example',
            mapName: this.name + "-map",
            map: null,
            deviceDetail: []
        }
    },
    created: function () {
        let self = this;
        self.getTotalDevices();
    },
    mounted: function () {
        let self = this;
        const element = document.getElementById(this.mapName)
        const options = {
            zoom: 12,
            center: new google.maps.LatLng(21.1702, 72.8311),
            mapTypeControl: false,
            gestureHandling: 'greedy'
        }
        self.map = new google.maps.Map(element, options);
    },
    methods: {
        getTotalDevices() {
            let self = this;
            axios({
                method: 'get',
                url: 'http://things.iot.bizbrain.in/api/v1/device',
                /*url: 'https://api.myjson.com/bins/e3cte',*/
            }).then(function (response) {
                console.log(response)
                if (response.data.flag) {
                    self.deviceDetail = response.data.data;

                    for (var i = 0; i < self.deviceDetail.length; i++) {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(self.deviceDetail[i].latitude, self.deviceDetail[i].longitude),
                            map: self.map
                        });
                        var contentString = '<div>' +
                            '<div style="float: left;">' +
                            '<h4 style="display: inline-block;">' + self.deviceDetail[i].nickName + '</h4>' +
                            '<p style="overflow-wrap: break-word;max-width: 70vw;margin-left: 50px">' + self.deviceDetail[i].deviceId + '</p>' +
                            '</div>';
                        let infowindow = new google.maps.InfoWindow({content: contentString});

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                self.$router.push('/dashboard/' + self.deviceDetail[i].deviceId)
                                infowindow.open(self.map, marker);
                            }
                        })(marker, i));
                        google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {
                            return function () {
                                infowindow.close(self.map, marker);
                            }
                        })(marker, i));
                        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                            return function () {
                                infowindow.open(self.map, marker);
                            }
                        })(marker, i));
                    }

                }
            }).catch(function (error) {
                console.log(error)
            })
        }
    }
}