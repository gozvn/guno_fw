export class SocialUser {
    constructor(
        public id: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public name: string,
        public photoUrl: string,
        public provider: string,
        public authToken: string
    ) {
    }
}
