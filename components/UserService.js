export class UserService {
  constructor() {
    this.email = "";
    this.password = "";
    this.firstname = "";
    this.charactername = "";
    this.characterClass = "";
    this.characterLevel = "";
    this.campaign = "";
    this.bio = "";
    this.otheruser = [];
    this.like = [];
    this.dislike = [];
    this.match = [];
    this.status = "";
    this.message = "";
    this.uri = "";
  }
  createUser(
    email,
    password,
    firstname,
    charactername,
    aclass,
    characterLevel,
    campaign,
    bio,
    otheruser,
    like,
    dislike,
    match
  ) {
    this.email = email === undefined ? this.email : email;
    this.password = password === undefined ? this.password : password;
    this.firstname = firstname === undefined ? this.firstname : firstname;
    this.charactername =
      charactername === undefined ? this.charactername : charactername;
    this.characterClass = aclass === undefined ? this.class : aclass;
    this.characterLevel =
      characterLevel === undefined ? this.characterLevel : characterLevel;
    this.campaign = campaign === undefined ? this.campaign : campaign;
    this.bio = bio === undefined ? this.bio : bio;
    this.otheruser = otheruser === undefined ? this.otheruser : otheruser;
    this.like = like === undefined ? this.like : like;
    this.dislike = dislike === undefined ? this.dislike : dislike;
    this.match = match === undefined ? this.match : match;
    this.message = "";
    this.uri = "";
  }
}
