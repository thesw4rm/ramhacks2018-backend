// Try running in the console below.
  
exports = function(payload) {
  let lat = Number(payload.query.lat);
  let long = Number(payload.query.long);
  let category = payload.query.category;
  let name = payload.query.name;
  let description = payload.query.description;
  let userName = payload.query.userName;
  let token = payload.query.token;
  let food = Number(payload.query.food);
  let lodging = Number(payload.query.lodging);
  let clothes = Number(payload.query.clothes);
  let misc = Number(payload.query.misc);
  let timeBegin = Number(payload.query.timeBegin);
  let timeEnd = Number(payload.query.timeEnd);
  
  /*Check authentication shit, make sure token matches user and is good and cool or whatever*/
  if(isNaN(lat) || isNaN(long) || isNaN(timeBegin) || isNaN(timeEnd) || 
      isNaN(food) || isNaN(lodging) || isNaN(clothes) || isNaN(misc))
    return {error:"Bad input"};
  if(!name || !description || !token || !userName)
    return {error:"Bad input"};
  //if(!(category === "food" || category === "lodging" || category === "misc"))
    //return {error:"Bad input"};
  let newLocation = {
    location:{
      lat,
      long
    },
    category:{
      food,
      lodging,
      clothes,
      misc
    },
    reputation:{
      upvotes:0,
      downvotes:0
    },
    name,
    description,
    userName,
    token,
    timeBegin,
    timeEnd
  };
  const mongodb = context.services.get("mongodb-atlas");
  mongodb.db('prod').collection('locations').insertOne(newLocation);
  return {success:true};
};
