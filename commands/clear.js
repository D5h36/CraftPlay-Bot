const Discord = require('discord.js');
const { red, green, blue, yellow, cyan, greenBright, redBright, grey, yellowBright, cyanBright, black, blueBright, bgBlue, gray, bgGray } = require('chalk');

module.exports = {
    name: 'clear',
    description: 'clear messages',
    async execute(msg, args){
        if(msg.member.permissions.has('ADMINISTRATOR')){
            msg.delete()
            const amount = new Discord.MessageEmbed()
            .setColor("#a0e43f")
      .setTitle("**Clear unsuccessful**")
      .setDescription("Please enter amount of messages you want to delete")
      .addFields(
        {
            name: "Command:",
            value: "~clear amount",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
        if(!args[0]) return msg.channel.send(amount);
        const realNumb =  new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Clear unsuccessful**")
      .setDescription("Please enter real numbers")
      .addFields(
        {
            name: "Command:",
            value: "~clear amount",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
        if(isNaN(args[0])) return msg.channel.send(realNumb);
            const cantCount = new Discord.MessageEmbed()
            .setColor("#a0e43f")
      .setTitle("**Clear unsuccessful**")
      .setDescription("Can't clear more that 100 messages at time")
      .addFields(
        {
            name: "Command:",
            value: "~clear amount",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
        if(args[0] > 100) return msg.channel.send(cantCount);
        const least = new Discord.MessageEmbed()
        .setColor("#a0e43f")
      .setTitle("**Clear unsuccessful**")
      .setDescription("Need to clear at least 1 message")
      .addFields(
        {
            name: "Command:",
            value: "~clear amount",
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")

        if(args[0] < 0) return msg.channel.send(least);

        
        await msg.channel.messages.fetch({limit: args[0]}).then(messages =>{
           msg.channel.bulkDelete(messages); 
           const deleted = new Discord.MessageEmbed()
           .setColor("#a0e43f")
      .setTitle("**Clear successful**")
      .setDescription(`Successfuly cleared [${messages.size}] messages`)
      .addFields(
        {
            name: "**Cleared by** :",
            value: `${msg.author}`,
            inline: true
        }
    )
    .setThumbnail("https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png")
    .setFooter("For any bugs or other questions mention Craftplay developers")
           msg.channel.send(deleted) + console.log( "[" + green("Craft") + gray("Play")+ "]" + yellowBright(`${messages.size} messages got deleted by ${msg.author.tag} at ${msg.channel.name}!`))
        });
    
    }else {
        msg.channel.send('Lmao u dont have perms for that!') 
    }
    }
        




    
}