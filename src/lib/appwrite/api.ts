// The API file holds all the async functions we need for the project to work 
import { INewUser } from '@/types/index'
import { ID } from 'appwrite'
import { account, appwriteConfig, avatars, databases } from './config'

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        if (!newAccount) {
            throw new Error("Account creation failed");
        }
        const avatarUrl = avatars.getInitials(user.name)
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: new URL(avatarUrl) // this is done to convert string to URL as the backend database expects a URL for images 
        })
        return newUser
    }
    catch (error) {
        console.log(error)
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    name: string;
    email: string;
    username?: string;
    imageUrl: URL
}) {
    try {
        const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionid, ID.unique(), user
        )
        return newUser
    } catch (error) {
        console.log(error)
    }

}
