"use server"

import { z } from "zod"
import { SignUpSchema } from "../types"
import { Argon2id } from "oslo/password"
import { generateId } from "lucia"
import db from "../lib/db"
import { userTable } from "../lib/db/schema"
import { lucia } from "../lib/auth"
import { cookies } from "next/headers"

export const signUp = async (values: z.infer<typeof SignUpSchema> ) => {

    console.log(values)
const hashedPassword =  await new Argon2id().hash(values.password)
const userId = generateId(15)

try {
    await db
      .insert(userTable)
      .values({
        id:userId,
        username: values.username,
        hashedPassword: hashedPassword,
    }).returning({
        id: userTable.id,
        username: userTable.username,
    })
    const session = await lucia.createSession(userId, {
        expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes )

    return {
        success: true,
        data: {
            userId
        }
    }

} catch (error: any) {
    return {
        success: false,
        error: error.message
    }
}


}