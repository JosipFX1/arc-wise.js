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
      params: ["message", "time", "user", "channel", "timeoutMessage", "dmUser"],
      type: "aoi.js",
      $if: "old",
      code: `
      $if[$get[time]!=]
      $setTimeout[reminder;$get[time];{"message": "$get[message]", "user": "$get[user]", "channel": "$get[channel]", "dmUser": "$get[dmUser]", "timeoutMessage": "$get[timeoutMessage]"}]
      $let[time;{time}]

      $else

      $if[$get[time]==]
      ❌ **Invalid Usage, Missing \`time\` Parameter!**
      $let[time;{time}]
      $endif
      $endif

      $onlyIf[$get[dmUser]==true||$get[dmUser]==false;❌ **Invalid Usage, Parameter "dmUser" must be either \`true\` or \`false\`!**]
      $onlyIf[$userExists[$get[user]]==true;❌ **User that you have Specified does not Exist!**]
      $onlyIf[$channelExists[$get[channel]]==true;❌ **Channel that you have Specified does not Exist!**]
      $onlyIf[$get[dmUser]!=;❌ **Invalid Usage, Missing \`dmUser\` Parameter!**]
      $onlyIf[$get[timeoutMessage]!=;❌ **Invalid Usage, Missing \`timeoutMessage\` Parameter!**]
      $onlyIf[$get[channel]!=;❌ **Invalid Usage, Missing \`channelid\` Parameter!**]
      $onlyIf[$get[user]!=;❌ **Invalid Usage, Missing \`userID\` Parameter!**]
      $onlyIf[$get[message]!=;❌ **Invalid Usage, Missing \`message\` Parameter!**]
      
      $let[dmUser;{dmUser}]
      $let[channel;{channel}]
      $let[user;{user}]
      $let[message;{message}]
      $let[timeoutMessage;{timeoutMessage}]
      $let[Time;{time}]`
    })

    client.timeoutCommand({
      name: "reminder",
      $if: "old",
      code: `
      $if[$timeoutData[dmUser]==false]

      $nonEscape[$channelSendMessage[$timeoutData[channel];
      $timeoutData[timeoutMessage]

      $timeoutData[message]]]
      
      $else
      
      $if[$timeoutData[dmUser]==true]
      $sendDM[
      $timeoutData[timeoutMessage]
      
      $timeoutData[message];$timeoutData[user]]
      $nonEscape[$channelSendMessage[$timeoutData[channel];
      $timeoutData[timeoutMessage]
      
      $timeoutData[message]]]
      
      $endif
      $endif`
    })
    }
}

module.exports = {
  ArcFunctions
};