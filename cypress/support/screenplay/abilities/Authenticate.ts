export class Authenticate {
  constructor(private readonly username: string, private readonly password: string) {}

  static with(username: string, password: string) {
    return new Authenticate(username, password)
  }

  getUsername(): string {
    return this.username
  }

  getPassword(): string {
    return this.password
  }
}