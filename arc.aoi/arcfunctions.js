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
      $setTimeout[reminder;$get[time];{"message": "$get[message]", "dmUser": "$get[dmUser]", "channel": "$channelID", "user": "$authorID"}]

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
      $timeoutData[message]
      ]]
      
      $endif
      $endif`
    })

    client.functionManager.createFunction({
      name: "$claim",
      params: ["claimtitle", "claimdescription", "claimcolor", "claimthumbnail"],
      type: "aoi.js",
      $if: "old", 
      code: `
      $if[$get[thumbnail]==]
      $title[$get[title]]
      $description[$get[description]]
      $color[$get[color]]

      $else

      $if[$get[thumbnail]!=]
      $title[$get[title]]
      $description[$get[description]]
      $color[$get[color]]
      $thumbnail[$get[thumbnail]]

      $endif
      $endif

      $onlyIf[$get[color]!=;❌ **Invalid Usage, Missing \`claimcolor\` Parameter!**]
      $onlyIf[$get[description]!=;❌ **Invalid Usage, Missing \`claimdescription\` Parameter!**]
      $onlyIf[$get[title]!=;❌ **Invalid Usage, Missing \`claimtitle\` Parameter!**]
      
      $let[thumbnail;{claimthumbnail}]
      $let[color;{claimcolor}]
      $let[description;{claimdescription}]
      $let[title;{claimtitle}]`
    });

    client.functionManager.createFunction({
      name: "$close",
      params: ["time", "closetitle", "closedescription", "closecolor"],
      type: "aoi.js",
      $if: "old", 
      code: `
      $if[$get[closetitle]==]
      $deleteChannel[$channelID]
      
      $wait[$get[time]]

      $sendMessage[{newEmbed:
      {description: $nonEscape[$get[description]]}
      {color: $get[color]}}]

      $else

      $if[$get[closetitle]!=]
      $deleteChannel[$channelID]
      
      $wait[$get[time]]

      $sendMessage[{newEmbed:
      {title: $nonEscape[$get[title]]}
      {description: $nonEscape[$get[description]]}
      {color: $get[color]}}]

      $endif
      $endif

      $onlyIf[$get[color]!=;❌ **Invalid Usage, Missing \`closecolor\` Parameter!**]
      $onlyIf[$get[description]!=;❌ **Invalid Usage, Missing \`closedescription\` Parameter!**]
      $onlyIf[$get[time]!=;❌ **Invalid Usage, Missing \`time\` Parameter!**]

      $let[color;{closecolor}]
      $let[time;{time}]
      $let[description;{closedescription}]
      $let[title;{closetitle}]`
    });
    }
}

module.exports = {
  ArcFunctions
};