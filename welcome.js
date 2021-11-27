const { Message } = require("discord.js");
TestServerWelcomeChannel = `880600058838540332`;
TestServerModeratorChannel = `880600058255507567`;
LiveServerWelcomeChannel = `765328010831593482`;
LiveServerModeratorChannel = `765358425643155477`;

module.exports = client =>{
    client.on(`guildMemberAdd`, member => {

        console.log(`<CLIENT>${member.username}(${member.id}) has joined the server.`); //Logs member join in console.
        
        //Member role auto assign.
        let memberRole = member.guild.roles.cache.find(role => role.id == `765345784698503170`);//Get role "The Bois"
        member.roles.add(memberRole);//Assign role "The Bois"

        //Welcome channel & Modlog messages.
        member.guild.channels.cache.get(LiveServerWelcomeChannel).send(`Hello, <@${member.id}>! Welcome to The Cornucopia!`);//#welcome
        member.guild.channels.cache.get(LiveServerModeratorChannel).send(`<@${member.id}> has joined the server.`);//#modlog
    })


    //This doesnt work right... eh.
    client.on(`guildMemberRemove`, member =>{
        console.log(`<CLIENT>${member.username}(${member.id}) has left the server.`); //Logs member leave in console.
        member.guild.channels.cache.get(LiveServerModeratorChannel).send(`User with the ID (${member.id}) has left the server.\n
        I dunno how to display their name here, so check the ID here if you really wanna know.\nhttps://discord.id/`) //Modlog message.
        
    })
}