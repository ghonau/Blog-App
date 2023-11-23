import { MongoClient } from 'mongodb'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body
    console.log(name)
    if (
      !email ||
      !email.includes('@') ||
      email.trim() === '' ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return
    }
    await writeToDB({ name, email, message })
    res.status(201).json({ message: 'Message has been saved successfully!' })
  }
}

async function writeToDB(newMessage) {
  console.log(newMessage)
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.dynrrde.mongodb.net/`

  console.log(connectionString)
  const client = await MongoClient.connect(connectionString)

  try {
    const result = await client
      .db(`${process.env.mongodb_database}`)
      .collection('messages')
      .insertOne(newMessage)
    client.close()
  } catch (error) {
    console.log(error)
    client.close()
    throw new Error('Could not insert the record to the database')
  }
}
