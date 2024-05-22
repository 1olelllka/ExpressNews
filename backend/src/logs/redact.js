const redact = (data) => {
  if (Array.isArray(data)) {
    redactedData = [];
    data.forEach((element) => {
      mock = {};
      if (element == null || element["_doc"] == undefined) {
        return data;
      }
      Object.entries(element["_doc"]).forEach(([key, value]) => {
        mock[key] = value;
      });
      if (mock["username"] != undefined) {
        mock["username"] = "********";
      }
      if (mock["password"] != undefined) {
        mock["password"] = "********";
      }
      if (mock["email"] != undefined) {
        mock["email"] = "********";
      }
      if (mock["full_name"] != undefined) {
        mock["full_name"] = "********";
      }
      if (mock["discordId"] != undefined) {
        mock["discordId"] = "********";
      }
      if (mock["googleId"] != undefined) {
        mock["googleId"] = "********";
      }
      redactedData.push(mock);
    });
    return redactedData;
  } else {
    redactedData = {};
    if (data == null || data["_doc"] == undefined) {
      return data;
    }
    Object.entries(data["_doc"]).forEach(([key, value]) => {
      redactedData[key] = value;
    });
    if (redactedData["username"] != undefined) {
      redactedData["username"] = "********";
    }
    if (redactedData["password"] != undefined) {
      redactedData["password"] = "********";
    }
    if (redactedData["email"] != undefined) {
      redactedData["email"] = "********";
    }
    if (redactedData["full_name"] != undefined) {
      redactedData["full_name"] = "********";
    }
    if (redactedData["discordId"] != undefined) {
      redactedData["discordId"] = "********";
    }
    if (redactedData["googleId"] != undefined) {
      redactedData["googleId"] = "********";
    }
    return redactedData;
  }
};

module.exports = { redact };
