const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'userinfo',
    description: "User info!",
     async execute(msg, args){
         msg.delete()
        let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "online";
                break;
            case "dnd":
                status = "dnd";
                break;
            case "idle":
                status = "idle";
                break;
            case "offline":
                status = "offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username} stats!`)
            .setColor(`#a0e43f`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Name: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Tag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: 'Join Date: ',
                    value: user.joinedAt.toLocaleDateString("en-us"), 
                },
                {
                    name: 'Account made: ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: "Current Status: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Activity: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't doing anything!`,
                    inline: true
                },
                {
                    name: 'Roles: ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )
            .setFooter(`User id: ${user.user.id}`);

        await msg.channel.send(embed)
            }
        }