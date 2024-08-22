const { ApplicationCommandOptionType,AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { db } = require(`../../../utils/database_test.js`);

module.exports = {
    name: 'flowers',
    description: 'send someone flowers',
    options: [
        {
            name: 'target-user',
            description: 'the user you want to send to',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],
    
    callback: async (client, interaction) =>{
        const target = interaction.options.get('target-user');
        const target_user = interaction.options.getUser('target-user');
        const origin_user = interaction.user;
        // example timestamp 2024-08-21T22:31:18.584Z
        const timestamp = interaction.createdAt;
        console.log(timestamp);

        const target_id = '<@'+ target.user.id +">";
   
        var targetname = target_user.displayName;

        //getting origin user's guild name
        const originname = interaction.member.displayName;
        let file = new AttachmentBuilder('./assets/flowers.gif');

        //data base stuff
        let info = {originuser: parseInt(origin_user.id), targetuser: parseInt(target.user.id), category: "flowers", value:1};
        //create/insert
        const insert = db.prepare(`INSERT INTO interaction (originuser, targetuser, category, value) 
                                    VALUES (@originuser, @targetuser, @category, @value)
                                    ON CONFLICT(originuser, targetuser, category) DO UPDATE SET value = value + 1`).run(info);
        
        //retrieve value(number of times hugs occured from the origin to the target user) for the display message below
        delete info.value;
        var num_sent = (db.prepare(`SELECT value FROM interaction 
                                WHERE originuser = @originuser 
                                AND targetuser = @targetuser
                                AND category = @category `).get(info));

        //getting time of user - hhmm
        let num = parseInt(timestamp.toISOString().substring(11,13) + timestamp.toISOString().substring(14,16));
        let time_arr = ['morning','afternoon','evening','night'];
        let time = 'undefined';

        // determining time of day
        if( 500 <= num && num <= 1200 ){
            time = time_arr[0];
        } 
        else if(1201 <= num && num <= 1700){
            time = time_arr[1];
        }
        else if(1701 <= num && num <= 2100){
            time = time_arr[2];
        }
        else if((2101 <= num && num <= 2400) || ( 0 <= num && num<= 499) ){
            time = time_arr[3];
        }
        
        // let rarity_arr = ['common', 'unusual','rare'];
        let rare = ['common'];
        if (num_sent >= 50){
            rare.append('unusual');
        }
        if (num_sent >= 100){
            rare.append('rare');
        }

        // database queries
        // let pool = []
        
        let pool = db.prepare(`SELECT DISTINCT name
                            FROM flower 
                            WHERE rarity IN (${rare.map(()=>'?').join(',')})
                            OR time = ?`).all([...rare, time]);
            
        const flower_name = pool[Math.floor(Math.random() * pool.length)].name;
        // console.log(pool);
        // console.log(flower_name);
    
        // interaction.reply({embeds: [embed], files: [file]});
        interaction.reply( {content:`${target_id}, ${originname} sent you a ${flower_name}!`, files:[file]});
    }
}
    
