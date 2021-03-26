const Discord = require('discord.js');
require('dotenv').config();
const { resolveSoa } = require('dns');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });


const prefix = '#';

const fs = require('fs');

const memberCounter = require('./counters/member-counter');

const { Recoverable } = require('repl');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}



client.on('ready', () => {
    console.log('Android is online!');

    memberCounter(client);

    // client.user.setActivity(Status, {
    //     type: 'STREAMING/PLAYING/WATCHING',
    // });
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Gak Kenal');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('689632454704758863').send(`YO <@${guildMember.user.id}> SUP MEGI! liat rules nya duls ok, -rules di channel commands`)
});



client.on('message', message => {

    if(message.mentions.members.first()) {
        return message.channel.send(`${user} apaan ? bingung gw bisa ngapain ? tinggal ketik ***#help*** ntar lu bisa tau gw bisa apa aja`);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'rules') {
        client.commands.get('rules').execute(message, args, Discord)
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args, Discord)
    } else if (command === 'image') {
        client.commands.get('image').execute(message, args, Discord)
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client)
    } else if (command === 'reactionrole_2') {
        client.commands.get('reactionrole_2').execute(message, args, Discord, client)
    } else if (command === 'reactionrole_3') {
        client.commands.get('reactionrole_3').execute(message, args, Discord, client)
    } else if (command === 'ticket') {
        client.commands.get('ticket').execute(message, args, Discord, client)
    } else if (command === 'avatar') {
        client.commands.get('avatar').execute(message, args, Discord)
    } else if (command === 'weather') {
        client.commands.get('weather').execute(message, args, Discord)
    } else if (command === 'meme') {
        client.commands.get('meme').execute(message, args, Discord)
    }

    if (command == 'ping') {
        client.commands.get('ping').execute(message, args, client);
    } else if (command == 'youtube') {
        client.commands.get('youtube').execute(message, args);
    } else if (command == 'clear') {
        client.commands.get('clear').execute(message, args);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave') {
        client.commands.get('leave').execute(message, args);
    } else if (command === 'hey') {
        client.commands.get('hey').execute(message, args);
    } else if (command === 'gif') {
        client.commands.get('gif').execute(message, args);
    }



});

client.login(process.env.DISCORD_TOKEN);