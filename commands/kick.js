const Discord = require('discord.js');
const config = require('../config.json');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray } = require('chalk');
module.exports = {
  name: 'kick',
  description: "Kicks members",
  async execute(msg, args, client) {
      msg.delete()
    const noPerms = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle("**Not Permissions**")
      .setDescription("You can't use this command because your **not** a staff member\nOr you dont have perm to kick users.")
      .addFields(
        {
            name: "Command:",
            value: "~kick [user] reason",
            inline: true
        }
    )
      .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
      .setFooter("For any bugs or other questions mention Craftplay developers")
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(noPerms)

    const mentionMember = msg.mentions.members.first();
    let reason = args.slice(1).join(" ");
    const specUser = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle("**Kick unsuccessful**")
      .setDescription("To kick a member you need to mention the user")
      .addFields(
          {
              name: "Command:",
              value: "~kick [user] reason",
              inline: true
          }
      )
      .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
      .setFooter("For any bugs or other questions mention Craftplay developers")
    if (!args[0]) return msg.channel.send(specUser);

    const invalidUser = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle("**Kick unsuccessful**")
      .setDescription("This user info is not valid\nOr user is no-longer in this server!")
      .addFields(
        {
            name: "Command:",
            value: "~kick [user] reason",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if (!mentionMember) return msg.channel.send(invalidUser);

    const notBanned = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle("**Bot has no perms**")
      .setDescription(`Sorry, but i cant help you because I don't have perms to kick users\nPlease contact Craftpaly developers to help me `)
      .addFields(
        {
            name: "Command:",
            value: "~kick [user] reason",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
    if (!mentionMember.bannable) return msg.channel.send(notBanned);
    if (!reason) reason = "No reason given";
    const embed = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle(`You were kicked from **${msg.guild.name}**`)
      .setDescription(`If you think that we have mistakenly kicked you out of our server\nPlease do let us know in by going to our website.`)
      .addFields(
        {
          name: "**Reason** :",
          value: `${reason}`,
          inline: true
      },
        {
            name: "Website:",
            value: "https://craftplay.website/",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")




    await mentionMember.send(embed);
    const banned = new Discord.MessageEmbed()
      .setColor("#a0e43f")
      .setTitle("**User kicked**")
      .setDescription(`Successfully kicked: ${mentionMember.user.tag}`)
     .addFields(
      {
        name: "**Reason** :",
        value: `${reason}`,
        inline: true
    },
        {
            name: "**Kicked by** :",
            value: `${msg.author}`,
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")




    await mentionMember.kick({
      reason: reason
      
    }).then(() => msg.channel.send(banned)) + client.channels.cache.get(config.stafflogs).send(staffCloseed)
    console.log( "[" + green("Craft") + gray("Play")+ "]" + greenBright(`${mentionMember.user.tag} got kicked by ${msg.author.tag} !`));

    const staffCloseed = new Discord.MessageEmbed()     
                .setColor("#a0e43f")
                .setTitle("Staff kicked a member!")
                .setDescription(`${msg.author} kicked ${mentionMember.user.tag}`)
                .addFields(
                    {
                        name: "Reason:",
                        value: `${reason}`,
                        inline: true
                    }
                )
                .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png%22")
                .setFooter("For any bugs or other questions mention Craftplay developers");
            client.channels.cache.get(config.stafflogs).send(staffCloseed)


  }

}
