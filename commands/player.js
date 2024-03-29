const mojang = require('mojang-api');

const https = require('https');
module.exports = {
    name: 'player',
    description: 'Diplays players name, uuid, skin, cape and name history',
    execute(msg, args){
        msg.delete()
        if(!args.length) {
            msg.reply('please specify the player\'s uuid');
            return;
        }
        //get uuid
        this.getUuid(args[0], (err, uuid) => {
            if(err) {
                const error = 
                msg.channel.send('An error occurred. This might be because the player does not exist');
                return;
            }
            //check that uuid exists
            mojang.profile(uuid, (err, resp) => {
                if(err) {
                    msg.reply('that player\'s uuid does not exist');
                    return;
                }
                //get name history
                mojang.nameHistory(uuid, (err, resp1) => {
                    if(err) {
                        msg.reply('there was an error trying to retrieve the data');
                        console.log(err);
                        return;
                    }
                    let nameHistory = [];
                    resp1.forEach(element => {
                        nameHistory.push(element.name);
                    });
                    nameHistory = nameHistory.join(', ');
                    //create embed message
                    let embedMessage = {
                        color: '#a0e43f',
                        title: resp.name + "'s profile",
                        description: "Minecraft user info",
                        thumbnail: {
                            url: 'https://cdn.discordapp.com/attachments/732692223883477133/841020988325363712/newlogocp.png'
                        },
                        fields: [
                        {
                            name: 'UUID',
                            value: resp.id
                        },
                       ],
                        image: {
                            url: 'https://crafatar.com/renders/body/' + resp.id + '.png?overlay'
                        },
                        timestamp: new Date(),
                        footer: {
                            text: 'Minecraft info bot\nData updated every 20 minutes'
                        }
                    };
                    //check if cape exists
                    let cape = 'https://crafatar.com/capes/' + resp.id + '.png';
                    const req = https.request(cape, res => {
                        if(res.statusCode == 200) {
                            embedMessage.fields.push({ name: 'Cape', value: cape });
                        }
                        embedMessage.fields.push({ name: 'Name history', value: nameHistory });
                        //send embed
                        msg.channel.send({  embed: embedMessage  });
                    });
                    req.on('error', err => {
                        console.log(err);
                        msg.reply('there was an error while retrieving the cape');
                    })
                    req.end();
                });
            });
        });
        
    },
    //function to get uuid from uuid/name
    getUuid(value, cb) {
        let error = false;
        let regex = /^[a-f0-9]{32}$/i //regex for uuids
        if(!value.match(regex)) {
            mojang.nameToUuid(value, (err, resp) => {
                if(err || !resp.length) {
                    error = true;
                    cb(error, null);
                    return;
                }
                cb(error, resp[0].id);
            });
        }
        else { cb(error, value); }
    
    }
}
