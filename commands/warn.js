const config = require('../config.json')

module.exports = {
    name: 'warn',
    description: "user warn command",
    async execute(msg, args, client, Discord) {
        const noPerms = new Discord.MessageEmbed()
            .setColor("#a0e43f")
            .setTitle("**Not Permissions**")
            .setDescription("You can't use this command because your **not** a staff member.")
            .addFields(
                {
                    name: "Command:",
                    value: "~warn [user]",
                    inline: true
                }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")
        if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(noPerms);
        const notME = new Discord.MessageEmbed()
            .setColor("#a0e43f")
            .setTitle("**Bot has no perms**")
            .setDescription(`Sorry, but i cant help you because I don't have perms to **manage** users\nPlease contact Craftpaly developers to help me `)
            .addFields(
                {
                    name: "Command:",
                    value: "~warn [user]",
                    inline: true
                }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")
        if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(notME);

        const warnRole1 = msg.guild.roles.cache.find(role => role.name == `${config.warnRole1}`)
        const warnRole2 = msg.guild.roles.cache.find(role => role.name == `${config.warnRole2}`)
        const warnRole3 = msg.guild.roles.cache.find(role => role.name == `${config.warnRole3}`)
        const mentionMember = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first();
        let punishment = 1;
        let reason = args.slice(2).join(" ");

        if (!warnRole1) await msg.guild.roles.create({
            data: {
                name: config.warnRole1,
                color: "GREEN"
            }
        });
        if (!warnRole2) await msg.guild.roles.create({
            data: {
                name: config.warnRole2,
                color: "YELLOW"
            }
        });
        if (!warnRole3) await msg.guild.roles.create({
            data: {
                name: config.warnRole3,
                color: "RED"
            }
        });

        const notmention = new Discord.MessageEmbed()
            .setColor("#a0e43f")
            .setTitle("**Warn commands**")
            .setDescription(`You have to mention a user!`)
            .addFields(
                {
                    name: "To see how many warn does a user have :",
                    value: "~warn [user]"
                },
                {
                    name: "To warn a user :",
                    value: "~warn [user] add"
                },
                
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")

        if (!args[0]) return msg.channel.send(notmention);
        const invalidUser = new Discord.MessageEmbed()
            .setColor("#a0e43f")
            .setTitle("**Not a real user**")
            .setDescription("This user info is not valid\nOr user is no-longer in this server!")
            .addFields(
                {
                    name: "Use ~warn for all commands",
                    value: "\u200b",
                    inline: true
                }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")
        if (!mentionMember) return msg.channel.send(invalidUser)
        if (!reason) reason = "No reason provided";
        if (mentionMember.roles.cache.has(warnRole1.id)) punishment = 2
        if (mentionMember.roles.cache.has(warnRole2.id)) punishment = 3
        if (mentionMember.roles.cache.has(warnRole3.id)) punishment = 4
        if (!['remove', 'add'].includes(args[1])) {
            if (punishment == 1) {
                const noWarn = new Discord.MessageEmbed()
                    .setColor("#a0e43f")
                    .setTitle(`**${mentionMember.user.tag}'s Warnings**`)
                    .setDescription("This user has no warnings!")
                    .addFields(
                        {
                            name: "Use ~warn for all commands",
                            value: "\u200b",
                            inline: true
                        }
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                    .setFooter("For any bugs or other questions mention Craftplay developers")
                return msg.channel.send(noWarn)
            } else if (punishment === 2) {
                const oneWarn = new Discord.MessageEmbed()
                    .setColor("#a0e43f")
                    .setTitle(`**${mentionMember.user.tag}'s Warnings**`)
                    .setDescription("This user has **One** warning!")
                    .addFields(
                        {
                            name: "Use ~warn for all commands",
                            value: "\u200b",
                            inline: true
                        }
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                    .setFooter("For any bugs or other questions mention Craftplay developers")
                return msg.channel.send(oneWarn)

            } else if (punishment === 3) {
                const twoWarn = new Discord.MessageEmbed()
                    .setColor("#a0e43f")
                    .setTitle(`**${mentionMember.user.tag}'s Warnings**`)
                    .setDescription("This user has **Two** warnings!")
                    .addFields(
                        {
                            name: "Use ~warn for all commands",
                            value: "\u200b",
                            inline: true
                        }
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                    .setFooter("For any bugs or other questions mention Craftplay developers")
                return msg.channel.send(twoWarn)

            }
            else if (punishment === 4) {
                const threeWarn = new Discord.MessageEmbed()
                    .setColor("#a0e43f")
                    .setTitle(`**${mentionMember.user.tag}'s Warnings**`)
                    .setDescription("This user has **Three** warnings!")
                    .addFields(
                        {
                            name: "Use ~warn for all commands",
                            value: "\u200b",
                            inline: true
                        }
                    )
                    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                    .setFooter("For any bugs or other questions mention Craftplay developers")
                return msg.channel.send(threeWarn)

            }
        } else {
            if (args[1] == 'add') {
                //ES PALIKU SEIT PIEVIENO REASON
                if (punishment == 1) {
                    await mentionMember.roles.add(warnRole1.id).catch(err => console.log(err));
                    const firstAdded = new Discord.MessageEmbed()
                        .setColor("#a0e43f")
                        .setTitle(`**Warned**`)
                        .setDescription(`${mentionMember.user.tag} has been warned!`)
                        .addFields(
                            {
                                name: "**Reason** :",
                                value: `${reason}`,
                                inline: true
                            }
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                        .setFooter("For any bugs or other questions mention Craftplay developers")
                    return msg.channel.send(firstAdded)

                } else if (punishment === 2) {
                    await mentionMember.roles.remove(warnRole1.id).catch(err => console.log(err));
                    await mentionMember.roles.add(warnRole2.id).catch(err => console.log(err));
                    const scnAdded = new Discord.MessageEmbed()
                        .setColor("#a0e43f")
                        .setTitle(`**Warned**`)
                        .setDescription(`${mentionMember.user.tag} has been warned!`)
                        .addFields(
                            {
                                name: "**Reason** :",
                                value: `${reason}`,
                                inline: true
                            }
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                        .setFooter("For any bugs or other questions mention Craftplay developers")
                    return msg.channel.send(scnAdded)

                } else if (punishment === 3) {
                    await mentionMember.roles.remove(warnRole2.id).catch(err => console.log(err));
                    await mentionMember.roles.add(warnRole3.id).catch(err => console.log(err));
                    const thirdAdded = new Discord.MessageEmbed()
                        .setColor("#a0e43f")
                        .setTitle(`**Warned**`)
                        .setDescription(`${mentionMember.user.tag} has been warned!`)
                        .addFields(
                            {
                                name: "**Reason** :",
                                value: `${reason}`,
                                inline: true
                            }
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                        .setFooter("For any bugs or other questions mention Craftplay developers")
                    return msg.channel.send(thirdAdded)

                }
                else if (punishment === 4) {
                    await mentionMember.roles.remove(warnRole2.id).catch(err => console.log(err));
                    await mentionMember.roles.add(warnRole3.id).catch(err => console.log(err));
                    const willbeMuted = new Discord.MessageEmbed()
                        .setColor("#a0e43f")
                        .setTitle(`**Warned**`)
                        .setDescription(`${mentionMember.user.tag} you have reached 3 warnings!`)
                        .addFields(
                            {
                                name: "**Reason** :",
                                value: `${reason}`,
                                inline: true
                            }
                        )
                        .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                        .setFooter("For any bugs or other questions mention Craftplay developers")
                    return msg.channel.send(willbeMuted)


                } else if (args[1] == 'remove') {
                    if (punishment == 1) {
                        const removingZero = new Discord.MessageEmbed()
                            .setColor("#a0e43f")
                            .setTitle(`**Removing **`)
                            .setDescription(`${mentionMember.user.tag} has no warnings!`)
                            .addFields(
                                {
                                    name: "**Removed by** :",
                                    value: `${msg.author}`,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                            .setFooter("For any bugs or other questions mention Craftplay developers")
                        return msg.channel.send(removingZero)

                    } else if (punishment === 2) {
                        await mentionMember.roles.remove(warnRole1.id).catch(err => console.log(err));

                        const removingfirst = new Discord.MessageEmbed()
                            .setColor("#a0e43f")
                            .setTitle(`**Removing**`)
                            .setDescription(`Removed ${mentionMember.user.tag} a warning`)
                            .addFields(
                                {
                                    name: "**Removed by** :",
                                    value: `${msg.author}`,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                            .setFooter("For any bugs or other questions mention Craftplay developers")
                        return msg.channel.send(removingfirst)

                    } else if (punishment === 3) {
                        await mentionMember.roles.remove(warnRole2.id).catch(err => console.log(err));

                        const removingTwo = new Discord.MessageEmbed()
                            .setColor("#a0e43f")
                            .setTitle(`**Removing**`)
                            .setDescription(`Removed ${mentionMember.user.tag} a warning`)
                            .addFields(
                                {
                                    name: "**Removed by** :",
                                    value: `${msg.author}`,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                            .setFooter("For any bugs or other questions mention Craftplay developers")
                        return msg.channel.send(removingTwo)

                    }
                    else if (punishment === 4) {
                        await mentionMember.roles.remove(warnRole3.id).catch(err => console.log(err));

                        const removingThree = new Discord.MessageEmbed()
                            .setColor("#a0e43f")
                            .setTitle(`**Warned**`)
                            .setDescription(`${mentionMember.user.tag} you have reached 3 warnings!`)
                            .addFields(
                                {
                                    name: "**Reason** :",
                                    value: `${reason}`,
                                    inline: true
                                }
                            )
                            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
                            .setFooter("For any bugs or other questions mention Craftplay developers")
                        return msg.channel.send(removingThree)
                    }
                    
                }
            }
        }



    }
}
