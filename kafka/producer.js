const _ = require("lodash");
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;
// const client = new kafka.KafkaClient({ kafkaHost: '119.27.189.162:29092' });
const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:29092' });
var argv = require('optimist').argv;
// var topic = argv.topic || 'usefulgoods';
var topic = argv.topic || 'test';
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, { requireAcks: 1 });

producer.on('ready', function () {
    // client.refreshMetadata(["test"]);
    var insertMessage = "{\"type\":\"insert\",\"body\":[{\"distinctId\":\"1\",\"biz\":\"sino\",\"useful\":true,\"goodsInfo\":{\"url\":\"http://detail.tmall.com/item.htm?id=2804204376\",\"urlId\":\"1096ade69796635906613643811c4d1d\",\"brand\":\"Tp-link/普联\",\"model\":\"tl-wr842n\",\"goodsName\":\"\",\"shopId\":\"58074310\",\"platform\":\"天猫\"},\"standardCategories\":{\"id\":\"59b0fc797f4e7c0286f2c199\",\"name\":\"路由器\",\"ancestorId\":\"59b0fc4b7f4e7c0286f2c197\"},\"remark\":[],\"created\":1522324286330,\"lastModified\":1522324286330}]}";
    var updateMessage = "{\"type\":\"update\",\"body\":{\"distinctIds\":[\"1\"],\"brand\":\"ducy\",\"limitPriceConfig\":{\"defaultLimitPrice\":{\"pcLimitPrice\":100,\"appLimitPrice\":90}}}}";
    var deleteMessage = "";
    var message = "{\"type\":\"insert\",\"body\":[{\"distinctId\":\"1\",\"biz\":\"sino\",\"useful\":true,\"goodsInfo\":{\"url\":\"http://detail.tmall.com/item.htm?id=2804204376\",\"urlId\":\"1096ade69796635906613643811c4d1d\",\"brand\":\"Tp-link/普联\",\"model\":\"tl-wr842n\",\"goodsName\":\"\",\"shopId\":\"58074310\",\"platform\":\"天猫\"},\"standardCategories\":{\"id\":\"59b0fc797f4e7c0286f2c199\",\"name\":\"路由器\",\"ancestorId\":\"59b0fc4b7f4e7c0286f2c197\"},\"remark\":[],\"created\":1522324286330,\"lastModified\":1522324286330}]}";
    var keyedMessage = new KeyedMessage('keyed', 'a keyed message');

    producer.send([
        { topic: topic, partition: p, messages: insertMessage, attributes: a }
    ], function (err, result) {
        console.log(err || result);
        process.exit();
    });
});

producer.on('error', function (err) {
    console.log('error', err);
});


client.once('connect', function () {
    client.loadMetadataForTopics([], function (error, results) {
        if (error) {
            return console.error(error);
        }
        // console.log(JSON.stringify(results));
        console.log(JSON.stringify(_.get(results, '1.metadata')));
    });
});


