export interface FormLoginData {
    email: string,
    password: string,
}
export interface FormRegisterData {
    email: string,
    username: string,
    password: string,
    secondPassword: string,
}
export interface NoteI {
    name: string,
    text: string,
    authorId: string,
    access: 'LINK' | 'PRIVATE',
    _id : string,
}

