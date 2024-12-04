const GLOBAL_ENCRY_DATA = "b53kNat6fcv/LggZAfXnG4Zz3hLxxF45eDQOeRXN5Aqq22yL83gKZBUTBjiamHjZo61xTC29AaZ22IQu5ux2cLvxaIVDjem0WduAb6qteXMkNIVbIXu4l50bXBV8ae1WS2PSYNGA4DTgDqOrSCCmZkvhYXMnEYsESyhJ7qt8rdk8URuRtlBQvEjBYPB/qXQ0S2PSYNGA4DTgDqOrSCCmZgk0jQC8xR8sKYhBiDps3UIIkekfosjDEr9RirttZPjZKKaOTSL0v7zeIkUhsIp4ggLQhaU3DNc77UDwRPVYxv4QQoiR2G2GvIlvYjJdY5QgkV1BqkDjoOVrzD5rUZX4/nFITNRexJOp8TL1VCWnr/4geLB+pQJWyl/9FmhG9bH09smEPd62GbZK7sRIaPXQTYx4Ptzr8r0VoSaelY/az8MnJn9c0bJN5PPQjNQ+Nak7";
function GlobalData(key) {
    this.decrypt = function (content, key) {
        return CryptoJS.AES.decrypt(content, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    };
    this.data = JSON.parse(this.decrypt(GLOBAL_ENCRY_DATA, key));
    this.get = function get(dataKey) {
        return this.data[dataKey];
    };
}