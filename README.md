# Final Project Proposal: MangoTalk

### [Figma Design](https://www.figma.com/file/IbGZu7tZ8cx57GorKo0XXo/Chat-App?type=design&node-id=0-1&mode=design&t=bY7DKARvmJX5dUkK-0)

### [Demo](https://chat-app-three-kappa.vercel.app/)

### To run locally, please check the [instructions](INSTRUCTIONS.md)

## Tech stack
- Next.js: Deployed on Vercel
- Express.js + socket.io (private repo): Deployed on Render
- MongoDB

## Todos
### Next.js (Client-Side + Server-Side)
- Pages 
  - [x] Signin: `/auth/signin`
  - [x] Signup: `/auth/signup`
  - Mobile
    - [x] Home (Chat lists)
    - [x] New Chat: `/newChat`
    - [x] Chatroom: `/chat?room=[CHAT_ID]`
  - Laptop/PC
    - [x] Home (Chat lists + Chatroom): `/chat?room=[CHAT_ID]`

### Server-Side (Outside of class)
- [x] Design & Setup the database: MongoDB
- [x] Use socket.io with express.js on an independent server
- Next.js (Server-Side)
  - [x] Search users by username for starting a new chat
  - [x] Authentication (User signin & signup)
  - [x] Save chat lists (but not the actual chat data)

## Inspiration
### KakaoTalk
![KakaoTalk design](https://openads-real.s3.amazonaws.com/openadsAdmin/new/preConts/2019-08-21_11-39-42_728.png)

### Messenger (Facebook)
![Messenger mobile design](https://miro.medium.com/v2/resize:fit:6480/1*c2cW5ydQsZhvNMVFZjgzPg.png)
![Messenger laptop design](https://about.fb.com/wp-content/uploads/2020/04/macOS-Dark-Mode.png)