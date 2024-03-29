const config = require('../config.json');
module.exports = {
    name: 'walson',
    description: "test command",
    execute(msg, args, client, Discord){
        msg.channel.send(`${config.walson}`)
    }
}
