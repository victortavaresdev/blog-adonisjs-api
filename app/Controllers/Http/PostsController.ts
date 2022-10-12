import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import CreatePost from 'App/Validators/CreatePostValidator'
import UpdatePost from 'App/Validators/UpdatePostValidator'

export default class PostsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const body = await request.validate(CreatePost)
    const id = auth.user.id

    const data = {
      ...body,
      user_id: id,
    }

    const post = await Post.create(data)
    return response.created({ post })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const { title, content } = await request.validate(UpdatePost)
    const post = await Post.findOrFail(id)

    await bouncer.authorize('updatePost', post)

    post.title = title
    post.content = content

    await post.save()
    return response.ok({ post })
  }

  public async findById({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const post = await Post.findOrFail(id)

    return response.ok({ post })
  }

  public async findAll({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 5
    const posts = await Database.from('posts').paginate(page, limit)

    return response.ok({ posts })
  }

  public async remove({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const post = await Post.findOrFail(id)

    await bouncer.authorize('removePost', post)

    await post.delete()
    return response.ok({})
  }
}
