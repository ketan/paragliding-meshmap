import { User as AppUser } from '#entity/user'

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
