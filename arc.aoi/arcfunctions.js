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
      params: ["message", "time", "dmUser"],
      type: "aoi.js",
      $if: "old",
      code: `
      $if[$get[time]!=]
      $setTimeout[reminder;$get[time];{"message": "$get[message]", "dmUser": "$get[dmUser]"}]

      $else

      $if[$get[time]==]
      ❌ **Invalid Usage, Missing \`time\` Parameter!**
      $endif
      $endif

      $onlyIf[$get[dmUser]==true||$get[dmUser]==false;❌ **Invalid Usage, Parameter "dmUser" must be either \`true\` or \`false\`!**]
      $onlyIf[$get[dmUser]!=;❌ **Invalid Usage, Missing \`dmUser\` Parameter!**]
      $onlyIf[$get[message]!=;❌ **Invalid Usage, Missing \`message\` Parameter!**]
      
      $let[dmUser;{dmUser}]
      $let[message;{message}]
      $let[time;{time}]`
    })

    client.timeoutCommand({
      name: "reminder",
      $if: "old",
      code: `
      $if[$timeoutData[dmUser]==false]

      $nonEscape[$channelSendMessage[$timeoutData[channel];
      $timeoutData[message] 
      ]]
      
      $else
      
      $if[$timeoutData[dmUser]==true]
      $sendDM[
      $timeoutData[message];$timeoutData[user]]
      
      $nonEscape[$channelSendMessage[$timeoutData[channel];
      $timeoutData[message]]]
      
      $endif
      $endif`
    })
    }
}

module.exports = {
  ArcFunctions
};