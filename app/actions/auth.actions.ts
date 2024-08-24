"use server"

import { z } from "zod"
import { LoginSchema, SignUpSchema } from "../types"
import * as Argon2 from "argon2"
import { generateId } from "lucia"
import db from "../lib/db"
import { userTable } from "../lib/db/schema"
import { lucia } from "../lib/auth"
import { cookies } from "next/headers"
import { eq } from "drizzle-orm"

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

export const signIn = async (values: z.infer<typeof LoginSchema>) => {
    try {
      LoginSchema.parse(values)
    } catch (error: any) {
      return {
        error: error.message,
      }
    }
  
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.username, values.username),
    })
  
    if (!existingUser) {
      return {
        error: "User not found",
      }
    }
  
    if (!existingUser.hashedPassword) {
      return {
        error: "User not found",
      }
    }
  
    const isValidPassword = await Argon2.verify(
        existingUser.hashedPassword,
        values.password
      )
  
    if (!isValidPassword) {
      return {
        error: "Incorrect username or password",
      }
    }
  
    const session = await lucia.createSession(existingUser.id, {
      expiresIn: 60 * 60 * 24 * 30,
    })
  
    const sessionCookie = lucia.createSessionCookie(session.id)
  
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  
    return {
      success: "Logged in successfully",
    }
  }