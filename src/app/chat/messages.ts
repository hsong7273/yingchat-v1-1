export enum MessageType {
  Text,
  Image,
  Gif
}

export class Message {
  constructor(
    public author?: string,
    public date?: string,
    public text?: string,
    public type?: MessageType
  ) { }
}