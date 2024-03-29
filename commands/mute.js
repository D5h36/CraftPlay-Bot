const ms = require('ms');
const Discord = require('discord.js');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray } = require('chalk');
const config = require('../config.json')
module.exports = {
    name: 'mute',
    description: "This mutes a member",
  async  execute(msg, args, client) {
        msg.delete()
        const perms = new Discord.MessageEmbed()
        .setColor('#a0e43f')
        .setTitle("**Not Permissions**")
        .setDescription("You can't use this command because your **not** a staff member!")
        .addFields(
            {
                name: "Command:",
                value: "~mute [user] time",
                inline: true
            }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
        .setFooter("For any bugs or other questions mention Craftplay developers")
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(perms);
     
    let member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
    let reason = args.slice(2).join(" ");
    const notPerson = new Discord.MessageEmbed()
    .setColor('#a0e43f')
    .setTitle("**Mute unsuccessful**")
    .setDescription("This user info is not valid\nOr user is no-longer in this server!")
    .addFields(
        {
            name: "Command:",
            value: "~mute [user] time reson",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if(!member) return msg.channel.send(notPerson);
    let muteTime = args[1];
    const notTime = new Discord.MessageEmbed()
    .setColor('#a0e43f')
    .setTitle("**Mute unsuccessful**")
    .setDescription("Please add time for how long user will be muted")
    .addFields(
        {
            name: "Command:",
            value: "~mute [user] time reason",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if(!muteTime) return msg.channel.send(notTime);
    // 10s => 10000
    let msTime = ms(muteTime);
    let muteRole = msg.guild.roles.cache.find(r => r.name == `mute`);
    if (!muteRole) await msg.guild.roles.create({
        data: {
            name: `mute`,
            color: "GREEN"
        }
    });
    msg.guild.channels.cache.forEach(async (channel) => {
        await channel.createOverwrite(muteRole, {
           SEND_MESSAGES: false,
           MANAGE_MESSAGES: false,
           READ_MESSAGES: false,
           ADD_REACTIONS: false
        });
    });
    const notRole = new Discord.MessageEmbed()
    .setColor('#a0e43f')
    .setTitle("**Mute unsuccessful**")
    .setDescription("Can't detect `Muted role`\nMaking one!")
    .addFields(
        {
            name: "Command:",
            value: "~mute [user] time reason",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if(!muteRole) return msg.channel.send(notRole);
    member.roles.add(muteRole);
    const muted = new Discord.MessageEmbed()
    .setColor('#a0e43f')
    .setTitle("**User Muted**")
    .setDescription(`User ${member.user.tag} has been muted!`)
    .addFields(
        {
            name: "**Reason** :",
            value: `${reason}`,
            inline: true
        },
        {
            name: "**Muted by** :",
            value: `${msg.author} for **${muteTime}**`,
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    console.log( "[" + green("Craft") + gray("Play")+ "]" + greenBright(`${member.user.tag} got muted by ${msg.author.tag} for ${muteTime}!`))
    const staffCloseed = new Discord.MessageEmbed()     
                .setColor("#a0e43f")
                .setTitle("Staff muted a member!")
                .setDescription(`${msg.author} muted ${member.user.tag} for ${muteTime}`)
                .addFields(
                    {
                        name: "Mute reason:",
                        value: `${reason}`,
                        inline: true
                    }
                )
                .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png%22")
                .setFooter("For any bugs or other questions mention Craftplay developers");
            
    msg.channel.send(muted) + client.channels.cache.get(config.stafflogs).send(staffCloseed)
    

    setTimeout(() => {
        member.roles.remove(muteRole);
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#a0e43f')
        .setTitle('**User unmuted**')
        .setDescription(`User ${member.user.tag} has been unmuted
        \nIf you think that we have mistakenly muted you on our server\n Please do let us know by going to our website.`)
        .addFields(
            {
                name: "**Reason** :",
                value: `${reason}`,
                inline: true
            },
            {
                name: "**Muted by** :",
                value: `${msg.author} for **${muteTime}**`,
                inline: true
            }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
        .setFooter("For any bugs or other questions mention Craftplay developers");

        const staffchatumute = new Discord.MessageEmbed()     
                .setColor("#a0e43f")
                .setTitle("User got unmuted!")
                .setDescription(`${msg.author} muted ${member.user.tag} for ${muteTime}`)
                .addFields(
                    {
                        name: "Mute reason:",
                        value: `${reason}`,
                        inline: true
                    }
                )
                .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png%22")
                .setFooter("For any bugs or other questions mention Craftplay developers");
        msg.channel.send(newEmbed) + client.channels.cache.get(config.stafflogs).send(staffchatumute)
        console.log( "[" + green("Craft") + gray("Play")+ "]" + blueBright(`${member.user.tag} got unmuted!`))

        
            
    }, msTime)

    }
    






}