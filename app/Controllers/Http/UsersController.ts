import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ConflictException from 'App/Exceptions/ConflictException'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
import UpdateUser from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const userPayload = await request.validate(CreateUser)

    const userByEmail = await User.findBy('email', userPayload.email)
    if (userByEmail) throw new ConflictException('Email already in use')

    const userByUsername = await User.findBy('username', userPayload.username)
    if (userByUsername) throw new ConflictException('Username already in use')

    const user = await User.create(userPayload)
    return response.created({ user })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const userPayload = await request.validate(UpdateUser)
    const id = request.param('id')
    const user = await User.findOrFail(id)

    await bouncer.authorize('updateUser', user)

    user.username = userPayload.username
    user.email = userPayload.email
    user.password = userPayload.password

    await user.save()
    return response.ok({ user })
  }

  public async findById({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.findOrFail(id)

    await bouncer.authorize('getUserById', user)

    return response.ok({ user })
  }
}
