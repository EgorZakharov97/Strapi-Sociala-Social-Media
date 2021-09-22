'use strict';

/**
 * `post-delete-cascade` policy.
 */

module.exports = async (ctx, next) => {
  
  const postId = ctx.params.id;
  const post = (await strapi.services.post.find({id: postId}))[0];
  
  if(post){
    console.log(post)
    const imageId = post.main_image ? post.main_image.id : false;
    if(imageId) await strapi.plugins.upload.services.upload.remove({id: imageId});
    await strapi.services["post-like"].delete({post: postId});
  }

  await next();
};
