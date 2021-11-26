const Discord = require('discord.js');//Imports Discord.js
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES",] }) //Defines this bot as Client & sets intents
const { prefix, token } = require('./config.json'); //Get the prefix & Token
const command = require('./command'); //Import command handler.
const welcome = require('./welcome'); //Import greeter.
const { off } = require('process');
const { Permissions } = require(`discord.js`);

//Definitions
const makiId = `580551626604150786`;//User ID for Maki. //DO NOT FORGET TO CHANGE TO ACTIVE FOR RELEASE\\
var welcomeChannel = '765328010831593482'; //#welcome
var modChannel = '765358425643155477'; //#modlog
var botChannel = '765349260932677661'; //#bot-spam
var chufuChannel = '831947558188089394'; //#chufu-children-announcements
var announcementsChannel = `765314742578577419`; //#announcements

//Arrays that hold responses to various commands. There is probably a better way to do this but I don't really care.
const answer = [`Yes.`,`No.`,`Maybe.`,`Definitely not.`,`Absolutely!`,`Perhaps.`,`Maybe.`,`Does Lav annoy me?`,`Whatever your heart tells you.`,`That's not for me to decide.`,
	`That's for you to decide.`,`I'm not sure...`];
const music = [/*Daring!*/`https://open.spotify.com/track/3DHy42n9fubpaSpZM8Jxyn?si=J_o3keQ5Rx69S60gkWaQ_A`,
/*愛してるばんざーい！(Prepro Piano Mix)*/`https://open.spotify.com/track/6RCTcUZqDBtZYimNwQWwtx?si=sO8ARJKJSMyPkERmLUcajA`,
/*START:DASH!!(Prepro Piano Mix)*/`https://open.spotify.com/track/5QmhkYnW2wL94uhrnfE6FK?si=-AFCrt1qRRmy3D4jo6tHzQ`,
/*もぎゅっと"love"で接近中!*/`https://open.spotify.com/track/3k5k4LcxTEk8um2c2MTIf2?si=Oh_9V93CR5eXJ7nFB-2Tsw`,
/*愛してるばんざーい！*/`https://open.spotify.com/track/2kjS5V2UxlzH1YyG1mNoLg?si=zieYl7FRTB--yp05FJNAMA`,
/*soldier game*/`https://open.spotify.com/track/0XCEhfIYePqS49DAks8NCR?si=KKsCo0W2Rn6mtgQuow6o0Q`,
/*Wonderful Rush*/`https://open.spotify.com/track/5tzhISMmckmqN3eI5k2VnK?si=hg9Nw3nwRuOngPFGyP7NHg`,
/*Oh,Love&Peace!*/ `https://open.spotify.com/track/3zYTT9YwTXF2w9aEhobjpX?si=r5j8Lw32TLSZk2R7AL35-g`,
/*僕らは今のなかで*/`https://open.spotify.com/track/2bI19a4IfWmEThsgm4oO4P?si=cP8ZCNoURpq9bgCDe9nJOg`,
/*WILD STARS*/`https://open.spotify.com/track/4YfKeV5uZ2d87PMjYOJ09K?si=lDF7HQJVTkyhccW8s35CHQ`,
/*きっと青春が聞こえる*/`https://open.spotify.com/track/667a09deoxFolWKc8sXRug?si=EgIDygwZT0q0dzoDFSj--Q`,
/*輝夜の城で踊りたい*/`https://open.spotify.com/track/2w0ad8c71rQr3BVin2bk5B?si=GD3S-bwoQQiG0JAA_C2DHQ`,
/*これからのSomeday*/`https://open.spotify.com/track/3Y5ZxO7Ub163zQrgljEg0A?si=2iTo_3rhRFGuALzMiZdSTw`,
/*Wonder zone*/`https://open.spotify.com/track/35NlXKxboZxdimairpeKTj?si=tSy7oz_WTZ29Fl05MNqykA`,
/*No Brand Girls*/`https://open.spotify.com/track/7cxcYSIxtrjk7pGc9MDaJM?si=qaMjeXqFRb6ajcnj3alVyQ`,
/*START:DASH!!*/`https://open.spotify.com/track/5wjNi4wt5UhGKUB6YX7zsG?si=7DoYQX-KS9C-JeH054F-IQ`,
/*Music S.T.A.R.T!!*/`https://open.spotify.com/track/0WHPGJTpwZaf8y1UV3QdGk?si=eoEHfaWoSDeJpCrybmuQnQ`,
/*LOVELESS WORLD*/`https://open.spotify.com/track/1B3VexWINXVz82OihgmdEb?si=yOrb-BczRQqa4Nxy4eyuhg`,
/*タカラモノズ*/`https://open.spotify.com/track/6y06DGltNJy6Jcr2xGHz5O?si=bksk352BSeyE3AjXMCF_hw`,
/*Paradise Live*/`https://open.spotify.com/track/2OW4Hd3n9haVdR5Zn3bqrV?si=jkbhbfiyQjSN5r0E0D6myQ`,
/*それは僕たちの奇跡*/`https://open.spotify.com/track/4mfmnzFUfmHSJ1ZqImMrZP?si=qlLnFMOSSMm8njQU6mYo4g`,
/*だってだって噫無情*/`https://open.spotify.com/track/34OAPJubqav8Aw6iUOdPdR?si=qiHQqRwhTIO1jAgIHpl4kA`,
/*どんなときもずっと*/`https://open.spotify.com/track/5GYUhLGzS11xm5btVPHHxI?si=mdmQ5kUoT4qHwUynaBrZPw`,
/*COLORFUL VOICE*/`https://open.spotify.com/track/0CvRFePuRPATq9GdLn6fgR?si=OC9gcQpVQRCzj6MP5Og-6A`,
/*ユメノトビラ*/`https://open.spotify.com/track/21qbXFBd8HwEOMSSDGXoQu?si=lxfsHv_WTt2qW6U3deA_kw`,
/*SENTIMENTAL StepS*/`https://open.spotify.com/track/4C3VlSR8JgBgQDba1oLuN9?si=6icIBLPmQge_AQIDBB5Y9w`,
/*Love wing bell*/`https://open.spotify.com/track/6LLsQmBBSxKHXnDrIgb9Fa?si=Urca0PAxTKKhMgryddScsQ`,
/*Dancing stars on me!*/`https://open.spotify.com/track/5HLyMaq5FRnAGKL8Pa5a1p?si=eXSVeWdnQtu779M5MSykYg`,
/*KiRa-KiRa Sensation!*/`https://open.spotify.com/track/1FQtJeQvgAxUgkw24ExQje?si=16eu4im9SceZSLVmfYqjbQ`,
/*Happy maker!*/`https://open.spotify.com/track/41jSQUrMBe5lzNh14tdP9L?si=C4eqyHK5R7yOUjpfsEDXVQ`,
/*Shangri-La Shower*/`https://open.spotify.com/track/7A5OiV4JOr0wj8CglkTVXw?si=kVOCCbqLRcKZTeu51FrYPQ`,
/*るてしキスキしてる*/`https://open.spotify.com/track/3owKczRQyzdN2ChQuEVz6x?si=GS5Xq7wBQKS4m5I41cgblw`,
/*ミはμ'sicのミ*/`https://open.spotify.com/track/1WMehrhlAN82bbdZjJGOBg?si=gKM7SCuSSciNLpC5MQBp7w`,
/*Super LOVE=Super LIVE!*/`https://open.spotify.com/track/3hp60Q66vso6i7bEkdASw4?si=atA5KjYSTSGOxwXTyjpxag`,
/*Angelic Angel*/`https://open.spotify.com/track/4y2417gcL7BMhoMm0Uh7Eh?si=gCE7kJMpTL2xc9y9F0D89Q`,
/*SUNNY DAY SONG*/`https://open.spotify.com/track/4qdC976sD7ymOwEF0FhaOA?si=EBr8RRhvTOC9BVUrGfjlSg`,
/*僕たちはひとつの光*/`https://open.spotify.com/track/57irsqAgn1HuwrAGgYJKAs?si=H854dSR_TWCH843jWJQCxg`,
/*Hello,星を数えて*/`https://open.spotify.com/track/3ntlhATU5NiUMBDWxkN6Bc?si=EwLnrLxaRmqsAWrpIE33GA`,
/*Cutie Panther*/`https://open.spotify.com/track/0QuJgSJR6HsTSSOoSKNkxh?si=GKjwO86ZTf-o8bMrWJEdmQ`,
/*夏、終わらないで。*/`https://open.spotify.com/track/5rzMhXsY6PzNq3CMJfhdci?si=m1pA2tt4Se2y2GA2LeR2Ug`,
/*冬がくれた予感*/`https://open.spotify.com/track/2JE7CKFMa6YPNTSOI0QtTg?si=Ce_JbIUISqOx7IFk89G48w`,
/*Trouble Busters*/`https://open.spotify.com/track/3MMrLUuuJivCBaZQew5gEU?si=dk2YmHibSF2FAqvrDnDLFw`,
/*錯覚CROSSROADS*/`https://open.spotify.com/track/5imuzrnqWbvRrVKYZm3ZT9?si=kds11kkGTFWfefTkNvVU7w`,
/*PSYCHIC FIRE*/`https://open.spotify.com/track/0UhOzd5xRr0fOYABEFzc7u?si=H6I1eEyKRFSKztCVj1m77A`,
/*HEART to HEART!*/`https://open.spotify.com/track/6BzlmGqkp4ANrUrqswdOKc?si=m-EcIRtAS8mB5MmfsJKqEQ`,
/*嵐のなかの恋だから*/`https://open.spotify.com/track/1vg4Y4m6uSjuiArhyzAk2j?si=LZN1hoeKRuuqsGPYy23qGg`,
/*MOMENT RING*/`https://open.spotify.com/track/4dalDCVIv28H56oyaQPb0q?si=Fm8LWA86RGizg8ohH5w8mA`,
/*ちようならへちよなら！*/`https://open.spotify.com/track/7By60SjgyFOKaO6wlrenes?si=01nGkLe9Q4yY3XqoRZCzVQ`,
/*Beat in Angel*/`https://open.spotify.com/track/1Nzb803VRUIJGJkxta9Ghy?si=qskXdDKtTi6j-d5WX-I1hA`,
/*LONELIEST BABY*/`https://open.spotify.com/track/1uSxgMMXDJ40hSfXCqe2HF?si=Q75vnGEBSbun4SH_wzdmOQ`,
/*ずるいよMagnetic today*/`https://open.spotify.com/track/2DQaqVjws9yP317J50JXFx?si=RFgS4f0pSbeX-OorCl6Mxg`,
/*そして最後のページには*/`https://open.spotify.com/track/3pkpk4BgTbnXgA6u9KbJRc?si=AKOjyHZKSwaYP_hCNXxrxQ`,
/*Silent tonight*/`https://open.spotify.com/track/1X0dgD1RzVec0skMKvGPQK?si=2MzgC8X2TBmpf2CF91c3Ag`,
/*これから*/`https://open.spotify.com/track/4nF2qxhXHNzSZxbdWVCXXx?si=uAiJEB-2SkWrsKkl9th1Yg`,
/*秘密と花園*/`https://open.spotify.com/track/1TbDgEyDzKbP5B0kHhgLtA?si=hV5WICHoR52Zn2lFtKEzJQ`,
];
const kabedons = [`https://tenor.com/view/kabedon-yohariko-yoshiko-yohane-love-live-gif-20913824`,`https://tenor.com/view/ninomae-ina-kabedon-gif-19860831`,
	`https://tenor.com/view/darling-in-the-franxx-kabedon-zero-two-hiro-bath-gif-17340018`,`https://tenor.com/view/tohru-maid-dragon-kabedon-gif-18154238`,
	`https://tenor.com/view/kyo-tohru-kabedon-fruits-basket-kyoru-gif-17399071`,`https://tenor.com/view/kabedon-anime-what-is-it-i-just-wanted-to-stop-you-gif-14915688`,
	`https://tenor.com/view/classroom-of-the-elite-cote-ayanokoji-kiyotaka-ayanokoji-kabedon-gif-20947831`
];
const pat = [`https://tenor.com/view/rikka-head-pat-pat-on-head-anime-rikka-gif-13911345`,`https://tenor.com/view/rascal-does-not-dream-of-bunny-girl-senpai-seishun-buta-yar%C5%8D-anime-head-pat-rest-gif-17747839`,
	`https://tenor.com/view/kanna-kamui-pat-head-pat-gif-12018819`,`https://tenor.com/view/pat-head-loli-dragon-anime-gif-9920853`,`https://tenor.com/view/head-pat-anime-gif-10204936`,
	`https://tenor.com/view/nogamenolife-shiro-headrub-sleepy-tired-gif-6238142`,`https://tenor.com/view/anime-head-pat-anime-head-rub-neko-anime-love-anime-gif-16121044`,
	`https://tenor.com/view/anime-neko-anime-head-pat-anime-head-rub-neko-para-gif-16085488`,`https://tenor.com/view/anime-head-pat-anime-head-rub-neko-anime-wolf-anime-gif-16085342`,
	`https://tenor.com/view/kaede-azusagawa-kaede-gif-head-headpat-gif-13284057`
];
const bonk = [`https://tenor.com/view/bonk-rikka-takanashi-rikka-takanashi-smack-gif-20833239`,`https://cdn.discordapp.com/attachments/582298043878211595/841567974276071444/Nipah.gif`,
	`https://tenor.com/view/chuunibyou-hit-bonk-chop-stopit-gif-8229175`,`https://tenor.com/view/anime-hit-bonk-rikka-gif-18191826`,`https://tenor.com/view/chuunibyou-anime-bully-bonk-kumin-gif-20952854`,
	`https://tenor.com/view/toradora-taiga-good-morning-window-smack-gif-21310705`,`https://tenor.com/view/bonk-anime-super-bonk-gif-19740955`,`https://tenor.com/view/touka-kirishima-tokyo-ghoul-anime-gif-17402810`,
	`https://tenor.com/view/anime-konosuba-bonk-gif-21337536`,`https://tenor.com/view/hologra-hololive-anime-achan-alarm-clock-gif-21019759`,`https://tenor.com/view/powerful-head-slap-anime-death-tragic-gif-14358509`
];
const hug = [`https://tenor.com/view/sao-kirito-sinon-hug-grenade-gif-5065618`,`https://tenor.com/view/anime-hug-hug-hugs-anime-girl-anime-girl-hug-gif-16787485`,`https://tenor.com/view/hug-cat-cute-aww-anime-gif-9200935`,
	`https://tenor.com/view/beyond-the-boundary-anime-hugs-funny-cute-gif-13747286`,`https://tenor.com/view/anime-hug-anime-anime-love-hug-comfort-gif-14599424`,`https://tenor.com/view/anime-hug-love-smile-gif-15942846`,
	`https://tenor.com/view/hug-anime-gif-11074788`,`https://tenor.com/view/anime-hug-sweet-love-gif-14246498`
];
const slap = [`https://tenor.com/view/girl-slap-anime-mad-student-gif-17423278`,`https://tenor.com/view/bunny-girl-slap-angry-girlfriend-anime-gif-15144612`,
	`https://tenor.com/view/when-you-cant-accept-reality-slap-anime-gif-14694312`,`https://tenor.com/view/anime-slap-dog-gif-13278667`,
	`https://tenor.com/view/shikamaru-temari-naruto-gif-shippuden-gif-8576304`,`https://tenor.com/view/anime-slap-horse-slap-funny-gif-8562186`,
	`https://tenor.com/view/slap-%E0%B8%99%E0%B8%8A-neon-genesis-evangelion-anime-rei-ayanami-gif-17303228`,`https://tenor.com/view/barakamon-kid-funny-anime-slap-gif-4991177`,
	`https://tenor.com/view/anime-slap-cute-gif-21281337`,`https://tenor.com/view/my-hero-academia-hero-tsuyu-asui-froppy-minoru-mineta-gif-16516096`];
const cry = [`https://tenor.com/view/anime-cry-crying-inosenpai-sad-gif-16477983`,`https://tenor.com/view/anime-cry-girl-gif-14682297`,
	`https://tenor.com/view/anime-girl-sad-sad-anime-girl-anime-cute-gif-17580434`,`https://tenor.com/view/akame-crying-akame-cry-akame-cry-anime-gif-21400744`,
	`https://tenor.com/view/free-iwatobi-swim-club-anime-gif-8199739`,`https://tenor.com/view/llorar1-cry-sad-tears-anime-gif-5648908`,
	`https://tenor.com/view/sailormoon-cry-anime-gif-5643407`,`https://tenor.com/view/anime-anime-panic-panic-anime-cry-crying-gif-19877294`];
const sleep = [`https://tenor.com/view/umaru-sleeping-tired-exhausted-anime-gif-10119996`,`https://tenor.com/view/mashiro-drool-sleep-anime-gif-10173924`,
	`https://tenor.com/view/gakkou-anime-sleep-gif-4718185`,`https://tenor.com/view/kanna-kanna-kamui-dragon-maid-miss-kobayashis-dragon-maid-sleep-gif-16298733`,
	`https://tenor.com/view/anime-sleep-sleeping-sleepy-tired-gif-9340393`,`https://tenor.com/view/loli-dragon-anime-sleeping-gif-9920974`,
	`https://tenor.com/view/anime-sleeping-sleep-asleep-gif-12048209`,`https://tenor.com/view/anime-tired-sleep-gif-9187874`];
const nom = [`https://tenor.com/view/loli-bite-cute-mordida-anime-gif-16156797`,`https://tenor.com/view/gamerchick42092-anime-nom-bite-gif-12051598`,
	`https://tenor.com/view/mad-angry-ill-bite-you-anime-bite-gif-8220087`,`https://tenor.com/view/anime-zombielandsaga-nom-bite-tae-gif-13341413`,
	`https://tenor.com/view/anime-kon-hmph-eat-hungry-gif-20959855`,`https://tenor.com/view/eat-crab-anime-loli-dragon-gif-9920851`,`https://tenor.com/view/eat-crepe-strawberry-loli-dragon-gif-9920838`,
	`https://tenor.com/view/eat-eating-munch-hungry-starving-gif-4874882`,`https://tenor.com/view/girl-anime-eat-bite-burger-gif-17533177`];
//That's the end of the responses section. I'm sorry.


client.on('ready', () => 
{
	console.log(`<CLIENT>Logged in with token (${token})`); //Token located in config.json
	console.log(`<CLIENT>Current prefix is '${prefix}'`); //Prefix located in config.json
	console.log(`<CLIENT>Setting display activity...`);
	client.user.setActivity(`m!info`);
	console.log(`<CLIENT/READY>μ's, Music: start!`);
	welcome(client); //Initializes greeter functions.
	client.setMaxListeners(30); //Node complains unless I do this and I don't know exactly why.

///Public Commands
//Ping command - ping pong. Make this return time in the future!
	command(client, 'ping', message =>{
		message.channel.send('Pong!');
	})
//Help command - Gives information about Maki
	command(client, ['info', `help`], message =>{
		message.channel.send("A Full list of commands can be found here: \nhttps://www.noblecorn.net/maki-bot");
	})
//Ask - Q & A with Maki
	command(client, 'ask', message =>{
		message.channel.send(answer[Math.random() * answer.length | 0]);
	})
//Music - Gives random Maki song.
	command(client, 'music', message =>{
		message.channel.send(`You want to hear me sing a song? Okay, um... how about this one? \n` +music[Math.random() * music.length | 0]+``);
	})
//Kabedon - kabeDON!
	command(client, `kabedon`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> wants to Kabedon themself.\n${kabedons[Math.random() * kabedons.length | 0]}`)
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> has Kabedon'd <@${targetMember.id}>. How shameless...\n${kabedons[Math.random() * kabedons.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`Don't even think about it, <@${member.id}>.`)
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> Sorry, I don't recognize that name. Did you use a valid user ID?`)			
		}
	})
//Pat - Pat the Head.
	command(client, `pat`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> patted their own head.\n${pat[Math.random() * pat.length | 0]}`)
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> patted <@${targetMember.id}> on the head.\n${pat[Math.random() * pat.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`<@${member.id}> patted me on the head...\n${pat[Math.random() * pat.length | 0]}`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> Sorry, I don't recognize that name. Did you use a valid user ID?`)			
		}
	})
//Bonk - Like a pat but abusive.
	command(client, `bonk`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> slammed their head against a wall.\nhttps://tenor.com/view/anime-hand-bang-banging-head-on-wall-hadit-angry-gif-14116422`)
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> bonked <@${targetMember.id}> on the head.\n${bonk[Math.random() * bonk.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`Don't go there <@${member.id}>.`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> Sorry, I don't recognize that name. Did you use a valid user ID?`)			
		}
	})
//Hug - You ever think about how weird hugging is?
	command(client, `hug`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> hugs their daki. \nhttps://tenor.com/view/sad-cute-anime-pillow-hugs-gif-17231623`);
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> gave <@${targetMember.id}> a hug!\n${hug[Math.random() * hug.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`O-oh... Thanks I guess <@${member.id}>... \nhttps://tenor.com/view/love-live-anime-gif-19524742`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> Sorry, I don't recognize that name. Did you use a valid user ID?`)			
		}
	})
//Slap - Like a bonk but sideways.
	command(client, `slap`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> slapped themself.\n${slap[Math.random() * slap.length | 0]}`);
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> slapped <@${targetMember.id}>.\n${slap[Math.random() * slap.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`Very funny <@${member.id}>.`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> Sorry, I don't recognize that name. Did you use a valid user ID?`)			
		}
	})
//Cry - Let it all out.
	command(client, `cry`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> started crying.\n${cry[Math.random() * cry.length | 0]}`);
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${targetMember.id}> made <@${member.id}> cry.\n${cry[Math.random() * cry.length | 0]}`);
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`<@${member.id}> started crying.\n${cry[Math.random() * cry.length | 0]}`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> started crying.\n${cry[Math.random() * cry.length | 0]}`);			
		}
	})
//Sleep - Time to count sheep.
	command(client, `sleep`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> is sleepy.\n${sleep[Math.random() * sleep.length | 0]}`);
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> is sleepy.\n${sleep[Math.random() * sleep.length | 0]}`);
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`<@${member.id}> is sleepy.\n${sleep[Math.random() * sleep.length | 0]}`);
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> is sleepy.\n${sleep[Math.random() * sleep.length | 0]}`);
		}
	})
//Nom - om nom
	command(client, `nom`, message =>{
		const{member, mentions} = message;
		const target = mentions.users.first();
		if(target)
		{				
			const targetMember = message.guild.members.cache.get(target.id);
			if(targetMember.id == member.id)
			{
				message.channel.send(`<@${member.id}> bit themself.\n${nom[Math.random() * nom.length | 0]}`)
			}
			if((targetMember.id != member.id) && (targetMember.id != makiId))
			{
				message.channel.send(`<@${member.id}> bit <@${targetMember.id}>. \n${nom[Math.random() * nom.length | 0]}`);	
			}
			if(targetMember.id == makiId)
			{
				message.channel.send(`No. <@${member.id}>.`)
			}
		}
		else
		{
			message.channel.send(`<@${member.id}> took a bite.\n${nom[Math.random() * nom.length | 0]}`);	
		}
	})

//\\Admin-only commands below this line//\\
//Icon - Change Maki's profile picture.
	command(client, `pfp`, message =>{
		const standard = `./Assets/pfp_default.jpg`;
		const bibi = `./Assets/pfp_bibi.jpg`;
		const baseball = `./Assets/pfp_baseball.jpg`;
		const panther = `./Assets/pfp_panther.png`;
		const pretty = `./Assets/pfp_pretty.jpg`;
		const summer = `./Assets/pfp_summer.jpg`;
		const winter = `./Assets/pfp_winter.jpg`;
		const soldier = `./Assets/pfp_soldier.jpg`;
		const artist = `./Assets/pfp_artist.jpg`;
		const crayon = `./Assets/pfp_crayon.jpg`;
		const king = `./Assets/pfp_king.jpg`;
		const loli = `./Assets/pfp_loli.jpg`;
		const nendoroid = `./Assets/pfp_nendoroid.jpg`;
		const scarlet = `./Assets/pfp_scarlet.jpg`;
		const halation = `./Assets/pfp_halation.jpg`;
		const chef = `./Assets/pfp_chef.jpg`;
		const dev = `./Assets/pfp_dev.jpg`;
		//This really should be repaced with a switch statement, or at the very least an else if tree. This is bad.
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			if(message.content.includes(`help`))
			{
				message.channel.send(`Icons Available:\ndefault, bibi, baseball, panther, pretty, summer, winter, soldier, artist, crayon, king, loli, nendoroid, scarlet, halation, and chef.\nPlease do not spam this command or Discord won't let it work.`);
			}
			if(message.content.includes(`default`))
			{
				client.user.setAvatar(standard)
				message.channel.send(`Okay, setting my Icon to default!`);
				console.log(`<CLIENT>Icon set to pfp_default.jpg`);
			}
			if(message.content.includes(`bibi`))
			{
				client.user.setAvatar(bibi);
				message.channel.send(`Okay, setting my Icon to BiBi!`);
				console.log(`<CLIENT>Icon set to pfp_bibi.jpg`);
			}
			if(message.content.includes(`baseball`))
			{
				client.user.setAvatar(baseball);
				message.channel.send(`Okay, setting my Icon to Baseball!`);
				console.log(`<CLIENT>Icon set to pfp_baseball.jpg`);
			}
			if(message.content.includes(`panther`))
			{
				client.user.setAvatar(panther);
				message.channel.send(`Okay, setting my Icon to Panther`);
				console.log(`<CLIENT>Icon set to pfp_panther.png`);
			}
			if(message.content.includes(`pretty`))
			{
				client.user.setAvatar(pretty);
				message.channel.send(`Okay, setting my Icon to Pretty!`);
				console.log(`<CLIENT>Icon set to pfp_pretty.jpg`);
			}
			if(message.content.includes(`summer`))
			{
				client.user.setAvatar(summer);
				message.channel.send(`Okay, setting my Icon to Summer!`);
				console.log(`<CLIENT>Icon set to pfp_summer.jpg`);
			}
			if(message.content.includes(`winter`))
			{
				client.user.setAvatar(winter);
				message.channel.send(`Okay, setting my Icon to Winter!`);
				console.log(`<CLIENT>Icon set to pfp_winter.jpg`);
			}
			if(message.content.includes(`soldier`))
			{
				client.user.setAvatar(soldier);
				message.channel.send(`Okay, setting my Icon to Soldier!`);
				console.log(`<CLIENT>Icon set to pfp_soldier.jpg`);
			}
			if(message.content.includes(`artist`))
			{
				client.user.setAvatar(artist);
				message.channel.send(`Okay, setting my Icon to Artist!`);
				console.log(`<CLIENT>Icon set to pfp_artist.jpg`);
			}
			if(message.content.includes(`crayon`))
			{
				client.user.setAvatar(crayon);
				message.channel.send(`Okay, setting my Icon to Crayon!`);
				console.log(`<CLIENT>Icon set to pfp_crayon.jpg`);
			}
			if(message.content.includes(`king`))
			{
				client.user.setAvatar(king);
				message.channel.send(`Okay, setting my Icon to King!`);
				console.log(`<CLIENT>Icon set to pfp_king.jpg`);
			}
			if(message.content.includes(`loli`))
			{
				client.user.setAvatar(loli);
				message.channel.send(`Okay, setting my Icon to Loli- wait, what? N-No I'm an adult! This is embarassing...`);
				console.log(`<CLIENT>Icon set to pfp_loli.jpg`)
			}
			if(message.content.includes(`nendoroid`))
			{
				client.user.setAvatar(nendoroid);
				message.channel.send(`Okay, setting my Icon to Nendoroid!`);
				console.log(`<CLIENT>Icon set to pfp_nendoroid.jpg`)
			}
			if(message.content.includes(`scarlet`))
			{
				client.user.setAvatar(scarlet);
				message.channel.send(`Okay, setting my Icon to Scarlet!`);
				console.log(`<CLIENT>Icon set to pfp_scarlet.jpg`)
			}
			if(message.content.includes(`halation`))
			{
				client.user.setAvatar(halation);
				message.channel.send(`Okay, setting my Icon to SNOW HALATION!`);
				console.log(`<CLIENT>Icon set to pfp_halation.jpg`)
			}
			if(message.content.includes(`chef`))
			{
				client.user.setAvatar(chef);
				message.channel.send(`Okay, setting my Icon to Chef!`);
				console.log(`<CLIENT>Icon set to pfp_chef.jpg`)
			}
			if(message.content.includes(`dev`))
			{
				client.user.setAvatar(dev);
				message.channel.send(`Okay, setting my Icon to !`);
				console.log(`<CLIENT>Icon set to pfp_dev.jpg`);
			}
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`);
		}
	})
//Mute - Moderation tool that will probably only be used on lav
	command(client, `mute`, message =>{
		const{member, mentions} = message;
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			const target = mentions.users.first();
			let mutedRole = member.guild.roles.cache.find(role => role.id == `780704626311299082`);
			if(target)
			{
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.roles.add(mutedRole);
				message.channel.send(`User <@${targetMember.id}> has been muted by <@${member.id}>. To unmute this user, type ${prefix}unmute <@${targetMember.id}>.`);
			}
			else
			{
				message.channel.send(`<@${member.id}> Please enter a valid user id.`)
			}
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Unmute - Like mute, but less fun
	command(client, `unmute`, message =>{
		const{member, mentions} = message;
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			const target = mentions.users.first();
			let mutedRole = member.guild.roles.cache.find(role => role.id == `780704626311299082`);
			if(target)
			{
				const targetMember = message.guild.members.cache.get(target.id);
				targetMember.roles.remove(mutedRole);
				message.channel.send(`User <@${targetMember.id}> has been unmuted.`);
			}
			else
			{
				message.channel.send(`<@${member.id}> Please enter a valid user id.`)
			}
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Kick - Moderation tool 
	command(client, `kick`, message =>{
		const{member, mentions} = message;
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			const target = mentions.users.first();
			if(target)
			{
				const targetMember = message.guild.members.cache.get(target.id);
				message.channel.send(`User ${targetMember.username} has been kicked from the server by <@${member.id}>`);
				targetMember.kick();
			}
			else
			{
				message.channel.send(`<@${member.id}> Please enter a valid user id.`)
			}
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Ban - Moderation tool 
	command(client, `ban`, message =>{
		const{member, mentions} = message;
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			const target = mentions.users.first();
			if(target)
			{
				const targetMember = message.guild.members.cache.get(target.id);
				message.channel.send(`User ${targetMember.id} has been banned from the server by <@${member.id}`);
				targetMember.ban();
			}
			else
			{
				message.channel.send(`<@${member.id}> Please enter a valid user id.`)
			}
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Refresh - Turn it off and turn it back on again. - Does not work as intended, and kind of only causes problems
	command(client, `refresh`, message =>{
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			message.channel.send(`Resetting, this can take a second or two...`);
			console.log(`<CLIENT/WARN>Logging out...`);
			client.destroy();
			console.log(`<CLIENT/WARN>Attempting to log back in...`);
			client.login(token);
			client.user.setActivity(`m!help`);
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Log-off
	command(client, `logoff`, message =>{
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			message.channel.send(`Logging off...`)
			console.log(`<CLIENT/WARN>User ${message.author.username}> has initiated a shutdown. Logging off.`)
			client.destroy();
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	})
//Shout-Out
	command(client, [`so`, `shoutout`], message => {
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			let filter = m => m.author.id === message.author.id	
				message.channel.send(`Who would you like me to shout out?`).then(()=>{
					message.channel.awaitMessages(filter,{
						max: 1,
						time:10000,
						errors:[`time`]
					})
					.then(message => {
						message = message.first()
						if (message.content.toUpperCase() === `LIST`)
						{
							message.channel.send(`Current list of channels includes\nchufufu, rosary, kururu, mink, caius, noble, pnda`)
						}
						else if(message.content.toUpperCase() == `CHUFUFU`)
						{
							client.channels.get(chufuChannel).send(`Chufufu is live! https://www.twitch.tv/chufufu`);
						}
						else if(message.content.toUpperCase() === `ROSARY`)
						{
							client.channels.get(chufuChannel).send(`Rosary is live! https://www.twitch.tv/rosaryink`);
						}
						else if(message.content.toUpperCase() === `KURURU`)
						{
							client.channels.get(chufuChannel).send(`Kururu is live! https://www.twitch.tv/KururuSato`);
						}
						else if(message.content.toUpperCase() === `MINK`)
						{
							client.channels.get(chufuChannel).send(`Mink is live! https://www.twitch.tv/minkmccoy`);
						}
						else if(message.content.toUpperCase() === `CAIUS`)
						{
							client.channels.get(chufuChannel).send(`Caius is live! https://www.twitch.tv/caiusity`);
						}
						else if(message.content.toUpperCase() === `NOBLE`)
						{
							client.channels.get(chufuChannel).send(`Noble is live! https://www.twitch.tv/noblecorn`);
						}
						else if(message.content.toUpperCase() === `PNDA`)
						{
							client.channels.get(announcementsChannel).send(`PNDA is live! https://www.twitch.tv/xpndax`);
						}
						else
						{
							message.channel.send(`Invalid channel name. Terminating.`)
						}
					})
					.catch(collected =>{
						message.channel.send(`Ah, too slow! Gotta be quicker than that!`)
					})
				})
		}
		else
		{
			message.channel.send(`<@${message.author.id}> You do not have permission to use that command.`)
		}
	});
//Test - Can be filled with functions to trigger them manually. For testing indev automatic features.
	command(client, `test`, message => {
		if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
		{
			console.log(`<CLIENT/ERROR>Nothing to be tested. Ignoring.`)
		}
	})
})

//Chat logging for debugging & moderation. 
client.on("messageCreate", (message) => {
	console.log(+message.channel.name+ `/` +message.author.username+  `: `+message.content+ ``);
});

//Automatic Family Shoutouts
const chufuID = "319889345186234369"; const nobleID = "184520768271548417"; const minkID = "278620660735934465"; const kuruID = "77254472027340800"; const caiusID = "604194367657345024"; const rosaID = "249465080918310912";
client.on("presenceUpdate", (oldPresence, newPresence) =>{
	if(newPresence.user.id == nobleID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`NobleCorn is live! https://www.twitch.tv/noblecorn`);
			}
		})
	}
	if(newPresence.user.id == chufuID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`Chufufu is live! https://www.twitch.tv/chufufu`);
			}
		})
	}
	if(newPresence.user.id == minkID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`Mink McCoy is live! https://www.twitch.tv/minkmccoy`);
			}
		})
	}
	if(newPresence.user.id == caiusID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`Caiusity is live! https://www.twitch.tv/caiusity`);
			}
		})
	}
	if(newPresence.user.id == kuruID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`KururuSato is live! https://www.twitch.tv/kururusato`);
			}
		})
	}
	if(newPresence.user.id == rosaID)
	{
		if(!newPresence.activities) return false;
		newPresence.activities.forEach(activity => {
			if (activity.type == "STREAMING")
			{
				client.channels.get(chufufuChannel).send(`RosaryInk is live! https://www.twitch.tv/rosaryink`);
			}
		})
	}
	else
	{
		return;
	}
});

///Error handler	
// God this shit is bad. Why did I do this? Update this soon. 
client.on("error", () => {
	//Get Date & Time of error.
	fs = require(`fs`); let systemDate = new Date(); let date = ("0" + systemDate.getDate()).slice(-2); let month = ("0" + (systemDate.getMonth() + 1)).slice(-2); 
	let year = systemDate.getFullYear(); let hours = systemDate.getHours(); let minutes = systemDate.getMinutes(); let seconds = systemDate.getSeconds();
	//Console warning
	console.log(`<CLIENT/ERROR>Error! Likely a 502 network issue.`);
	//Write error log with date and time for review.
	fs.writeFile("./ErrorLogs/Error "+year + "-" + month + "-" + date + " " + hours + "h" + minutes + "m" + seconds+"s.txt", `I encountered an unspecified error at `+hours + ":" + minutes+ ":" +seconds + " on " + year + "-" + month + "-" + date+`.\nThis is likely a network error and can safely be ignored.`, function (err){
		console.log(`<CLIENT/ERROR>Error log has been created.`);
	});
	client.login(token); //Attempt resolve the error automatically by re-logging.
});

client.login(token);