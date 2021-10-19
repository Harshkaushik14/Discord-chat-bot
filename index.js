require('dotenv').config();
const { Intents } = require('discord.js');
// client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }),
Discord = require('discord.js'),
DisTube = require('distube'),
client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
       "GUILDS",
       "GUILD_MEMBERS",
      //  "GUILD_BANS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_INTEGRATIONS",
       "GUILD_WEBHOOKS",
        "GUILD_INVITES",
       "GUILD_PRESENCES",
        "GUILD_MESSAGE_REACTIONS",
       "GUILD_MESSAGE_TYPING",
       "GUILD_VOICE_STATES",
       "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
       "GUILD_MESSAGES",
   "DIRECT_MESSAGES",
    ],
    partials: ["CHANNEL"],
  });
  const {
    getvoiceConnection,
    joinVoiceChannel,
    AudioPlayerStatus,
    createAudioResource,
    getNextResource,
    createAudioPlayer,
    NoSubscriberBehavior,
  } = require("@discordjs/voice");
  
config = {
    prefix: "!",
    token: process.env.TOKEN || "Your Discord Token"
};


// const ytdl = require("ytdl-core");
// NEW CODE TRYING👇
var version = '1.2';

// var servers = {};

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

// OLD CODE 👇
client.on('ready',()=>{
    console.log('ready'+ version)
});

// client.on("messageCreate", async (message) => {
//     if (message.author.bot) return;
//     if (!message.content.startsWith(config.prefix)) return;
//     const args = message.content.slice(config.length).trim().split(/ +/g);
//     const command = args.shift();

    // client.on('messageCreate', (message) => {
    //     if (!message.content.startsWith(config.prefix)) return;
    //     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    //     const command = args.shift();
    //     if (command == "play")
    //         distube.play(message, args.joinVoiceChannel(" "));
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
        if (message.content.toLowerCase() === "ping") {
            message.reply("The **API** ping is " + "`" + client.ws.ping + "ms`. " + `The **message** ping is ` + "`" + (Date.now() - message.createdTimestamp) + "ms`.")
        };
        if (message.content.toLowerCase().startsWith(config.prefix + "e")) {
            const args = message.content.split(" ").slice(1);
            if (message.author.id !== config.ownerID) return;
            const content = message.content.split(' ').slice(1).join(' ');
            const result = new Promise((resolve, reject) => resolve(eval(content)));
            return result.then(output => {
                if (typeof output !== 'string') output = require('util').inspect(output, {
                    depth: 0
                });
                if (output.includes(client.token)) output = output.replace(client.token, '[Woah, umm, nope]');
                if (output.length > 1990) console.log(output), output = 'Too long to be printed (content got console logged)';
                return message.channel.send(output, {
                    code: 'js'
                });
            }).catch(err => {
                console.error(err);
                err = err.toString();
                if (err.includes(client.token)) err = err.replace(client.token, '[Woah, umm, nope]');
                return message.channel.send(err, {
                    code: 'js'
                });
            });
        };
    });
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
        if (message.member.voice.channel == null){
            return;
        }
        if (message.content.toLowerCase() !==("play")){
            return;
        };
        const connection = joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,    
        });
    })
// if (["repeat", "loop"].includes(command))
//     distube.setRepeatMode(message, parseInt(args[0]));

// if (command == "stop") {
//     distube.stop(message);
//     message.channel.send("Stopped the music!");
// }

// if (command == "skip")
//     distube.skip(message);

// if (command == "queue") {
//     let queue = distube.getQueue(message);
//     message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
//         `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
//     ).slice(0, 10).joinVoiceChannel("\n"));
// }

// if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
//     let filter = distube.setFilter(message, command);
//     message.channel.send("Current queue filter: " + (filter || "Off"));
// }
// });

// const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// // DisTube event listeners, more in the documentation page
// distube
//     .on("playSong", (message, queue, song) => message.channel.send(
//         `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
//     ))
//     .on("addSong", (message, queue, song) => message.channel.send(
//         `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
//     ))
//     .on("playList", (message, queue, playlist, song) => message.channel.send(
//         `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
//     ))
//     .on("addList", (message, queue, playlist) => message.channel.send(
//         `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
//     ))
//     // DisTubeOptions.searchSongs = true
//     .on("searchResult", (message, result) => {
//         let i = 0;
//         message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
//     })
//     // DisTubeOptions.searchSongs = true
//     .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
//     .on("error", (message, e) => {
//         console.error(e)
//         message.channel.send("An error encountered: " + e);
//     });


{/*      Other Code           */}
// NEW CODE 👇
// client.on("message", message =>{
//     let args = message.content.substring(PREFIX.length).split(" ");
//     switch(args[0]){
//         case 'play':

//         function play(connection, message){
//             var server = servers[message.guild.id];

//             server.dispatcher = connection.play(ytdl(server.queue[0],{filter:"audioonly"}));

//             server.queue.shift();

//             server.dispatcher.on("end", function(){
//                 if(server.queue[0]){
//                 play(connection, message);
//                 }
//                 else{
//                     connection.disconnect();
//                 }
//             });

//         }




//             if(!args[1]){
//                 message.channel.send("you need to provide a link!")
//             return;
//             }
//              if(!message.member.voice.channel){
//                 message.channel.send("you must be in a channel to play the bot!")
//             return; 
//             }

//             if(!servers[message.guild.id]) servers[message.guild.id]={
//                 queue:[]
//             }

// var server = servers[message.guild.id];

// server.queue.push(args[1]);

// if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
// play(connection,message);
// })

//             break;
//     }
// });


// OLD CODE 👇
// client.on('messageCreate', (message) =>{
// if (message.content === 'hello'){
//     message.reply({
//         content:'hey there👻',
//     })
// }
// }),
// client.on('messageCreate', (message) =>{
//     if (message.content === 'bye'){
//         message.reply({
//             content:'see you later👀',
//         })
//     }
//     })


client.login(process.env.TOKEN);