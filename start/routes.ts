/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

interface User {
  email: string
  password: string
}

Route.get('/users/list-all', async () => {
  const users: User[] = await Database.query().from('users').select('*')

  return { users }
})

Route.post('/users/create', async ({ request }) => {
  const { email, password } = request.body()

  const [id] = await Database.insertQuery()
    .table('users')
    .insert({ email, password })
    .returning(['id'])

  return { id }
})
