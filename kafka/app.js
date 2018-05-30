
'use strict';

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Offset = kafka.Offset;
var topic = 'test';
// const client = new kafka.KafkaClient({ kafkaHost: '119.27.189.162:29092' });
const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:29092' });
var topics = [{ topic: topic, partition: 0, offset: 189 }]; //offset:2
//fromOffset If set true, consumer will fetch message from the given offset in the payloads

//var options = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 10, groupId: "ducy", id: "ducy1", fromOffset: false };
var options = {
    autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1000 * 10, groupId: "pm", id: "ducy1", fromOffset: false,
};

var consumer = new Consumer(client, topics, options);
var offset = new Offset(client);

consumer.on('message', function (message) {
    console.log(message);
    consumer.pause();
    // consumer.commit(true, function (err, data) {
    //     console.log(data);
    //     consumer.resume()
    // });
    setTimeout(() => {
        consumer.resume();
    }, 111000);

});

consumer.on('error', function (err) {
    console.log('error', err);
});

consumer.on('ready', function () {
    console.log("ready");
});

/*
* If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
*/
consumer.on('offsetOutOfRange', function (topic) {
    topic.maxNum = 2;
    offset.fetch([topic], function (err, offsets) {
        if (err) {
            return console.error(err);
        }
        var min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
        consumer.setOffset(topic.topic, topic.partition, min);
    });
});