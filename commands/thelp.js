module.exports = {
    name: 'thelp',
    description: "test command",
    execute(msg, args, client, Discord){
        const help = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Ticket system**")
      .setDescription("If you have any questions/bug or player reports\nGo to Support category and make a ticket\nCraftPlay staff team will be happy to help!\n**To create a ticket:**")
      .addFields(
        {
            name: "Go to SUPPORT category",
            value: "in #ticket make a ticket",
            inline: true
        },
        {
            name: "Command",
            value: "~ticket",
            inline: true
        }
    )
      .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
      .setFooter("For any bugs or other questions mention Craftplay developers")
      msg.channel.send(help)
    }
}
