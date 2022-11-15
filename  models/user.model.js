export class User {
  constructor(email, image, name, uid, userName) {
    this.email = email ?? '';
    this.image = image ?? '';
    this.name = name ?? '';
    this.uid = uid ?? '';
    this.userName = userName ?? '';
  }
}