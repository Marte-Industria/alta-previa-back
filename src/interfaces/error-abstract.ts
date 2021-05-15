export abstract class MyError extends Error {
  constructor (msg: string, name?: string) {
    super()
    this.message = msg
    this.name = name || 'MyError'
  }
}