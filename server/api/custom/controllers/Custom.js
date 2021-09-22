'use strict'

const { uploadFile } = require("../services/Custom");

module.exports = {

  logout: async (ctx) => {
    ctx.cookies.set("token", null);
    ctx.send({
      authorized: true,
      msg: "Successfully destroyed session",
    });
  },

  notFriends: async (ctx) => {
    const knex = strapi.connections.default;
    const { id } = ctx.state.user;

    let subscriptions = await knex.raw(`SELECT for FROM "subscriptions" WHERE user=${id}`).then(res => (res.map(each => (each.for))))
    subscriptions.push(id)
    const notFriends = await strapi.query('user', 'users-permissions').find({id_nin: subscriptions, _limit: 20})

    ctx.send(notFriends)
  },

  getFriends: async (ctx) => {
    const id = ctx.params.id;
    const limit = ctx.query.limit;
    let subscriptions;

    if (!limit) subscriptions = await strapi.services.friends.find({user: id}, ["for", "for.avater"]);
    else subscriptions = await strapi.services.friends.find({user: id, _limit: limit}, ["for", "for.avater"]);

    subscriptions = await subscriptions.map(subc => {
      let clear = subc.for;
      delete clear.password;
      return clear;
    })
    
    ctx.send(subscriptions)
  },

  getPosts: async (ctx) => {
    const userId = ctx.params.id;

    const posts = await strapi.services.post.find({author: userId, _sort: "updated_at:desc"}, ["main_image", "author"]);

    ctx.send(posts)
  },

  isFriend: async (ctx) => {
    const knex = strapi.connections.default;
    const user = ctx.state.user;
    const otherId = ctx.params.id;

    const result = (await knex.raw(`SELECT * from "subscriptions" WHERE user=${user.id} AND for=${otherId}`)).length > 0;

    ctx.send(result);
  },

  update: async (ctx) => {
    const body = (await JSON.parse(ctx.request.body.data));

    if (body.role !== undefined) delete body.role;
    if (body.created_at !== undefined) delete body.created_at;
    if (body.blocked !== undefined) delete body.clocked;
    if (body.confirmed !== undefined) delete body.confirmed;
    if (body.id !== undefined) delete body.id;
    if (body.provider !== undefined) delete body.provider;

    const avater = ctx.request.files["files.avater"];
    const background_image = ctx.request.files["files.background_image"];

    if (avater) {
      const avaterID = (await uploadFile(avater))[0];
      body.avater = avaterID;
    }

    if (background_image) {
      const background_image_id = (await uploadFile(background_image))[0];
      body.background_image = background_image_id;
    }
    
    ctx.request.body = body;

    return await strapi.plugins["users-permissions"].controllers.user.update(ctx);
  }
};