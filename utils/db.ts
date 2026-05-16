import { init } from "@instantdb/react-native";
import schema from "../instant.schema";

const db = init({
    appId: process.env.EXPO_PUBLIC_INSTANT_APP_ID!,
    schema: schema,
    useDateObjects: true,
});

export default db;