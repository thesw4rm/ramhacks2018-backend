// Try running in the console below.
  
exports = function(payload) {
  let userId = Number(payload.query.userId);
  let token = payload.query.token;
  let postId = payload.query.postId;
  let upVote = payload.query.upvote;
  let downVote = payload.query.downvote;
  if(isNaN(userId) || !token || !postId)
    return {error:"Bad input"};
  if(!downVote && !upVote)
    return {error: "No votes"};
  if(downVote && upVote)
    return {error: "Can't vote both"};
  const mongodb = context.services.get("mongodb-atlas");
  if(upVote){
    mongodb.db('prod').collection('locations').updateOne({_id:BSON.ObjectId(postId)},{
            $inc: {"reputation.upvotes":1}
    });
  }
  if(downVote)
  mongodb.db('prod').collection('locations').updateOne({_id:BSON.ObjectId(postId)},{
          $inc: {"reputation.downvotes":1}
  });
  return {success:true};
};
