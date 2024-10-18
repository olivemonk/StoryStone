import { integer, json, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const storyData = pgTable("storyData", {
    id: serial('id').primaryKey(),
    storySubject: text('storySubject'),
    storyType: varchar('storyType'),
    ageGroup: varchar('ageGroup'),
    imageStyle: varchar('imageStyle'),
    output: json('output'),
    coverImage: varchar('coverImage'),
    storyId: varchar('storyId'),
    userName: varchar('userName'),
    userEmail: varchar('userEmail'),
    userImage: varchar('userImage'),
});

export const users = pgTable("users", {
    id: serial('id').primaryKey(),
    userName: varchar('userName'),
    userEmail: varchar('userEmail'),
    userImage: varchar('userImage'),
    credits: integer('credits').default(5),
})