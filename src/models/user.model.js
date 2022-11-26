export class User {
  constructor(email, cloudinary, name, uid, userName) {
    this.email = email ?? '';
    this.cloudinary = cloudinary ?? '';
    this.name = name ?? '';
    this.uid = uid ?? '';
    this.userName = userName ?? '';
  }
}