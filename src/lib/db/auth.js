import clientPromise from "."
import { ObjectId } from "mongodb"

let client
let db
let users

async function init(req, res) {
  if (db) return
  try {
    client = await clientPromise
    db = await client.db(process.env.DB)
    users = db.collection("users")
  } catch (error) {
    throw new Error("Failed to establish connection to DB")
  }
}

;(async () => {
  await init()
})()

// export async function userSignin(reqData){
//   try {
//     if (!users) await init()
//     const res = await users.findOne({username: reqData.username, password: reqData.password})
//     if (!res){
//       return  { error: "Failed to fetch." }
//     }
//     return { data: res }
//   } catch (error) {
//     return { error: "Failed to fetch users." }
//   }
// }

export async function getUserByUsername(reqData) {
  try {
    if (!users) await init()
    const res = await users.findOne({ username: reqData.username })
    if (!res) {
      // return  { error: "Failed to fetch." }
      // return new Error("Failed to fetch")
      return null
    }
    return res
  } catch (error) {
    // return { error: "Failed to fetch users." }
    // return new Error("Failed to fetch")
    return null
  }
}

export async function getUser(reqData){
  // reqData
  // _id: curr user's _id
  try {
    if (!users) await init()
    const res = await users.findOne({ _id: reqData._id })
    if (!res) {
      return null
    }
    return res
  } catch (error) {
    return null
  }
}

export async function signupUser(reqData) {
  try {
    if (!users) await init()
    const res = await users.insertOne(reqData)
    if (!res) {
      return null
    }
    return res?.insertedId
  } catch (error) {
    return null
  }
}
