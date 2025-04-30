// The API file holds all the async functions we need for the project to work 
import { INewUser } from '@/types/index'
import { ID } from 'appwrite'
import { account } from './config'

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,

        )
        return newAccount
    }
    catch (error) {
        console.log(error)
    }
}

