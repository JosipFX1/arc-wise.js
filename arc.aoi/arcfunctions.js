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
        name: "$hello",
        params: [ "message" ], 
        type: "aoi.js", 
        code: `
        $sendMessage[{message}]`
    });
    }
}
