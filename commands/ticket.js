const { Message } = require('discord.js');
const config = require('../config.json')
module.exports = {
    name: 'ticket',
    description: "test command",
    execute(msg, args, client, Discord) {
        msg.delete()

        if (msg.content.startsWith(config.prefix + 'ticket')) {
            const channelID = new Discord.MessageEmbed()
            .setColor("#a0e43f")
            .setTitle("**Wrong channel**")
            .setDescription("You can only make a ticket in <#844141634006024203>")
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")
            if (msg.channel.id !== config.ticketChannelId) return msg.channel.send(channelID)
        }
        // getting in the ticket category
        const categoryID = msg.member.guild.channels.cache.find(c => c.name == config.ticketCategory)

        // if there is no ticket category return
        if (!categoryID) return;

        // getting the username of the member who created the ticket
        var userName = msg.author.username;

        // getting the Discriminator (KarimX#9586) of the ticket creator
        var userDiscriminator = msg.author.discriminator;

        // making the var for the funtion
        var ticketexist = false;

        // getting all the channels in the server
        msg.guild.channels.cache.forEach(channel => {

            // making sure that the user dont already have a ticket
            if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

                // setting it to true so there is already a ticket
                ticketexist = true;

                // returning the cmd
                return;
            }
        });

        // if the user already have a ticket return ( dont create another ticket for him)
        if (ticketexist) return;

        // making the ticket channel
        msg.guild.channels.create(`[CP] ticket by ` + userName.toLowerCase() + "-" + userDiscriminator, { type: 'text' }).then(
            (createdChannel) => {
                // when it creates a ticket, it will create a category and name it ticket and put the ticket there
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {
                        // setting the perms for the channel so no one can see it
                        settedParent.updateOverwrite(msg.guild.roles.cache.find(x => x.name === '@everyone'), {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        // setting the perm so the ticket creator can see it and send msgs in it
                        settedParent.updateOverwrite(msg.author.id, {
                            SEND_MESSAGES: true,
                            VIEW_CHANNEL: true,
                            CREATE_INSTANT_INVITE: false,
                            READ_MESSAGES: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true,
                            READ_MESSAGE_HISTORY: true
                        });

                        // sending a embed when someone creates a ticket 
                        var ticketEmbed = new Discord.MessageEmbed()
                            .setColor("#a0e43f")
                            .setTitle(`Welcome in your ticket ${msg.author.username}`)
                            .setDescription(`Leave your question/bug or player report here.\nIf there is a specific topics you have problem, read what staff you should ping.`)
                            .addFields(
                                {
                                    name: "GrizzlyBear4",
                                    value: "```For any minecraft mechanics, problems in-game or player reports```",
                                    inline: false
                                },
                                {
                                    name: "ItsAmyra",
                                    value: "```For player reports, lost items and other in-game releted```",
                                    inline: false
                                },
                                {
                                    name: "mthh",
                                    value: "```For any in-gama related bugs, discord server reports/suggestions and player reports, forum posts```",
                                    inline: false
                                },
                                {
                                    name: "SmartGamer",
                                    value: "```For any in-gama related bugs, plugin bugs and player reports```",
                                    inline: false
                                },
                                {
                                    name: "abcdefghijklmnop aka Walson",
                                    value: "```For any serious questions like new plugins or server related! NOT in-game lost items etc. for that ping staff above.```",
                                    inline: false
                                },

                            )
                            .setTimestamp()
                            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                            .setFooter("Ticket will close after problem is solved or ticket is inactive!")
                        settedParent.send(ticketEmbed)
                        settedParent.send(`${msg.author} your ticket has been created `)
                        msg.channel.send(`${msg.author} your ticket has been created at ${createdChannel}`)

                        
                    }
                ).catch(err => {
                    // if err console err
                    return console.log(err)
                });
            }
        ).catch(err => {
            // if err console err
            return console.log(err)
        });
    }
}