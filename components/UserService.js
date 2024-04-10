export class UserService {
  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.firstname = '';
    this.charactername = '';
    this.class = '';
    this.character = '';
    this.campaign = '';
    this.bio = '';
    this.otheruser = [];
    this.like = [];
    this.dislike = [];
    this.match = [];
    this.age = '';
    this.location = '';
    this.info1 = '';
    this.info2 = '';
    this.info3 = '';
    this.info4 = '';
    this.status = '';
    this.description = '';
    this.message = '';
    this.uri = '';

  }
  createUser( 
    name, email, password, firstname, charactername, aclass, character, campaign, bio, otheruser, like, dislike, match, age, location, info1, info2, info3, info4, status, description, message, uri) {
    this.name = name===undefined ? this.name : name;
    this.email = email === undefined ? this.email : email;
    this.password = password === undefined ? this.password : password;
    this.firstname = firstname === undefined ? this.firstname : firstname;
    this.charactername = charactername === undefined ? this.charactername : charactername;
    this.class = aclass === undefined ? this.class : aclass;
    this.character = character === undefined ? this.character : character; 
    this.campaign = campaign === undefined ? this.campaign : campaign; 
    this.bio = bio  === undefined ? this.bio : bio;
    this.otheruser = otheruser === undefined ? this.otheruser : otheruser;
    this.like = like === undefined ? this.like : like;
    this.dislike = dislike === undefined ? this.dislike : dislike;
    this.match = match  === undefined ? this.match : match;
    this.age = age === undefined ? this.age : age;
    this.location = location === undefined ? this.location : location;
    this.info1 = info1 === undefined ? this.info1 : info1;
    this.info2 = info2 === undefined ? this.info2 : info2;
    this.info3 = info3 === undefined ? this.info3 : info3;
    this.info4 = info4 === undefined ? this.info4 : info4;
    this.status = status === undefined ? this.status : status;
    this.description = description === undefined ? this.description : description;
    this.message = message === undefined ? this.message : message;
    this.uri = uri === undefined ? this.uri : uri;
  }
  
} 