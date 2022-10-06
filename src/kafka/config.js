
const defaultTopicName = process.env.KAFKA_TOPIC_WALLET_INVENTORY || 'dev-cyber8-inventory-khoi'
const defaultGroupName = process.env.KAFKA_GROUP_WALLET_INVENTORY || 'dev-cyber8-inventory-khoi-1'
const kafkaHost = process.env.KAFKA_HOST || 'kafka-nonprod.defiforyou.uk:9092'

const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [kafkaHost]
})

module.exports = {kafka, defaultTopicName, defaultGroupName, kafkaHost}
