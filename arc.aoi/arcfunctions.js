class ArcFunctions {
  constructor(args) {
    this.args = args;
    if (!args.client) {
      console.log("You have not specified your aoi client's name! Exiting Code!");
      process.exit(0);
    }
  } loadArcFunctions() {
    const client = this.args.client;

    client.functionManager.createFunction({
        name: "$clientInfo",
        params: [], 
        type: "aoi.js", 
        code: `
        *Ping:* \`$pingms\`
        *Uptime:* \`$uptime\`
        *Database Ping:* \`$databasePing\`
        *RAM Usage:* \`$ram / $maxRam\`
        *CPU Usage:* \`$cpu%\`
        *In \`$guildCount\` Servers*`
    });

    client.functionManager.createFunction({
      name: "$reminder",
      params: ["message", "time", "user", "channel"],
      type: "aoi.js",
      code: `
      $setTimeout[reminder;$get[time];{"message": "$get[message]", "user": "$get[user]", "channel": "$get[channel]"}]
      
      $onlyIf[$userExists[$get[user]]==true;❌ **User that you have Specified does not Exist!**]
      $onlyIf[$channelExists[$get[channel]]==true;❌ **Channel that you have Specified does not Exist!**]
      $onlyIf[$get[time]!=;❌ **Invalid Usage, Missing \`time\` Parameter!**]
      $onlyIf[$get[channel]!=;❌ **Invalid Usage, Missing \`channelid\` Parameter!**]
      $onlyIf[$get[user]!=;❌ **Invalid Usage, Missing \`userID\` Parameter!**]
      $onlyIf[$get[message]!=;❌ **Invalid Usage, Missing \`message\` Parameter!**]
      
      $let[channel;{channel}]
      $let[user;{user}]
      $let[time;{time}]
      $let[message;{message}]`
    })

    client.timeoutCommand({
      name: "reminder",
      code: `
      $sendDM[
      **Hello <@$timeoutData[user]>! Don't forget about:**

      $timeouData[message];$timeoutData[user]]
      $channelSendMessage[$timeoutData[channel];
      **Hello <@$timeoutData[user]>! Don't forget about:**
      
      $timeoutData[message]]`
    })
    }
}

module.exports = {
  ArcFunctions
};