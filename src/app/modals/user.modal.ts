export class UserModal {
  public userFname: string;
  public userLname: string;
  public userId: number;
  public token: string;
  public status: string;
  public gender: string;
  public userEmail: string;
  public vote: string;

  public getFullName() {
    return this.userFname + ' ' + this.userLname;
  }


}
