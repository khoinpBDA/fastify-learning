const kafkaConfig = require('./config')
const buySlotUnboxHandler = require('../services/kafka-handler/buySlotUnboxHandler')
const transferHandler = require('../services/kafka-handler/transferHandler')

const consumer = kafkaConfig.kafka.consumer({ groupId: kafkaConfig.defaultGroupName })

const consume = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: kafkaConfig.defaultTopicName, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
            try {
                //handle messages
                const keySet = Object.keys(JSON.parse(message.value.toString()))
                if (keySet.includes('BuySlotUnbox')) {
                    buySlotUnboxHandler.handle(JSON.parse(message.value.toString()).BuySlotUnbox)
                }

                if (keySet.includes('Transfer')) {
                    transferHandler.handle(JSON.parse(message.value.toString()).Transfer)
                }

                if (keySet.includes('TransferSingle')) {
                    transferHandler.handle(JSON.parse(message.value.toString()).TransferSingle)
                }


            } catch (e) {
                console.log(e)
                await consumer.connect()
            }
        },
    })
}

module.exports = {
    consume
}