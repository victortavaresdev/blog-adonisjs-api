import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Route from '@ioc:Adonis/Core/Route'

// Auth
Route.post('/api/v1/auth/login', 'AuthController.login').middleware('throttle:global')
Route.delete('/api/v1/auth/logout', 'AuthController.logout')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/profile', 'AuthController.profile')
  .middleware('auth')
  .middleware('throttle:global')

// Users
Route.post('/api/v1/users/create', 'UsersController.create').middleware('throttle:global')
Route.get('/api/v1/users/:id', 'UsersController.findById')
  .middleware('auth')
  .middleware('throttle:global')
Route.put('/api/v1/users/update/:id', 'UsersController.update')
  .middleware('auth')
  .middleware('throttle:global')

// Posts
Route.post('/api/v1/posts/create', 'PostsController.create')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/posts/:id', 'PostsController.findById')
  .middleware('auth')
  .middleware('throttle:global')
Route.put('/api/v1/posts/update/:id', 'PostsController.update')
  .middleware('auth')
  .middleware('throttle:global')
Route.get('/api/v1/posts', 'PostsController.findAll')
  .middleware('auth')
  .middleware('throttle:global')
Route.delete('/api/v1/posts/:id', 'PostsController.remove')
  .middleware('auth')
  .middleware('throttle:global')

// Health Check
Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})
