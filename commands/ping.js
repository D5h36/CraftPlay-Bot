module.exports = {
    name: 'ping',
    description: "test command",
    execute(msg, args){
        msg.channel.send("test command to see if bot works")
    }
}
