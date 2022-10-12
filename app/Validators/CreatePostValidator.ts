import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([rules.minLength(5), rules.maxLength(50)]),
    content: schema.string([rules.minLength(50), rules.maxLength(1000)]),
  })

  public messages: CustomMessages = {}
}
