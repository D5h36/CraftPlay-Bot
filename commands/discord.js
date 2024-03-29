
module.exports = {
    name: 'discord',
    description: "discord server info ",
    async execute(msg, args, client, Discord){
        msg.delete();
        let region;
        switch (msg.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }
        const owner = await msg.guild.members.fetch(msg.guild.ownerID);
        const embed = new Discord.MessageEmbed()
            .setThumbnail(msg.guild.iconURL({dynamic : true}))
            .setColor('#a0e43f')
            .setTitle(`${msg.guild.name} server stats`)
            .addFields(
                {
                    name: "Owner: ",
                    value: msg.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Members: ",
                    value: `${msg.guild.memberCount}`,
                    inline: true
                },
                {
                    name: "Members Online: ",
                    value: `${msg.guild.members.cache.filter(m => m.user.presence.status == "online").size}`,
                    inline: true
                },
                {
                    name: "Total Bots: ",
                    value: `${msg.guild.members.cache.filter(m => m.user.bot).size}`,
                    inline: true
                },
                {
                    name: "Creation Date: ",
                    value: msg.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Roles Count: ",
                    value: `${msg.guild.roles.cache.size}`,
                    inline: true,
                },
                {
                    name: "\u200b",
                    value: `\u200b`,
                    inline: true,
                },
                {
                    name: "**Invite** :",
                    value: `https://discord.gg/7XtZM9mtP6`,
                    inline: true,
                }
                
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
            .setFooter("For any bugs or other questions mention Craftplay developers")
        await msg.channel.send(embed)
    }
}
