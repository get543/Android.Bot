module.exports = {
    name: 'skip',
    aliases: ['s', 'sk'],
    description: 'skip now playing music',
    async execute(client, message, args, cmd, Discord) {
        if (!message.member.voice.channel) return message.channel.send('masuk vc dulu tot');
        let queue = await client.distube.getQueue(message);

        if (queue) {
            client.distube.skip(message);

            message.channel.send(`Skipping..`);
        } else if (!queue) {
            return;
        }
    }
}