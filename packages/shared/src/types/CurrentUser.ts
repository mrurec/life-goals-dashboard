export interface CurrentUser {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly avatarUrl: string | null
}
