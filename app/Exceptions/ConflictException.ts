import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BadRequestException extends Exception {
  public code = 'CONFLICT'
  public status = 409

  public async handle(error: this, context: HttpContextContract) {
    return context.response
      .status(error.status)
      .send({ code: error.code, message: error.message, status: error.status })
  }
}
