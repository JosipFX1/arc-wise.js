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
      params: ["message", "time", "userid", "channelid"],
      type: "aoi.js",
      code: `
      $setTimeout[reminder;{time};{"message": "{message}", "user:" "{userID}", "channel": "{channelID}"}]
      
      $onlyIf[$userExists[{userid}]==true;❌ **User that you have Specified does not Exist!**]
      $onlyIf[$channelExists[{channelid}]==true;❌ **Channel that you have Specified does not Exist!**]
      $onlyIf[{time}!=;❌ **Invalid Usage, Missing \`time\` Parameter!**]
      $onlyIf[{channelid}!=;❌ **Invalid Usage, Missing \`channelid\` Parameter!**]
      $onlyIf[{userID}!=;❌ **Invalid Usage, Missing \`userID\` Parameter!**]
      $onlyIf[{message}!=;❌ **Invalid Usage, Missing \`message\` Parameter!**]`
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