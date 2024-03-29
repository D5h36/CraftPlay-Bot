const config = require('../config.json');
module.exports = {
    name: 'tclose',
    description: "test command",
    execute(msg, args, client, Discord) {

        const user = msg.author;
        // getting the tickets category
        const categoryID = msg.member.guild.channels.cache.find(c => c.name == "TICKETS")

        // if no ticket category return
        if (!categoryID) return;

        // only ppl with this perm can close the ticket 
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return;

        // if the channel is a ticket then...
        if (msg.channel.parentID == categoryID) {

            // deletes the ticket / channel
            msg.channel.delete();
            const channells = msg.channel.name;
            const user = msg.author;
            let reason = args.slice(0).join(" ");
            if (!reason) reason = "No reason provided";
            const staffCloseed = new Discord.MessageEmbed()
            
                .setColor("#a0e43f")
                .setTitle("Staff Closed a ticket")
                .setDescription(`${user} closed a channel ${channells}`)
                .addFields(
                    {
                        name: "Ticket about:",
                        value: `${reason}`,
                        inline: true
                    }
                )
                .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png%22")
                .setFooter("For any bugs or other questions mention Craftplay developers");
            client.channels.cache.get(config.stafflogs).send(staffCloseed)



            // if its not a ticket channel return
        } else {
            return;
        }

    }
}
