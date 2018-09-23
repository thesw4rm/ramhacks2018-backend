// Try running in the console below.
  
exports = function(payload) {
  let lat = payload.query.lat;
  let long = payload.query.long;
  let distance = Number(payload.query.distance);
  let milesToDegrees = x=>{
    return x/69;
  };
  if(isNaN(lat) || isNaN(long) || isNaN(distance))
    return {error:"Invalid Data"};
  const mongodb = context.services.get("mongodb-atlas");
  return new Promise((resolve, reject) => {
    mongodb.db('prod').collection('locations').find().toArray().then(docs=>{
      let closeLocations = [];
      docs.forEach((data)=>{
        //resolve(`${data.timeEnd} now is ${Date.now()}`);
        //resolve(milesToDegrees(distance));
        if(Math.abs(lat - data.location.lat) < milesToDegrees(distance) && 
            Math.abs(long - data.location.long) < milesToDegrees(distance) &&
            data.timeEnd >= Date.now()){
          closeLocations.push(data);
        }
      });
        resolve(closeLocations);
    });
  });
};
