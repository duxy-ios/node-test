var kafka = require('kafka-node');
let Producer = kafka.Producer;
var Client = kafka.Client;
const client = new kafka.KafkaClient({ kafkaHost: '119.27.189.162:29092' });
var argv = require('optimist').argv;
var topic = argv.topic || 'topic1';
var p = argv.p || 0;
var a = argv.a || 0;
var producer = new Producer(client, { requireAcks: 1 });
// Create topics sync

producer.on('ready', function () {
    producer.createTopics(['topic1'], false, function (err, data) {
        console.log(err.message);
        console.log(data);
    });
});


// Create topics async
// producer.createTopics(['t'], true, function (err, data) { });
// producer.createTopics(['t'], function (err, data) { });// Simply omit 2nd arg