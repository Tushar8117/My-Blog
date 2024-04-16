import conf from '../conf/conf'

import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title , slug , featuredImage , content , status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,

                }
            )
            
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            
        }
    }

    async updatePost(slug, {title , featuredImage , content , status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false;          
        }
    }

    async getPosts() {
        try {
          const query = {
            filters: [
              "status=active", // Assuming 'status' is the field name in your documents
            ],
          };
    
          return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [],
            0, // offset
            0, // limit
            [], // order
            query
          );
        } catch (error) {
          console.log("Appwrite service :: getPosts :: error", error);
          return false;
        }
      }

    // File upload serives
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false            
        }
    }

    async deleteFile(fileID){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    getFilepreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
    
}

const service = new Service()

export default service;

