import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    const tokenData = await auth
      .use('api')
      .attempt(email, password, { expiresIn: process.env.TOKEN_EXPIRES })

    const { token } = tokenData
    return response.created({ access_token: token })
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true,
    }
  }

  public async profile({ auth }: HttpContextContract) {
    return auth.user
  }
}
