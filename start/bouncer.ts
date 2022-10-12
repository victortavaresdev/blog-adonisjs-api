import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export const { actions } = Bouncer.define(
  'updateUser',
  (user: User, updatedUser: User) => user.id === updatedUser.id
)
  .define('getUserById', (user: User, userId: User) => user.id === userId.id)
  .define('updatePost', (user: User, post: Post) => user.id === post.user_id)
  .define('removePost', (user: User, post: Post) => user.id === post.user_id)

export const { policies } = Bouncer.registerPolicies({})
