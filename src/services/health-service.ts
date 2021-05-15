import { connection } from 'mongoose'

class HealthService {
  async valid () {
    return{ 
      db : this.validDB()
    }
  }

  private validDB () : string {
    try {
      const dbStatus = connection.readyState
      return (dbStatus === 1) ? 'OK' : 'ERR'
    } catch (err) {
      console.error(err)
      return 'ERR'
    }
  }
}

export { HealthService }
