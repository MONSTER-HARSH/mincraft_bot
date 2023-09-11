const axios = require('axios');
const mineflayer = require("mineflayer");
//yooo aayan
const bot = mineflayer.createBot({// mona come to line 58 
  host: "herobrine.org",
  username: "M_HARSH", 
  version: '1.18.2'
});


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};


const keys = ["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",
"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",
"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",
"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",
"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",
"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",
"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",
"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",
"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",
"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"] 
const keyBlacklist = {}; 
async function createChatCompletion(prompt) {



  const selectedKey = keys.find(key => !keyBlacklist[key] || keyBlacklist[key] < Date.now());

  if (!selectedKey) {
    console.log("All keys are currently blacklisted.");
    return;
  }

  console.log("Using key:", selectedKey);

  
  await new Promise(resolve => setTimeout(resolve, 2000));

  
  const blacklistDuration = 60000; 
  keyBlacklist[selectedKey] = Date.now() + blacklistDuration;

  console.log("Key blacklisted for 60 seconds.");
  
   try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: prompt,
        max_tokens: 20,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${selectedKey}`,
        },
      }
    );

    const rateLimitReset = parseInt(response.headers['x-ratelimit-reset-requests']) * 1000;
    const currentTime = Date.now();

    if (currentTime < rateLimitReset) {
      const delay = rateLimitReset - currentTime + 1000; 
      await sleep(delay);
    }

    console.log("OpenAI response:", response.data);
    return response.data.choices[0].text.trim();
 
  } catch (error) {
    console.error("Error generating response:", error);
    if (error.response && error.response.status === 429) {
      console.log("Rate limited, waiting for reset...");

      // Extract the rate limit reset time from the response headers
      const rateLimitResetTime = parseInt(error.response.headers['x-ratelimit-reset-requests']);

      // Calculate the time until the reset in milliseconds
      const currentTime = Date.now() / 1000;
      const timeUntilReset = rateLimitResetTime - currentTime;
      const delayInMillis = timeUntilReset * 1000;

      // Wait for the rate limit to reset before making more requests
      await new Promise(resolve => setTimeout(resolve, delayInMillis));

      // Retry the API call
      return createChatCompletion(prompt);
    } else {
      throw new Error('Failed to generate response.');
    }
  }
}
const controller = new AbortController();

async function afk() {
  setInterval(() => {
    bot.look(bot.entity.yaw +1, bot.entity.pitch, true)
  })
  bot.setControlState("forward", true)
  bot.on("messagestr", async message => {
  if(message.startsWith("[VIP++] TBG89. [III] afkstop")) {
  controller.abort();  
}
})}

function shuffleArray(array) {
  if(array.length === 0) {
    return null
  }
  const randomindex = Math.floor(Math.random() * array.length)
  return array[randomindex]
}

async function advertise() {
  const messages = ["NONE"]
  const randomMsg = shuffleArray(messages)
}



bot.once("spawn", () => {
  bot.chat("/game demeter")
  sleep(100)
  bot.chat("LOL fk all hello")
//   afk() 
//   setInterval(advertise, 120000)
})
const Database = require("easy-json-database")
const db = new Database("./blacklistedMfs.json", {
  snapshots: {
    enabled: true,
    interval: 24 * 60 * 60 * 1000,
    folder: './blacklists/'
  }
})

const userCooldowns = new Map();

function isUnderCooldown(userId, cooldownDuration) {
  const lastActionTime = userCooldowns.get(userId);
  if (lastActionTime === undefined) {
    return false;
  }

  const currentTime = Date.now();
  return currentTime - lastActionTime < cooldownDuration;
}

function updateUserCooldown(userId) {
  userCooldowns.set(userId, Date.now());
}


function putUserOnCooldown(userId, cooldownDuration) {
  userCooldowns.set(userId, Date.now() + cooldownDuration);
}

bot.on("messagestr", async message => {
  console.log("Received message:", message); 
  



 const blacklitedusersstring = db.get("blacklist")
 if(blacklitedusersstring) {
 const blacklistedUsers = blacklitedusersstring.split(",") //<--- split
 
  for (const blacklist of blacklistedUsers) {
    if (message.startsWith(blacklist)) {
      return bot.chat("no lol");
    }

  }
}

  const delimiter = " -> "
  const parts = message.split(delimiter)
  const partbeforedelimiter = parts[0]
  const coolDownDuration = 20000;
  if(isUnderCooldown(partbeforedelimiter, coolDownDuration)) {
    
  }

  if (message.startsWith(`${partbeforedelimiter} -> me]`)) { 
    
   const ranks = ["[VIP]","[VIP+]","[VIP++]","[MVP]","[MVP+]","[MVP+]","[MVP++]","[HEROBRINE]"] // on /tell its herobrine
   const tiers = ["[I]","[II]","[III]","[IV]","[V]"]
   if(partbeforedelimiter.includes(ranks) && partbeforedelimiter.includes(tiers)) {
    const prompt = message.split(" ").slice(5).join(" ")
    try { 
      const completionText = await createChatCompletion(`/p ${prompt}`);
      console.log("Generated response:", completionText); 
      
      bot.chat(completionText);
    } catch (error) {
      console.error("Error generating response:", error);
      bot.chat("Failed to generate a response." + error);
    }
     putUserOnCooldown(partbeforedelimiter, 10000)
  }
  if(partbeforedelimiter.includes(ranks) && !partbeforedelimiter.includes(tiers)) {
    const prompt = message.split(" ").slice(4).join(" ")
    try { 
      const completionText = await createChatCompletion(`${prompt}`);
      console.log("Generated response:", completionText); 
      
      bot.chat(completionText);
    } catch (error) {
      console.error("Error generating response:", error);
      bot.chat("Failed to generate a response.", + error);
    }
    putUserOnCooldown(partbeforedelimiter, 10000)
  }
  if(!partbeforedelimiter.includes(ranks) && partbeforedelimiter.includes(tiers)) {
    const prompt = message.split(" ").slice(3).join(" ")
    try { 
      const completionText = await createChatCompletion(`/p ${prompt}`);
      console.log("Generated response:", completionText); 
      
      bot.chat(completionText);
    } catch (error) {
      console.error("Error generating response:", error);
      bot.chat("Failed to generate a response." + error);
    }
    putUserOnCooldown(partbeforedelimiter, 10000)
  }
  if(!partbeforedelimiter.includes(ranks) && !partbeforedelimiter.includes(tiers)) {
    const prompt = message.split(" ").slice(2).join(" ")
    try { 
      const completionText = await createChatCompletion(`/p ${prompt}`);
      console.log("Generated response:", completionText); 
      
      bot.chat(completionText);
    } catch (error) {
      console.error("Error generating response:", error);
      bot.chat("Failed to generate a response." + error);
    }
    putUserOnCooldown(partbeforedelimiter, 10000)
  }
    
   
  
    if(message.startsWith("[VIP++] TBG89. [III] +blacklist")) {
      const user = message.split(" ").slice(5).join(" ") 
      db.set("blacklist", user)
      bot.chat("Blacklisted MF known as  " + user + " from using aayan & monke slave")
    }


  }/// this is not working i mean this function
});

const targetPlayer = "[VIP++] TBG89. [III]"
function followPlayer() {
  const target = bot.players[targetPlayer];

  if (target) {
    const { x: targetX, y: targetY, z: targetZ } = target.entity.position;

 
    const distance = bot.entity.position.distanceTo(target.entity.position);

    
    const thresholdDistance = 3.0; 

    if (distance > thresholdDistance) {
      bot.lookAt(target.entity.position.offset(0, target.entity.height, 0));
      bot.setControlState('forward', true);
    } else {
      bot.clearControlStates();
    }
  }
}


bot.on('messagestr', async (messagestr) => {
  if (messagestr.startsWith('[Message] From TBG89. follow me')) {
    followPlayer()
  }
  if (messagestr.startsWith("[Message] From TBG89. tp")) {
    bot.chat("/tpa TBG89.")
  }

  if (messagestr.startsWith("[Message] From TBG89. kill")) {
    const auraToggle = true;
    normalaura()
  }

  bot.on('messagestr', async (messagestr) => {
    if (messagestr.startsWith('[Message] From TBG89. move: ')) {
      const command = messagestr.split(':')[1];
      console.log(command)
      if (command !== undefined) {
        command.trim().toLowerCase();
      }
      switch (command.toLowerCase()) {
        case ' forward':
          bot.setControlState('forward', true);
          break;
        case ' backward':
          bot.setControlState('back', true);
          break;
        case ' left':
          bot.setControlState('left', true);
          break;
        case ' right':
          bot.setControlState('right', true);
          break;
        case ' jump':
          bot.setControlState('jump', true);
          break;
        case ' sit':
            bot.setControlState('sneak', true);
            break;
        case ' stop':
          bot.clearControlStates();
          break;
      }
    }});
})
// :thumbs_up:



const equipSword = () => {
    const sword = bot.inventory.items().find(item => item.name.includes('sword'))
    if (sword) bot.equip(sword, 'hand')
  }
const normalaura = () => {

    setInterval(() => {
      if (true) {
        equipSword()
        const mobfilter = e => e.name === 'drowned' || e.name === 'spider' || e.name === 'cave_spider' || e.name === 'zombie' || e.name === 'skeleton' || e.name === 'blaze' || e.name === `wither_skeleton` || e.name === `enderman` || e.name === `creeper`
        var mob = bot.nearestEntity(mobfilter)
        if (mob) {
          var pos = mob.position.offset(0, mob.height / 3, 0)
          bot.lookAt(pos, true, () => bot.attack(mob))
        }
        setTimeout(() => {
          if (mob) {
            bot.attack(mob)
          }
        }, 900);
      }
    }, 1000);
  }
