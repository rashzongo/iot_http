window.onload = init;

var SERVER_URL = "http://10.188.220.34:3000";

function init() {
    new Vue({
        el: "#lightApp",
        data: {
            lights: [],
            resource : "/light",
            server : SERVER_URL,
        },
        mounted() {
            this.getData();
        },
        methods: {
             getData() {
                let url = SERVER_URL + this.resource + 's';
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            this.lights = reponseJS.data;
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
            },
            onLight(mac_add){
                let url = SERVER_URL + this.resource + '/' + mac_add +'/on';
                console.log(url);
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
                this.getData();
            },
            offLight(mac_add){
                let url = SERVER_URL + this.resource + '/' + mac_add +'/off';
                console.log(url);
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
                this.getData();
            }
        }
    })

    new Vue({
        el: "#tempApp",
        data: {
            temperatures: [],
            resource : "/temperature",
            server : SERVER_URL,
        },
        mounted() {
            this.getData();
        },
        methods: {
             getData() {
                let url = SERVER_URL + this.resource + 's';
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            this.temperatures = reponseJS.data;
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
            },
            onRadiator(mac_add){
                let url = SERVER_URL + this.resource + '/' + mac_add +'/on';
                console.log(url);
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
                this.getData();
            },
            offRadiator(mac_add){
                let url = SERVER_URL + this.resource + '/' + mac_add +'/off';
                console.log(url);
                fetch(url).then((reponseJSON) => {
                    reponseJSON.json()
                        .then((reponseJS) => {
                            console.log(reponseJS.msg);
                        });
                }).catch((err) => {
                    console.log(err);
                });
                this.getData();
            }
        }
    })
}