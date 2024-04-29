import clientPromise from "."
import { ObjectId } from "mongodb"
import { getUser, getUserByUsername } from "./auth"

let client
let db
let chats
let users

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    chats = db.collection("chats")
    users = db.collection("users")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

export async function getChatFromUser(reqData) {
  // reqData
  // user_id: curr user's _id

  // 1) GET THE CURR USER'S CHAT_IDS
  try {
    if (!users) await init()
    const res = await users.findOne({ _id: new ObjectId(reqData.user_id) })
    if (!res || !res.chat_ids) {
      return null
    }
    return res.chat_ids
  } catch (error) {
    return null
  }
}

export async function getUserChats(reqData) {
  // DIRECTLY FOR THE API
  // reqData
  // user_id: user's _id
  try {
    if (!users) await init()
    const chat_data = await users
      .aggregate([
        { $match: { _id: new ObjectId(reqData.user_id) } },
        { $project: { chat_ids: 1 } },
        {
          $lookup: {
            from: "chats",
            localField: "chat_ids",
            foreignField: "_id",
            as: "chats",
          },
        },
        {
          $unwind: "$chats",
        },
        {
          $lookup: {
            from: "users",
            localField: "chats.users",
            foreignField: "_id",
            as: "chats.usernames",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  username: 1,
                  fullname: 1,
                },
              },
            ],
          },
        },
        { $replaceRoot: { newRoot: "$chats" } },
      ])
      .toArray()
    if (!chat_data) {
      return { error: "Internal Server Error: getUserChats" }
    }

    return { data: chat_data }
  } catch (error) {
    return { error: error }
  }
}

export async function getChat(reqData) {
  // reqData
  // _id: chat id
  try {
    if (!chats) await init()
    const res = await chats.findOne({ _id: new ObjectId(reqData._id) })
    if (!res) {
      return null
    }
    return res
  } catch (error) {
    return null
  }
}

export async function hasChatBetweenUsers(reqData) {
  // reqData
  // user_id: curr user's _id
  // other_user_id: other user's _id
  // 1) GET THE CURR USER'S CHAT_IDS
  const chat_ids = await getChatFromUser(reqData)
  if (!chat_ids) {
    // ERROR
    return null
  }

  // 2) CHECK IF ONE OF THE CHATS ARE BETWEEN THE USERS
  for (const chat_id of chat_ids) {
    const chat_data = await getChat({ _id: chat_id })
    if (!chat_data || !chat_data.users) {
      // ERROR
      return null
    }
    if (
      chat_data.users.some(
        (userId) => userId.toString() === reqData.other_user_id.toString()
      )
    ) {
      // CHAT FOUND!
      return true
    }
  }
  return false
}

export async function addChatIdToUser(reqData) {
  // reqData
  // user_id: user's _id
  // chat_id: chat _id
  try {
    if (!users) await init()
    const res = await users.updateOne(
      { _id: new ObjectId(reqData.user_id) },
      { $addToSet: { chat_ids: new ObjectId(reqData.chat_id) } }
    )
    if (!res) {
      return null
    }
    return res
  } catch (error) {
    return null
  }
}

export async function createChat(reqData) {
  // DIRECTLY FOR THE API
  // reqData
  // user_id: curr user's _id
  // username: other user's username
  try {
    if (!chats) await init()

    // 1A) CHECK IF THE USERNAME (OTHER USER) EXISTS
    const user = await getUserByUsername(reqData)
    if (!user) {
      return { error: "Username doesn't exist." }
    }
    // 1A) CHECK IF THE USERNAME IS THE CURR USER'S USERNAME
    if (user._id.toString() === reqData.user_id) {
      return { error: "Username must not be the same as your username." }
    }

    // 2) CHECK IF THERE'S ALREADY A CHAT ROOM EXISTS BETWEEN THE USERS
    reqData.other_user_id = user._id
    const hasChat = await hasChatBetweenUsers(reqData)
    if (hasChat) {
      return { error: `You already have a chat with ${reqData?.username}` }
    }
    if (hasChat == null) {
      // ERROR
      return { errror: "Internal server error: hasChatBetweenUsers" }
    }

    // 3) CREATE A CHAT ROOM
    const chat_data = {
      users: [new ObjectId(reqData.user_id), new ObjectId(user._id)],
      lastUpdated: new Date(),
      color: "#FBD344",
    }
    const res = await chats.insertOne(chat_data)
    if (!res) {
      // ERROR
      return { error: "Internal server error: creating a chat room" }
    }
    const chat_id = res.insertedId.toString()
    reqData.chat_id = chat_id

    // 4) UPDATE BOTH USERS' CHAT_IDS
    // 4A) CURRENT USER
    const update_curr_user_chat = {
      user_id: reqData.user_id,
      chat_id: chat_id,
    }
    const updated_curr_user = await addChatIdToUser(update_curr_user_chat)
    if (!updated_curr_user || updated_curr_user.modifiedCount != 1) {
      // ERROR
      return {
        error: `Internal server error: adding a new chat_id to ${reqData.user_id}`,
      }
    }

    // 4B) OTHER USER
    const update_other_user_chat = {
      user_id: reqData.other_user_id,
      chat_id: chat_id,
    }
    const updated_other_user = await addChatIdToUser(update_other_user_chat)
    if (!updated_other_user || updated_other_user.modifiedCount != 1) {
      // ERROR
      return {
        error: `Internal server error: adding a new chat_id to ${reqData.other_user_id}`,
      }
    }

    // 5) RETURN RESPONSE
    return { data: chat_id }
  } catch (error) {
    return { error: error }
  }
}
